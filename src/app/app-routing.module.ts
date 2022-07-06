import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NuevoJugadorComponent } from './nuevo-jugador/nuevo-jugador.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { EditarJugadorComponent } from './editar-jugador/editar-jugador.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'nuevo-jugador', component: NuevoJugadorComponent },
  { path: 'jugadores', component: JugadoresComponent},
  { path: 'editar-jugador/:id', component: EditarJugadorComponent},
  { path: "**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
