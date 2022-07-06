import { Disciplina } from "./disciplina";
import { Facultad } from "./facultad";
import { Nacionalidad } from "./nacionalidad";
import { Rol } from "./rol";

export class Jugador {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  legajo: number;
  fechaNacimiento: Date;
  email: string;
  telefono: string;
  facultad : Facultad;
  rol: Rol;
  disciplina: Disciplina;
  nacionalidad: Nacionalidad;



  constructor(id: number, nombre: string, apellido: string, dni: string, legajo: number, fechaNacimiento: Date, email: string, telefono: string, facultad : Facultad, rol: Rol, disciplina: Disciplina, nacionalidad: Nacionalidad) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.legajo = legajo;
    this.fechaNacimiento = fechaNacimiento;
    this.email = email;
    this.telefono = telefono;
    this.facultad = facultad;
    this.rol = rol;
    this.disciplina = disciplina;
    this.nacionalidad = nacionalidad;
  }

  public getNombreApellido(): string {
    return this.apellido + " " + this.nombre
  }
}



