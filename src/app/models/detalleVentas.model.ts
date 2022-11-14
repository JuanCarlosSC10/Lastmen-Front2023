import { ProductoModel } from "./producto.model";

export class DetalleVentaModel {
    idDetalleCompra: number;
    idVenta: number;
    idProducto: number;
    cantidad: number;
    descuento: number;
    precioVenta: number;
    stock: number;
    producto:ProductoModel;
    nombre_producto:string;
    descripcion_producto:string;
    precio_total:number;
    precioProducto:number;
    
    constructor(){
        this.idDetalleCompra=0;
        this.idVenta=0;
        this.idProducto=0;
        this.cantidad=0;
        this.descuento=0.00;
        this.precioVenta=0.00;
        this.descuento=0.00;
        this.producto=new ProductoModel();
        this.nombre_producto ="";
        this.descripcion_producto ="";
        this.stock=0;
        this.precio_total=0;
        this.precioProducto=0;
        
    }
}