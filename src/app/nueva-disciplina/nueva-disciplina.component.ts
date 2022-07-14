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
      codigo: ["", [Validators.required, Validators.minLength(2)]],
      nombre: ["", [Validators.required, Validators.minLength(3)]],
      descripcion: [""]

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

    if(this.registroForm.controls['nombre'].errors) return
    if(this.registroForm.controls['codigo'].errors) return
    if(this.registroForm.controls['descripcion'].errors) return

    const disciplina = new Disciplina(
      0,
      this.registroForm.controls["nombre"].value,
      this.registroForm.controls["codigo"].value,
      this.registroForm.controls["descripcion"].value,

    )

    await this.servicioDisciplinas.guardarDisciplinas(disciplina)
    this.router.navigate(['disciplinas'])
  }


}
