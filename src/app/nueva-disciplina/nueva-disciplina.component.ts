import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { Disciplina } from '../dominio/disciplina';

@Component({
  selector: 'app-nueva-disciplina',
  templateUrl: './nueva-disciplina.component.html',
  styleUrls: ['./nueva-disciplina.component.css']
})
export class NuevaDisciplinaComponent implements OnInit {

  registroForm = this.formBuilder.group(
    {
      Codigo: ["", [Validators.required, Validators.minLength(2)]],
      Nombre: ["", [Validators.required, Validators.minLength(3)]],
      Descripcion: ["",]

      // [ngClass]="{'is-invalid' : registroForm.controls['Nombre'].touched && registroForm.controls['Nombre'].errors!['required']}"
    }
  )
  constructor(
    private router : Router,
    private servicioDisciplinas : DisciplinasService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onVolver() {
    this.router.navigate(['disciplinas'])
  }

  enviado = false

  async onSubmit() {
    this.enviado = true

    if(this.registroForm.controls['Codigo'].errors) return
    if(this.registroForm.controls['Nombre'].errors) return
    if(this.registroForm.controls['Descripcion'].errors) return

    const disciplina = new Disciplina(
      0,
      this.registroForm.controls["Nombre"].value,
      this.registroForm.controls["Codigo"].value,
      this.registroForm.controls["Descripcion"].value,

    )

    await this.servicioDisciplinas.guardarDisciplinas(disciplina)
    this.router.navigate(['disciplinas'])
  }


}
