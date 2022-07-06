import { Injectable } from '@angular/core';
import { Rol } from '../dominio/rol';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor() { }

  async getRoles() : Promise<Rol[]>{
    const rta = await axios.get("http://localhost:8080/roles")
    //console.log(rta)
    return rta.data
  }
}
