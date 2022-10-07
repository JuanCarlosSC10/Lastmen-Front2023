export class VeterinarioModel {
    idMedico: number;
    nombres: string;
    apellidos: string;
    dni: string;
    direccion: string;
    celular: string;
    constructor(){
        this.idMedico=0;
        this.nombres="";
        this.apellidos="";
        this.dni="";
        this.direccion="";
        this.celular="";
    }
}