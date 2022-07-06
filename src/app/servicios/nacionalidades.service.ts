import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nacionalidad } from '../dominio/nacionalidad';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService {

  constructor() { }

  async getNacionalidades() : Promise<Nacionalidad[]>{
    const rta = await axios.get("http://localhost:8080/nacionalidades")
    //console.log(rta)
    return rta.data

    //return this.http.get("https://restcountries.com/v2/lang/es") //private http: HttpClient
  }
}
