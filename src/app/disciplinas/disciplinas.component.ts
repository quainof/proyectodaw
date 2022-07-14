import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(): void {
    this.servicioDisciplinas.getDisciplinasFiltro(this.filtrarDisciplinasForm.controls[`filtro`].value).then(
      data => { this.disciplinas = data; },
      error => { console.log(error)}
    )
  }

  onEditar(id: number) {
    this.router.navigate([`editar-disciplina/${id}`])
  }

  async onEliminar(id: number){
    if (window.confirm("¿Seguro que desea eliminar este jugador?")) {
      await this.servicioDisciplinas.eliminarDisciplina(id)
      this.onFiltrar()
    }
  }

  onFiltrar(){
    this.servicioDisciplinas.getDisciplinasFiltro(this.filtrarDisciplinasForm.controls[`filtro`].value).then(
      data => { this.disciplinas = data; },
      error => { console.log(error)}
    )
  }

  onLimpiarFiltro() {
    this.filtrarDisciplinasForm.controls["filtro"].setValue('')
    this.onFiltrar()
  }

  onVolver() {
    this.router.navigate(['inicio'])
  }

  onNuevaDisciplinaClick() {
    this.router.navigate(["nueva-disciplina"])
  }

}
