import { Injectable } from '@angular/core';
import axios from 'axios';
import { Disciplina } from '../dominio/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  constructor() { }

  async getDisciplinas() : Promise<Disciplina[]> {
    const rta = await axios.get(`http://localhost:8080/disciplinas`)
    //console.log(rta)
    return rta.data
  }

  async getDisciplinasFiltro(filtro: String) : Promise<Disciplina[]> {
    const rta = await axios.get(`http://localhost:8080/disciplinas?filtro=${filtro}`)
    //console.log(rta)
    return rta.data
  }

  async eliminarDisciplina(id: number) : Promise<void>{
    const rta = await axios.delete(`http://localhost:8080/disciplinas/${id}`)
    //console.log(rta)
  }
}
