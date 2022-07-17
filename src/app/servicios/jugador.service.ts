import { Injectable } from '@angular/core';
import { Facultad } from '../dominio/facultad';
import { Jugador } from '../dominio/jugador';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor() { }

  async guardarJugador(jugador:Jugador): Promise<Jugador>{
    const rta = await axios.post("http://localhost:8080/jugadores", jugador)
    //console.log(rta)
    //console.log(jugador)
    return rta.data;
  }

  async editarJugador(jugador: Jugador): Promise<Jugador>{
    //console.log(jugador)
    const rta = await axios.put("http://localhost:8080/jugadores", jugador)
    //console.log(rta)
    return rta.data;
  }

  async getJugadores() : Promise<Jugador[]> {
    const rta = await axios.get("http://localhost:8080/jugadores")
    //console.log(rta)
    return rta.data;
  }

  async getJugadoresTexto(texto: String) : Promise<Jugador[]> {
    const url = `http://localhost:8080/jugadores/texto?texto=${texto}`
    console.log(url)
    const rta = await axios.get(url)
    return rta.data;
  }

  async getJugadoresCombos(dis: String, fac: String, nac:String) : Promise<Jugador[]> {
    const url = `http://localhost:8080/jugadores/combos?dis=${dis}&fac=${fac}&nac=${nac}`
    console.log(url)
    const rta = await axios.get(url)
    return rta.data;
  }

  async eliminarJugador(id: number) : Promise<void>{
    const rta = await axios.delete(`http://localhost:8080/jugadores/${id}`)
    //console.log(rta)
  }

  async getJugador(id: number): Promise<Jugador> {
    const rta = await axios.get(`http://localhost:8080/jugadores/${id}`)
    //console.log(rta)
    return rta.data;
  }


}
