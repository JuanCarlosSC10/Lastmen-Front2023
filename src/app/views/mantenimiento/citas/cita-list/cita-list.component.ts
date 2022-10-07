import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CitasModel } from 'src/app/models/citas.model';
import { CitasService } from 'src/app/service/citas.service';
import{VeterinarioService} from'src/app/service/veterinario.service';
import{MascotaService} from'src/app/service/mascota.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.css']
})
export class CitaListComponent implements OnInit {
  modalRef?: BsModalRef;
  citas:CitasModel[] = [];
  citaSelected:CitasModel = new CitasModel();
  tituloModal:string = "";

  veterinariolist$!:Observable<any[]>;
  veterinariolist:any=[];
  veterinariolistMap:Map<number,string>=new Map()

  mascotalist$!:Observable<any[]>;
  mascotalist:any=[];
  mascotalisMap:Map<number,string>=new Map()
  constructor(
    private _veterinarioservice:VeterinarioService,
    private _mascotaservice:MascotaService,
    public _citaService:CitasService,
    public modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllCitas();
    this.refreshmascotaMap();
    this.refreshveterinarioMap();
  }
  refreshveterinarioMap(){
    this._veterinarioservice.getAll().subscribe(data=>{
      this.veterinariolist=data;
      for(let i=0; i<data.length;i++){
        this.veterinariolistMap.set(this.veterinariolist[i].idMedico,this.veterinariolist[i].nombres);
      }
    })
  }
  refreshmascotaMap(){
    this._mascotaservice.getAll().subscribe(data=>{
      this.mascotalist=data;
      for(let i=0; i<data.length;i++){
        this.mascotalisMap.set(this.mascotalist[i].idMascota,this.mascotalist[i].nombres);
      }
    })
  }

  getAllCitas()
  {
    this._citaService.getAll().subscribe(
      (data:CitasModel[]) => {
        this.citas = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  editarRegistro(citas:CitasModel,template: TemplateRef<any>)
  {
    this.tituloModal="EDITAR REGISTRO";
    this.citaSelected = citas;
    this.openModal(template);
  }

  crearRegistro(template: TemplateRef<any>)
  {
    this.tituloModal="CREAR CITA";
    this.citaSelected = new CitasModel();
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  recibeCloseModal(res:boolean)
  {
    if(res) //==> si es verdadero
    {
      this.getAllCitas();      
    }
    this.modalRef?.hide();
  }


  modalDelete(cita:  CitasModel)
  {
    let res = confirm("Esta seguro de eliminar el registro");

    if(res) // si es verdadero
    {
      this._citaService.delete(cita.idCita).subscribe(
        (data:number)=>{
          console.log(data);
          alert("registro eliminado de forma satisfactoria");
          this.getAllCitas();
        },
        err =>{
          //alert("ocurrio un error");
        }
      );
    }
  }

}
