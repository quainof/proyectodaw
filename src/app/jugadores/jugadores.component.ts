import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { FacultadesService } from '../servicios/facultades.service';
import { JugadorService } from '../servicios/jugador.service';
import { NacionalidadesService } from '../servicios/nacionalidades.service';
import { Jugador } from '../dominio/jugador';
import { Facultad } from '../dominio/facultad';
import { Disciplina } from '../dominio/disciplina';
import { Nacionalidad } from '../dominio/nacionalidad';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

  constructor(
    private router : Router,
    private servicioDisciplinas : DisciplinasService,
    private servicioFacultades : FacultadesService,
    private servicioJugadores : JugadorService,
    private servicioNacionalidades: NacionalidadesService,
    private formBuilder: FormBuilder,
  ) {
    this.filtrarJugadoresForm = this.formBuilder.group({
      filtro:[''],
      filtroDisciplina: [""],
      filtroFacultad: [""],
      filtroNacionalidad: [""]
    });
  }

  disciplinas: Disciplina[] = []
  facultades: Facultad[] = []
  nacionalidades: Nacionalidad[] = []
  jugadores: Jugador[] = []
  filtrarJugadoresForm: FormGroup;


  ngOnInit(): void {
    this.servicioDisciplinas.getDisciplinas().then(
      data => { this.disciplinas = data; },
      error => { console.log(error)}
    )
    this.servicioFacultades.getFacultades().then(
      data => { this.facultades = data; },
      error => { console.log(error)}
    )
    this.servicioNacionalidades.getNacionalidades().then( //.subscribe((rta) => {this.nacionalidades = rta})
      data => { this.nacionalidades = data; },
      error => { console.log(error)}
    )
    this.obtenerJugadores()
  }

  obtenerJugadores(){
    this.servicioJugadores.getJugadores().then(
      data => { this.jugadores = data; },
      error => { console.log(error)}
    )
  }

  onLimpiarFiltro() {
    this.filtrarJugadoresForm.controls["filtro"].setValue('')
    this.filtrarJugadoresForm.controls["filtroDisciplina"].setValue('')
    this.filtrarJugadoresForm.controls["filtroFacultad"].setValue('')
    this.filtrarJugadoresForm.controls["filtroNacionalidad"].setValue('')
    this.obtenerJugadores()
  }

  onFiltrarCombos(){
    const dis = this.filtrarJugadoresForm.controls["filtroDisciplina"].value.nombre || ""
    const fac = this.filtrarJugadoresForm.controls["filtroFacultad"].value.nombre || ""
    const nac = this.filtrarJugadoresForm.controls["filtroNacionalidad"].value.nombre || ""
    console.log(dis + fac + nac)
    this.servicioJugadores.getJugadoresCombos(dis, fac, nac).then(
      data => { this.jugadores = data; },
      error => { console.log(error)}
    )
  }

  onFiltrarTexto(){
    const texto = this.filtrarJugadoresForm.controls["filtro"].value
    this.servicioJugadores.getJugadoresTexto(texto).then(
      data => { this.jugadores = data; },
      error => { console.log(error)}
    )
  }

  onVolver() {
    this.router.navigate(['inicio'])
  }

  onNuevoJugadorClick() {
    this.router.navigate(["nuevo-jugador"])
  }

  onEditar(id: number) {
    this.router.navigate([`editar-jugador/${id}`])
  }

  async onEliminar(id: number){
    if (window.confirm("¿Seguro que desea eliminar este jugador?")) {
      await this.servicioJugadores.eliminarJugador(id)
      this.onLimpiarFiltro()
    }

  }

}
