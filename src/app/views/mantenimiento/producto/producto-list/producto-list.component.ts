  import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {  ProductoModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/service/producto.service';
import{CategoriaService} from'src/app/service/categoria.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {
  modalRef?: BsModalRef;
  page =0;
  productos='';
  producto:ProductoModel[] = [];
  productoSelected:ProductoModel = new ProductoModel();
  productoExport: any = [];
  tituloModal:string = "";

  headerColumns: any=[
    {header: 'ID PRODUCTO',datakey:'idProducto'},
    {header: 'NOMBRE DEL PRODUCTO',datakey:'nombreProducto'},
    {header: 'DESCRIPCION',datakey:'descripcion'},
    {header: 'ID DE CATEGORIA',datakey:'idCategoria'},
    {header: 'PRECIO COMPRA',datakey:'precioCompra'},
    {header: 'PRECIO VENTA',datakey:'precioVenta'},
    {header: 'STOCK',datakey:'cantidad'},
    {header: 'FECHA DE INGRESO',datakey:'fechaIngreso'},
  ];

  categoriaTiplist$!:Observable<any[]>;
  categoriaTiplist:any=[];
  categoriaTipoMap:Map<number,string>=new Map()
  constructor(
    private _categoriaservice:CategoriaService,
    private _productoService:ProductoService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllProducto();
    this.categoriaTiplist$=this._categoriaservice.getAll();
    this.refreshCategoriatipoMap();
    this.getAllPDF();
  }
  refreshCategoriatipoMap(){
    this._categoriaservice.getAll().subscribe(data=>{
    this.categoriaTiplist=data;
    for(let i=0; i<data.length;i++){
      this.categoriaTipoMap.set(this.categoriaTiplist[i].idCategoria,this.categoriaTiplist[i].nombreCategoria);
    }
  })
}

  getAllPDF()
  {
    debugger;
    this.producto = [];
    this.productoExport = [];
    this._productoService.getAll().subscribe(
      (data:ProductoModel[]) => {
        this.producto = data;
        this.producto.map(x => {
          this.productoExport.push({
          'idProducto': x.idProducto,
          'nombreProducto': x.nombreProducto,
          'descripcion': x.descripcion,
          'idCategoria': x.idCategoria,
          'precioCompra': x.precioCompra,
          'precioVenta': x.precioVenta,
          'cantidad': x.cantidad,
          'fechaIngreso': x.fechaIngreso,         
          });
        });
      },
      (err) => {
      }
    );
  }

  getAllProducto()
  {
    this._productoService.getAll().subscribe(
      (data:ProductoModel[]) => {
        this.producto = data;
        
        console.log(data);
        
      },
      err => {
        console.log(err);
      }
    );
  }

  editarRegistro(producto:ProductoModel,template: TemplateRef<any>)
  {
    this.tituloModal="EDITAR REGISTRO";
    this.productoSelected = producto;
    this.openModal(template);
  }

  crearRegistro(template: TemplateRef<any>)
  {
    this.tituloModal="CREAR REGISTRO";
    this.productoSelected = new ProductoModel();
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  recibeCloseModal(res:boolean)
  {
    if(res) //==> si es verdadero
    {
      this.getAllProducto();      
    }
    this.modalRef?.hide();
  }


  modalDelete(producto:ProductoModel)
  {
    let res = confirm("Está seguro de eliminar el registro");

    if(res) // si es verdadero
    {
      this._productoService.delete(producto.idProducto).subscribe(
        (data:number)=>{
          console.log(data);
          alert("registro eliminado de forma satisfactoría");
          this.getAllProducto();
        },
        err =>{
          //alert("ocurrio un error");
        }
      );
    }
  }
  PrintElem() {
    var mywindow: any = window.open('', 'PRINT', 'height=400,width=600');
    let html = document.getElementById("app2")?.innerHTML;
    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title + '</h1>');
    mywindow.document.write(html);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
  }  
}