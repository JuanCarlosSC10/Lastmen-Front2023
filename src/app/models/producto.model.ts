export class ProductoModel {
    idProducto: number;
    nombreProducto: string;
    precioCompra: number;
    precioVenta: number;
    cantidad: number;
    fechaIngreso: string;
    descripcion: string;
    idCategoria: number;

    constructor(){
        this.idProducto = 0;
        this.nombreProducto = "";
        this.precioCompra = 0.00;
        this.precioVenta = 0.00;
        this.cantidad = 0;
        this.fechaIngreso= "";
        this.descripcion="";
        this.idCategoria = 0;
    }
}