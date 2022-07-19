import { Injectable } from '@angular/core';
import { Jugador } from '../dominio/jugador';
import axios from "axios";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(private toastSvc:ToastrService) { }

  paginas: number = 0

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

  async getJugadores(pagina: number, items: number) : Promise<Jugador[]> {
    const rta = await axios.get(`http://localhost:8080/jugadores?pag=${pagina}&items=${items}`)
    this.paginas = rta.data.totalPages
    return rta.data.content;
  }

  async getJugadoresTexto(texto: String, pagina: number, items: number) : Promise<Jugador[]> {
    const url = `http://localhost:8080/jugadores/texto?texto=${texto}&pag=${pagina}&items=${items}`
    const rta = await axios.get(url)
    this.paginas = rta.data.totalPages
    return rta.data.content;
  }

  async getJugadoresCombos(dis: String, fac: String, nac:String, pagina: number, items: number) : Promise<Jugador[]> {
    const url = `http://localhost:8080/jugadores/combos?dis=${dis}&fac=${fac}&nac=${nac}&pag=${pagina}&items=${items}`
    const rta = await axios.get(url)
    this.paginas = rta.data.totalPages
    return rta.data.content;
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

  obtenerNumeroPaginas() {
    return this.paginas
  }




}
