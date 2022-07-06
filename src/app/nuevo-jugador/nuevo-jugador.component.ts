import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-nuevo-jugador',
  templateUrl: './nuevo-jugador.component.html',
  styleUrls: ['./nuevo-jugador.component.css']
})
export class NuevoJugadorComponent implements OnInit {

  nacionalidades: Nacionalidad[] = []
  disciplinas: Disciplina[] = []
  facultades: Facultad[] = []
  roles: Rol[] = []

  registroForm = this.builder.group(
    {
      Nombre: ["", [Validators.required, Validators.minLength(2)]],
      Apellido: ["", [Validators.required, Validators.minLength(2)]],
      Email: ["", [Validators.required, Validators.email]],
      Dni: ["", [Validators.required, Validators.minLength(1)]],
      Telefono: ["", ],
      Legajo: ["", [Validators.required, Validators.minLength(1)]],
      FechaDeNacimiento: ["", [Validators.required]],
      Localidad: ["", [Validators.required]], //villa-maria
      Disciplina: ["", [Validators.required]],
      Nacionalidad : ["", [Validators.required]],
      Rol : ["", [Validators.required]],

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
    private servicioRoles: RolesService
    ) { }

  ngOnInit(): void {
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

  onVolver() {
    this.router.navigate(['inicio'])
  }

  enviado = false

  async onSubmit() {
    this.enviado = true

    if(this.registroForm.controls['Nombre'].errors) return
    if(this.registroForm.controls['Apellido'].errors) return
    if(this.registroForm.controls['Email'].errors) return
    if(this.registroForm.controls['Dni'].errors) return
    if(this.registroForm.controls['Telefono'].errors) return
    if(this.registroForm.controls['Legajo'].errors) return
    if(this.registroForm.controls['FechaDeNacimiento'].errors) return
    if(this.registroForm.controls['Localidad'].errors) return
    if(this.registroForm.controls['Disciplina'].errors) return
    if(this.registroForm.controls['Nacionalidad'].errors) return

    const jugador = new Jugador(
      0,
      this.registroForm.controls["Nombre"].value,
      this.registroForm.controls["Apellido"].value,
      this.registroForm.controls["Dni"].value,
      this.registroForm.controls["Legajo"].value,
      this.registroForm.controls["FechaDeNacimiento"].value,
      this.registroForm.controls["Email"].value,
      this.registroForm.controls["Telefono"].value,
      this.registroForm.controls["Localidad"].value,
      this.registroForm.controls["Rol"].value,
      this.registroForm.controls["Disciplina"].value,
      this.registroForm.controls["Nacionalidad"].value
    )

    await this.servicioJugador.guardarJugador(jugador)
    this.router.navigate(['jugadores'])
  }

}
