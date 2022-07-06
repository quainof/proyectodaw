import { Injectable } from '@angular/core';
import { Facultad } from '../dominio/facultad';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FacultadesService {

  constructor() { }

  async getFacultades() : Promise<Facultad[]>{

    const rta = await axios.get("http://localhost:8080/facultades")
    //console.log(rta)
    return rta.data

  }
}
