export class ProductoModel {
    idProducto: number;
    idCategoria: number;
    idProveedor : number;
    nombreProducto: string;
    precioProducto: number;
    cantidad: number;
    lote: string;
    unidad_Medida: string;
    fechaIngreso: string;
    fechaVencimiento: string;
    descripcion: string;
    url_Img: string;
   

    constructor(){
        this.idProducto = 0;
        this.idCategoria = 0;
        this.idProveedor=0;
        this.nombreProducto = "";
        this.precioProducto= 0.00;
        this.cantidad = 0;
        this.lote= "";
        this.unidad_Medida ="";
        this.fechaIngreso= "";
        this.fechaVencimiento= "";
        this.descripcion="";
        this.url_Img="";
       ;
    }
}