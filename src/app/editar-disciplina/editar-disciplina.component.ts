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
    private activatedRoute: ActivatedRoute
  ) { }
  async ngOnInit(){
    await this.servicioDisciplinas.getDisciplinas().then(
      data => { this.disciplina = data; },
      error => { console.log(error)}
    )

    await this.obtenerDisciplina()
    this.registroForm.setValue(this.disciplina)
    //this.registroForm.controls['Codigo'].setValue(this.disciplina.codigo)
    //this.registroForm.controls['Nombre'].setValue(this.disciplina.nombre)
    //this.registroForm.controls['Descripcion'].setValue(this.disciplina.descripcion)
    /*this.registroForm.controls['rol'].setValue(rolCombo)
    this.registroForm.controls['facultad'].setValue(facOption)
    this.registroForm.controls['disciplina'].setValue(disCombo)
    this.registroForm.controls['nacionalidad'].setValue(nacCombo)*/
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

    if(this.registroForm.controls['Codigo'].errors) return
    if(this.registroForm.controls['Nombre'].errors) return
    if(this.registroForm.controls['Descripcion'].errors) return

    const disciplina = new Disciplina(
      this.disciplina.id,
      this.registroForm.controls["Nombre"].value,
      this.registroForm.controls["Codigo"].value,
      this.registroForm.controls["Descripcion"].value,

    )

    await this.servicioDisciplinas.editarDisciplina(disciplina)
    this.router.navigate(['disciplinas'])
  }

}
