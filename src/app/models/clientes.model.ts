export class ClienteModel {
    codCliente: number;
    ruc: string;
    direccion: string;
    celular: string;
    email: string;
    nombres:string;
    dni:string;
 
    constructor() {
        this.codCliente = 0;
        this.ruc = "";
        this.direccion = "";
        this.celular = "";
        this.email = "";
        this.nombres="";
        this.dni="";
    }
}
