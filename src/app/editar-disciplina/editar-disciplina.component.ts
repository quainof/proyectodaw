import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisciplinasService } from '../servicios/disciplinas.service';
import { Disciplina } from '../dominio/disciplina';

@Component({
  selector: 'app-editar-disciplina',
  templateUrl: './editar-disciplina.component.html',
  styleUrls: ['./editar-disciplina.component.css']
})
export class EditarDisciplinaComponent implements OnInit {

  disciplina: any = {}

  registroForm = this.formBuilder.group(
    {
      id: ["", []],
      codigo: ["", [Validators.required, Validators.minLength(2)]],
      nombre: ["", [Validators.required, Validators.minLength(3)]],
      descripcion: ["",]

      // [ngClass]="{'is-invalid' : registroForm.controls['Nombre'].touched && registroForm.controls['Nombre'].errors!['required']}"
    }
  )
  constructor(
    private router : Router,
    private servicioDisciplinas : DisciplinasService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }
  async ngOnInit(){

    await this.obtenerDisciplina()
    this.registroForm.setValue(this.disciplina)

    //this.registroForm.controls['Codigo'].setValue(this.disciplina.codigo)
    //this.registroForm.controls['Nombre'].setValue(this.disciplina.nombre)
    //this.registroForm.controls['Descripcion'].setValue(this.disciplina.descripcion)
  }

  async obtenerDisciplina(){
    const idDisciplina = this.activatedRoute.snapshot.params["id"]
    await this.servicioDisciplinas.getDisciplina(idDisciplina).then(
      data => {
        this.disciplina = data;
      },
      error => { console.log(error)}
    )
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
      this.disciplina.id,
      this.registroForm.controls["nombre"].value,
      this.registroForm.controls["codigo"].value,
      this.registroForm.controls["descripcion"].value,

    )

    await this.servicioDisciplinas.editarDisciplina(disciplina)
    this.router.navigate(['disciplinas'])
  }

}
