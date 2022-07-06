import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NuevoJugadorComponent } from './nuevo-jugador/nuevo-jugador.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { HttpClientModule} from "@angular/common/http";
import { EditarJugadorComponent } from './editar-jugador/editar-jugador.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NuevoJugadorComponent,
    JugadoresComponent,
    EditarJugadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
