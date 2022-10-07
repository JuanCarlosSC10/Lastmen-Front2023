export class MascotasModel {
  idMascota: number;
  codCliente: number;
  raza: string;
  nombres: string;
  peso: number;
  fechaNacimiento: string;
  constructor() {
    this.idMascota = 0;
    this.codCliente = 0;
    this.raza ="";
    this.nombres = "";
    this.peso = 0.00;
    this.fechaNacimiento = "";
  }
}



