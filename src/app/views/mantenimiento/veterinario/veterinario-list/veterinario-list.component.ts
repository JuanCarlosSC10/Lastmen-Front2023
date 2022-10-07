import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { VeterinarioModel } from 'src/app/models/veterinario.model';
import { VeterinarioService } from 'src/app/service/veterinario.service';


@Component({
  selector: 'app-veterinario-list',
  templateUrl: './veterinario-list.component.html',
  styleUrls: ['./veterinario-list.component.css']
})
export class VeterinarioListComponent implements OnInit {
  modalRef?: BsModalRef;

  veterinario:VeterinarioModel[] = [];
  veterinarioSelected:VeterinarioModel = new VeterinarioModel();
  tituloModal:string = "";
  page=0;
  filtro='';
  constructor(
    private _veterinarioService:VeterinarioService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllVeterinario();
  }

  getAllVeterinario()
  {
    this._veterinarioService.getAll().subscribe(
      (data:VeterinarioModel[]) => {
        this.veterinario = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  editarRegistro(veterinario:VeterinarioModel,template: TemplateRef<any>)
  {
    this.tituloModal="EDITAR REGISTRO";
    this.veterinarioSelected = veterinario;
    this.openModal(template);
  }

  crearRegistro(template: TemplateRef<any>)
  {
    this.tituloModal="CREAR REGISTRO";
    this.veterinarioSelected = new VeterinarioModel();
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  recibeCloseModal(res:boolean)
  {
    if(res) //==> si es verdadero
    {
      this.getAllVeterinario();      
    }
    this.modalRef?.hide();
  }


  modalDelete(veterinario:VeterinarioModel)
  {
    let res = confirm("Está seguro de eliminar el registro");

    if(res) // si es verdadero
    {
      this._veterinarioService.delete(veterinario.idMedico).subscribe(
        (data:number)=>{
          console.log(data);
          alert("registro eliminado de forma satisfactoría");
          this.getAllVeterinario();
        },
        err =>{
          //alert("ocurrio un error");
        }
      );
    }
  }

}