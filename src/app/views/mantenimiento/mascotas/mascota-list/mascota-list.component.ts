import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MascotasModel } from 'src/app/models/mascota.model';
import { MascotaService } from 'src/app/service/mascota.service';
import{ClientesService} from'src/app/service/clientes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mascota-list',
  templateUrl: './mascota-list.component.html',
  styleUrls: ['./mascota-list.component.css']
})
export class MascotaListComponent implements OnInit {
  
  modalRef?: BsModalRef;
  mascotas:MascotasModel[] = [];
  mascotaSelected:MascotasModel = new MascotasModel();
  tituloModal:string = "";
  filtro='';
  page =0;
  clienteTiplist$!:Observable<any[]>;
  clienteTiplist:any=[];
  clienteTipoMap:Map<number,string>=new Map()
  constructor(
    private _clienteservice:ClientesService,
    public _mascotaService:MascotaService,
    public modalService: BsModalService

  ) { }
 
  ngOnInit(): void {
    this.getAllMascotas();
    this.clienteTiplist$=this._clienteservice.getAll();
    this.refreshClientetipoMap();
  }
  refreshClientetipoMap(){
    this._clienteservice.getAll().subscribe(data=>{
      this.clienteTiplist=data;
      for(let i=0; i<data.length;i++){
        this.clienteTipoMap.set(this.clienteTiplist[i].codCliente,this.clienteTiplist[i].nombres);
      }
    })
  }

  getAllMascotas()
  {
    this._mascotaService.getAll().subscribe(
      (data:MascotasModel[]) => {
        this.mascotas = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  editarRegistro(mascotas:MascotasModel,template: TemplateRef<any>)
  {
    this.tituloModal="EDITAR REGISTRO";
    this.mascotaSelected = mascotas;
    this.openModal(template);
  }

  crearRegistro(template: TemplateRef<any>)
  {
    this.tituloModal="CREAR REGISTRO";
    this.mascotaSelected = new MascotasModel();
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  recibeCloseModal(res:boolean)
  {
    if(res) //==> si es verdadero
    {
      this.getAllMascotas();      
    }
    this.modalRef?.hide();
  }


  modalDelete(mascota:MascotasModel)
  {
    let res = confirm("Está seguro de eliminar el registro");

    if(res) // si es verdadero
    {
      this._mascotaService.delete(mascota.idMascota).subscribe(
        (data:number)=>{
          console.log(data);
          alert("registro eliminado de forma satisfactoría");
          this.getAllMascotas();
        },
        err =>{
          //alert("ocurrio un error");
        }
      );
    }
  }

}
