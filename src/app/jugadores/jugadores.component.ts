import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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
      filtroNacionalidad: [""],
      itemsPorPagina:[3]
    });
  }

  disciplinas: Disciplina[] = []
  facultades: Facultad[] = []
  nacionalidades: Nacionalidad[] = []
  jugadores: Jugador[] = []
  filtrarJugadoresForm: FormGroup;

  ultimoFiltro: String = ""

  paginas: number = 0
  paginaActual: number = 0
  paginaNueva: number = 0

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

  async obtenerJugadores(){
    await this.servicioJugadores.getJugadores(
      this.paginaNueva,
      this.filtrarJugadoresForm.controls['itemsPorPagina'].value
    ).then(
      data => { this.jugadores = data; },
      error => { console.log(error)}
    )
    this.ultimoFiltro = ""
    this.paginas = this.servicioJugadores.obtenerNumeroPaginas()
  }


  onLimpiarFiltro() {
    this.filtrarJugadoresForm.controls["filtro"].setValue('')
    this.limpiarCombos()
    this.paginaActual = 0
    this.paginaNueva = 0
    this.obtenerJugadores()
  }

  limpiarCombos(){
    this.filtrarJugadoresForm.controls["filtroDisciplina"].setValue('')
    this.filtrarJugadoresForm.controls["filtroFacultad"].setValue('')
    this.filtrarJugadoresForm.controls["filtroNacionalidad"].setValue('')
  }

  onClickFiltrarCombos(){
    this.filtrarJugadoresForm.controls["filtro"].setValue('')
    this.paginaActual = 0
    this.paginaNueva = 0
    this.onFiltrarCombos()
  }

  async onFiltrarCombos(){
    const dis = this.filtrarJugadoresForm.controls["filtroDisciplina"].value.nombre || ""
    const fac = this.filtrarJugadoresForm.controls["filtroFacultad"].value.nombre || ""
    const nac = this.filtrarJugadoresForm.controls["filtroNacionalidad"].value.nombre || ""
    await this.servicioJugadores.getJugadoresCombos(
      dis, fac, nac,
      this.paginaNueva,
      this.filtrarJugadoresForm.controls['itemsPorPagina'].value
    ).then(
      data => { this.jugadores = data; },
      error => { console.log(error)}
    )
    this.ultimoFiltro = "c"
    this.paginas = this.servicioJugadores.obtenerNumeroPaginas()
  }

  onClickFiltrarTexto(){
    this.limpiarCombos()
    this.paginaActual = 0
    this.paginaNueva = 0
    this.onFiltrarTexto()
  }

  async onFiltrarTexto(){
    const texto = this.filtrarJugadoresForm.controls["filtro"].value
    await this.servicioJugadores.getJugadoresTexto(
      texto,
      this.paginaNueva,
      this.filtrarJugadoresForm.controls['itemsPorPagina'].value
    ).then(
      data => { this.jugadores = data; },
      error => { console.log(error)}
    )
    this.ultimoFiltro = "t"
    this.paginas = this.servicioJugadores.obtenerNumeroPaginas()
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

  async eliminar(id: number){
    await this.servicioJugadores.eliminarJugador(id)
    this.onLimpiarFiltro()
  }
  onEliminar(id: number){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Seguro que desea eliminar este jugador?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminar(id)
        Swal.fire({
          title: "Jugador eliminado con exito",
          icon: 'success',
          showConfirmButton: false,
          timer: 1250
        })
      }
    })
  }

  onPaginaSiguiente(){
    if(this.paginaActual == this.paginas - 1) return
    this.paginaNueva = this.paginaActual + 1
    this.paginaActual = this.paginaNueva
    console.log(this.ultimoFiltro)
    if(this.ultimoFiltro==="") this.obtenerJugadores()
    if(this.ultimoFiltro==="c") this.onFiltrarCombos()
    if(this.ultimoFiltro==="t") this.onFiltrarTexto()
  }

  onPaginaAnterior(){
    if(this.paginaActual == 0) return
    this.paginaNueva = this.paginaActual - 1
    this.paginaActual = this.paginaNueva
    console.log(this.ultimoFiltro)
    if(this.ultimoFiltro==="") this.obtenerJugadores()
    if(this.ultimoFiltro==="c") this.onFiltrarCombos()
    if(this.ultimoFiltro==="t") this.onFiltrarTexto()
  }
}
