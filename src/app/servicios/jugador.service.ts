import { Injectable } from '@angular/core';
import { Facultad } from '../dominio/facultad';
import { Jugador } from '../dominio/jugador';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor() { }

  async guardarJugador(jugador:Jugador){
    const rta = await axios.post("http://localhost:8080/jugadores", jugador)
    //console.log(rta)
    //console.log(jugador)
  }

  async editarJugador(jugador: Jugador){
    console.log(jugador)
    const rta = await axios.put("http://localhost:8080/jugadores", jugador)
    console.log(rta)
  }

  async getJugadores() : Promise<Jugador[]> {
    const rta = await axios.get("http://localhost:8080/jugadores")
    //console.log(rta)
    return rta.data;
  }

  async eliminarJugador(id: number) : Promise<void>{
    const rta = await axios.delete(`http://localhost:8080/jugadores/${id}`)
    //console.log(rta)
  }

  async getJugador(id: number): Promise<Jugador> {
    const rta = await axios.get(`http://localhost:8080/jugadores/${id}`)
    console.log(rta)
    return rta.data;
  }


}
