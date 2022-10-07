import { ProductoModel } from "./producto.model";

export class DetalleVentaModel {
    idDetalleVenta: number;
    idVenta: number;
    idProducto: number;
    cantidad: number;
    precioVenta: number;
    stock: number;
    descuento: number;
    producto:ProductoModel;
    nombre_producto:string;
    descripcion_producto:string;
    precio_total:number;
    
    constructor(){
        this.idDetalleVenta=0;
        this.idVenta=0;
        this.idProducto=0;
        this.cantidad=0;
        this.precioVenta=0.00;
        this.descuento=0.00;
        this.producto=new ProductoModel();
        this.nombre_producto ="";
        this.descripcion_producto ="";
        this.stock=0;
        this.precio_total=0;
        
    }
}