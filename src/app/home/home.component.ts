import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onJugadoresClick() {
    this.router.navigate(["jugadores"])
  }

  onDisciplinasClick() {
    this.router.navigate(["disciplinas"])
  }

  async onVolver(){
    await Swal.fire({
      title: "Nos vemos, vuelva pronto",
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['login'])
  }
}
