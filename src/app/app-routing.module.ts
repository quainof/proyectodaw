import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NuevoJugadorComponent } from './nuevo-jugador/nuevo-jugador.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { EditarJugadorComponent } from './editar-jugador/editar-jugador.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { NuevaDisciplinaComponent } from './nueva-disciplina/nueva-disciplina.component';
import { EditarDisciplinaComponent } from './editar-disciplina/editar-disciplina.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'nuevo-jugador', component: NuevoJugadorComponent },
  { path: 'jugadores', component: JugadoresComponent},
  { path: 'editar-jugador/:id', component: EditarJugadorComponent},
  { path: 'nueva-disciplina', component: NuevaDisciplinaComponent },
  { path: 'disciplinas', component: DisciplinasComponent},
  { path: 'editar-disciplina/:id', component: EditarDisciplinaComponent},
  { path: "**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
