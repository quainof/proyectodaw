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
    console.log(this.loginForm.controls["usuario"].value)
    console.log(this.loginForm.controls["password"].value)

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
