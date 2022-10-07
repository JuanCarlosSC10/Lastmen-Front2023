export class CitasModel {
    idCita: number;
    idMascota: number;
    idMedico: number;
    fecha: string;
    hora: string;
    observaciones: string;
    constructor(){
        this.idCita = 0;
        this.idMascota = 0;
        this.idMedico = 0;
        this.fecha = "";
        this.hora = "";
        this.observaciones = "";
        
    }
}