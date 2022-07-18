import { Injectable } from '@angular/core';
import axios from 'axios';
import { Disciplina } from '../dominio/disciplina';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  constructor(private toastSvc:ToastrService) { }

  paginas: number = 0

  async guardarDisciplinas(disciplina:Disciplina) : Promise<void> { // Promise<Disciplina> //return rta.data
    try {
      const rta = await axios.post(`http://localhost:8080/disciplinas`,disciplina)
      this.toastSvc.success(`Se agregó con éxito la disciplina ${rta.data.nombre}`)
    } catch (error) {
      this.toastSvc.error("Error: No fue posible agregar la disciplina")
    }
  }

  async editarDisciplina(disciplina: Disciplina) : Promise<void> { // Promise<Disciplina> //return rta.data
    try {
      const rta = await axios.put(`http://localhost:8080/disciplinas`, disciplina)
      this.toastSvc.success(`Se editó con éxito la disciplina ${rta.data.nombre}`)
    } catch (error) {
      this.toastSvc.error("Error: No fue posible editar la disciplina")
    }
  }

  async getDisciplinas() : Promise<Disciplina[]> {
    const rta = await axios.get(`http://localhost:8080/disciplinas`)
    return rta.data
  }

  async getDisciplina(id: number) : Promise<Disciplina> {
    const rta = await axios.get(`http://localhost:8080/disciplinas/${id}`)
    return rta.data
  }

  async getDisciplinasFiltro(filtro: String, pagina: number, items: number) : Promise<Disciplina[]> {
    const rta = await axios.get(`http://localhost:8080/disciplinas?filtro=${filtro}&pag=${pagina}&items=${items}`)
    this.paginas = rta.data.totalPages
    return rta.data.content
  }

  obtenerNumeroPaginas() {
    return this.paginas
  }

  async eliminarDisciplina(id: number) : Promise<void>{
    try {
      const rta = await axios.delete(`http://localhost:8080/disciplinas/${id}`)
      this.toastSvc.success("Disciplina eliminada con éxito")
    } catch (error) {
      console.log(error)
      this.toastSvc.error("Error: No fue posible eliminar esta disciplina")
    }
  }
}
