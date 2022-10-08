import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {  ClienteModel } from 'src/app/models/clientes.model';
import { ClientesService } from 'src/app/service/clientes.service';


@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  modalRef?: BsModalRef;
  clientes:ClienteModel[] = [];
  clientesSelected:ClienteModel = new ClienteModel();
  tituloModal:string = "";
  filtro='';
  page =0;
  constructor(
    private _clientesService:ClientesService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllClientes();
  }

  getAllClientes()
  {
    debugger;
    this._clientesService.getAll().subscribe(
      (data:ClienteModel[] ) => {
        this.clientes = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  editarRegistro(clientes:ClienteModel,template: TemplateRef<any>)
  {
    this.tituloModal="EDITAR REGISTRO";
    this.clientesSelected = clientes;
    this.openModal(template);
  }

  crearRegistro(template: TemplateRef<any>)
  {
    this.tituloModal="CREAR REGISTRO";
    this.clientesSelected = new ClienteModel();
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  recibeCloseModal(res:boolean)
  {
    if(res) //==> si es verdadero
    {
      this.getAllClientes();      
    }
    this.modalRef?.hide();
  }


  modalDelete(clientes:ClienteModel)
  {
    let res = confirm("Está seguro de eliminar el registro");

    if(res) // si es verdadero
    {
      this._clientesService.delete(clientes.idCliente).subscribe(
        (data:number)=>{
          console.log(data);
          alert("registro eliminado de forma satisfactoría");
          this.getAllClientes();
        },
        err =>{
          //alert("ocurrio un error");
        }
      );
    }
  }

}