import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Disciplina } from '../dominio/disciplina';
import { Facultad } from '../dominio/facultad';
import { Jugador } from '../dominio/jugador';
import { Nacionalidad } from '../dominio/nacionalidad';
import { Rol } from '../dominio/rol';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { FacultadesService } from '../servicios/facultades.service';
import { JugadorService } from '../servicios/jugador.service';
import { NacionalidadesService } from '../servicios/nacionalidades.service';
import { RolesService } from '../servicios/roles.service';
import { Moment } from 'moment';
import * as moment from 'moment';



@Component({
  selector: 'app-editar-jugador',
  templateUrl: './editar-jugador.component.html',
  styleUrls: ['./editar-jugador.component.css']
})
export class EditarJugadorComponent implements OnInit {

  nacionalidades: Nacionalidad[] = []
  disciplinas: Disciplina[] = []
  facultades: Facultad[] = []
  roles: Rol[] = []
  jugador: any = {}

  registroForm = this.builder.group(
    {
      id: ["", []],
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      apellido: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      dni: ["", [Validators.required, Validators.minLength(1)]],
      telefono: ["", ],
      legajo: ["", [Validators.required, Validators.minLength(1)]],
      fechaNacimiento: ["", [Validators.required]],
      facultad: ["", [Validators.required]], //villa-maria
      disciplina: ["", [Validators.required]],
      nacionalidad : ["", [Validators.required]],
      rol : ["", [Validators.required]],

      // [ngClass]="{'is-invalid' : registroForm.controls['Nombre'].touched && registroForm.controls['Nombre'].errors!['required']}"
    }
  )

  constructor(
    private builder : FormBuilder,
    private router : Router,
    private servicioNacionalidades : NacionalidadesService,
    private servicioDisciplinas : DisciplinasService,
    private servicioFacultades : FacultadesService,
    private servicioJugador: JugadorService,
    private servicioRoles: RolesService,
    private activatedRoute: ActivatedRoute
    ) { }

  async ngOnInit(){
    await this.servicioNacionalidades.getNacionalidades().then( //.subscribe((rta) => {this.nacionalidades = rta})
      data => { this.nacionalidades = data; },
      error => { console.log(error)}
    )
    await this.servicioDisciplinas.getDisciplinas().then(
      data => { this.disciplinas = data; },
      error => { console.log(error)}
    )
    await this.servicioFacultades.getFacultades().then(
      data => { this.facultades = data; },
      error => { console.log(error)}
    )
    await this.servicioRoles.getRoles().then(
      data => { this.roles = data; },
      error => { console.log(error)}
    )

    await this.obtenerJugador()
    this.registroForm.setValue(this.jugador)

    const rolCombo = this.roles.filter(rol => rol.id === this.jugador.rol.id)[0]
    const facOption = this.facultades.filter(facultad => facultad.id === this.jugador.facultad.id)[0]
    const disCombo = this.disciplinas.filter(disci => disci.id === this.jugador.disciplina.id)[0]
    const nacCombo = this.nacionalidades.filter(nacion => nacion.id === this.jugador.nacionalidad.id)[0]
    this.registroForm.controls['rol'].setValue(rolCombo)
    this.registroForm.controls['facultad'].setValue(facOption)
    this.registroForm.controls['disciplina'].setValue(disCombo)
    this.registroForm.controls['nacionalidad'].setValue(nacCombo)
  }

  async obtenerJugador(){
    const idJugador = this.activatedRoute.snapshot.params["id"]
    await this.servicioJugador.getJugador(idJugador).then(
      data => {
        this.jugador = data;
        this.jugador.fechaNacimiento = this.jugador.fechaNacimiento.split("T")[0]
      },
      error => { console.log(error)}
    )
  }


  onVolver() {
    this.router.navigate(['jugadores'])
  }

  enviado = false

  async onSubmit() {
    this.enviado = true

    if(this.registroForm.controls['nombre'].errors) return
    if(this.registroForm.controls['apellido'].errors) return
    if(this.registroForm.controls['email'].errors) return
    if(this.registroForm.controls['dni'].errors) return
    if(this.registroForm.controls['telefono'].errors) return
    if(this.registroForm.controls['legajo'].errors) return
    if(this.registroForm.controls['fechaNacimiento'].errors) return
    if(this.registroForm.controls['facultad'].errors) return
    if(this.registroForm.controls['disciplina'].errors) return
    if(this.registroForm.controls['nacionalidad'].errors) return

    const jugadorNuevo = new Jugador(
      this.jugador.id,
      this.registroForm.controls["nombre"].value,
      this.registroForm.controls["apellido"].value,
      this.registroForm.controls["dni"].value,
      this.registroForm.controls["legajo"].value,
      moment(this.registroForm.controls["fechaNacimiento"].value).toDate(),
      this.registroForm.controls["email"].value,
      this.registroForm.controls["telefono"].value,
      this.registroForm.controls["facultad"].value,
      this.registroForm.controls["rol"].value,
      this.registroForm.controls["disciplina"].value,
      this.registroForm.controls["nacionalidad"].value
    )
    //console.log(jugadorNuevo)

    await this.servicioJugador.editarJugador(jugadorNuevo)
    this.router.navigate(['jugadores'])
  }

}
