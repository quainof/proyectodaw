import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { Disciplina } from '../dominio/disciplina';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {

  constructor(
    private router : Router,
    private servicioDisciplinas : DisciplinasService,
    private formBuilder: FormBuilder,
  ) {
    this.filtrarDisciplinasForm = this.formBuilder.group({
      filtro:['']
    })
  }

  disciplinas: Disciplina[] = []
  filtrarDisciplinasForm: FormGroup;
  paginas: number = 0
  paginaActual: number = 0
  paginaNueva: number = 0

  ngOnInit(): void {
    this.onFiltrar()
  }

  onEditar(id: number) {
    this.router.navigate([`editar-disciplina/${id}`])
  }

  async eliminar(id: number){
    await this.servicioDisciplinas.eliminarDisciplina(id)
    this.onLimpiarFiltro()
  }
  onEliminar(id: number){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Seguro que desea eliminar esta disciplina?",
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
          title: "Disciplina eliminada con exito",
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
    this.onFiltrar()
  }

  onPaginaAnterior(){
    if(this.paginaActual == 0) return
    this.paginaNueva = this.paginaActual - 1
    this.paginaActual = this.paginaNueva
    this.onFiltrar()
  }

  onFiltrar(){
    this.servicioDisciplinas.getDisciplinasFiltro(this.filtrarDisciplinasForm.controls[`filtro`].value, this.paginaNueva).then(
      data => { this.disciplinas = data; },
      error => { console.log(error)}
    )
    this.paginas = this.servicioDisciplinas.obtenerNumeroPaginas()
  }

  onLimpiarFiltro() {
    this.filtrarDisciplinasForm.controls["filtro"].setValue('')
    this.paginaActual = 0
    this.paginaNueva = 0
    this.onFiltrar()
  }

  onVolver() {
    this.router.navigate(['inicio'])
  }

  onNuevaDisciplinaClick() {
    this.router.navigate(["nueva-disciplina"])
  }

}
