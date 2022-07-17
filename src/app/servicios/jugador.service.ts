import { Injectable } from '@angular/core';
import { Jugador } from '../dominio/jugador';
import axios from "axios";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(private toastSvc:ToastrService) { }

  async guardarJugador(jugador:Jugador): Promise<void> { //Promise<Jugador> //return rta.data;
    try {
      const rta = await axios.post("http://localhost:8080/jugadores", jugador)
      this.toastSvc.success(`Se agregó con éxito el jugador legajo ${rta.data.legajo}`)
    } catch (error) {
      this.toastSvc.error("Error: No fue posible agregar el jugador")
    }
  }

  async getJugador(id: number): Promise<Jugador> {
    const rta = await axios.get(`http://localhost:8080/jugadores/${id}`)
    return rta.data;
  }

  async editarJugador(jugador: Jugador): Promise<void> { //Promise<Jugador> //return rta.data;
    try {
      const rta = await axios.put("http://localhost:8080/jugadores", jugador)
      this.toastSvc.success(`Se editó con éxito el jugador legajo ${rta.data.legajo}`)
    } catch (error) {
      this.toastSvc.error("Error: No fue posible editar el jugador")
    }
  }

  async getJugadores() : Promise<Jugador[]> {
    const rta = await axios.get("http://localhost:8080/jugadores")
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
    try {
      const rta = await axios.delete(`http://localhost:8080/jugadores/${id}`)
      this.toastSvc.success("Jugador eliminado con éxito")
    } catch (error) {
      console.log(error)
      this.toastSvc.error("Error: No es posible eliminar este jugador")
    }
  }




}
