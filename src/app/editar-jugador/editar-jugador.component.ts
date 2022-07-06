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

  ngOnInit(): void {

    this.obtenerJugador()
    this.servicioNacionalidades.getNacionalidades().then( //.subscribe((rta) => {this.nacionalidades = rta})
      data => { this.nacionalidades = data; },
      error => { console.log(error)}
    )
    this.servicioDisciplinas.getDisciplinas().then(
      data => { this.disciplinas = data; },
      error => { console.log(error)}
    )
    this.servicioFacultades.getFacultades().then(
      data => { this.facultades = data; },
      error => { console.log(error)}
    )
    this.servicioRoles.getRoles().then(
      data => { this.roles = data; },
      error => { console.log(error)}
    )

  }

  async obtenerJugador(){
    const idJugador = this.activatedRoute.snapshot.params["id"]
    await this.servicioJugador.getJugador(idJugador).then(
      data => {
        this.jugador = data;
        this.jugador.fechaNacimiento = this.jugador.fechaNacimiento.split("T")[0]
        console.log(this.jugador)

        this.registroForm.setValue(this.jugador)

      },
      error => { console.log(error)}
    )
    //console.log(this.jugador)
  }


  onVolver() {
    this.router.navigate(['inicio'])
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
      this.registroForm.controls["fechaNacimiento"].value,
      this.registroForm.controls["email"].value,
      this.registroForm.controls["telefono"].value,
      this.registroForm.controls["facultad"].value,
      this.registroForm.controls["rol"].value,
      this.registroForm.controls["disciplina"].value,
      this.registroForm.controls["nacionalidad"].value
    )
    //console.log(jugadorNuevo)

    await this.servicioJugador.editarJugador(jugadorNuevo)
    //this.router.navigate(['jugadores'])
  }

}
