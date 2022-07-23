import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //enviado = false
  loginForm = this.builder.group(
    {
      usuario: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    }
  )

  constructor(private builder : FormBuilder, private router : Router) { }

  ngOnInit(): void { }

  async onSubmit() {
    //this.enviado=true
    if(this.loginForm.controls['usuario'].errors && this.loginForm.controls['password'].errors){
      Swal.fire({
        title: "Ingrese usuario y contraseña validos",
        icon: 'error',
        showConfirmButton: false,
        timer: 1250
      })
      return
    } 
    if(this.loginForm.controls['usuario'].errors){
      Swal.fire({
        title: "Ingrese usuario valido",
        icon: 'error',
        showConfirmButton: false,
        timer: 1250
      })
      return
    } 
    if(this.loginForm.controls['password'].errors){
      Swal.fire({
        title: "Ingrese contraseña valida",
        icon: 'error',
        showConfirmButton: false,
        timer: 1250
      })
      return
    } 
    await Swal.fire({
      title: "Bienvenido al sistema",
      icon: 'success',
      showConfirmButton: false,
      timer: 1250
    }      
    )

    this.router.navigate(['inicio'])
  }

}
