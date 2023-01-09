import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {  UsuarioModel} from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  modalRef?: BsModalRef;
  usuario:UsuarioModel[] = [];
  usuarioSelected:UsuarioModel = new UsuarioModel();
  tituloModal:string = "";
  page=0;
  filtro='';
  constructor(
    private _usuarioService:UsuarioService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllUsuario();
  }

  getAllUsuario()
  {
    this._usuarioService.getAll().subscribe(
      (data:UsuarioModel[]) => {
        this.usuario = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  editarRegistro(usuario:UsuarioModel,template: TemplateRef<any>)
  {
    this.tituloModal="EDITAR REGISTRO";
    this.usuarioSelected = usuario;
    this.openModal(template);
  }

  crearRegistro(template: TemplateRef<any>)
  {
    this.tituloModal="CREAR REGISTRO";
    this.usuarioSelected = new UsuarioModel();
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  recibeCloseModal(res:boolean)
  {
    if(res) //==> si es verdadero
    {
      this.getAllUsuario();      
    }
    this.modalRef?.hide();
  }


  modalDelete(usuario:UsuarioModel)
  {

    let res= Swal.fire({
      title: '¿Está seguro de eliminar el registro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.delete(usuario.idUsuario).subscribe(
           (data:number)=>{
            console.log(data);
        Swal.fire(
          'Eliminado!',
          'registro eliminado de forma satisfactoría.',
          'success'
        )
        this.getAllUsuario();
        });
        
      }
    })
    // let res = confirm("Está seguro de eliminar el registro");

    // if(res) // si es verdadero
    // {
    //   this._usuarioService.delete(usuario.idUsuario).subscribe(
    //     (data:number)=>{
    //       console.log(data);
    //       alert("registro eliminado de forma satisfactoría");
    //       this.getAllUsuario();
    //     },
    //     err =>{
    //       //alert("ocurrio un error");
    //     }
    //   );
    // }
  }

}
