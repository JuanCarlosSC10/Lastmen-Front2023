import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasModel } from 'src/app/models/citas.model';
import { CitasService } from 'src/app/service/citas.service';
import{VeterinarioService} from'src/app/service/veterinario.service';
import{MascotaService} from'src/app/service/mascota.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cita-register',
  templateUrl: './cita-register.component.html',
  styleUrls: ['./cita-register.component.css']
})
export class CitasRegisterComponent implements OnInit {

  /*VARIABLES DE ENTRADA */
  @Input() citas: CitasModel = new CitasModel();
  /*VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  myForm: FormGroup;

  veterinario$!:Observable<any[]>;
  veterinario:any=[];
  mascota$!:Observable<any[]>;
  mascota:any=[];
  constructor(
    private _veterinarioservice:VeterinarioService,
    private _mascotaservice:MascotaService,
    private fb: FormBuilder,
    private _citasService: CitasService
  ) {
    this.myForm = this.fb.group({
      
      idCita: [null, [Validators.required]],
      idMascota: [null, [Validators.required]],
      idMedico: [null, [Validators.required]],
      fecha: [null, [Validators.required]],
      hora: [null, [Validators.required]],
      observaciones: [null, [Validators.required]],
    });
  }

  get f() { return this.myForm.controls; }

  ngOnInit(): void {
    /*FIXME: SET VALUE TRAE ERRORES CUANDO LOS ATRIBUTOS NO COINCIDEN AL 100% */
    //this.myForm.setValue(this.estado);
    this.myForm.patchValue(this.citas);
    this.veterinarioall();
    this.mascotaall();
  }
  veterinarioall(){
    this._veterinarioservice.getAll().subscribe(data=>{
      this.veterinario=data;
    })
  }
  mascotaall(){
    this._mascotaservice.getAll().subscribe(data=>{
      this.mascota=data;
    })
  }

  closeModal(res: boolean) {
    this.closeModalEmmit.emit(res);
  }

  save()
  {
    /*FIXME: SI POR A O B, TENEMOS UN CAMPO DES-HABILITADO DESDE ANGULAR / NO TRAE ESE VALOR */
    //this.estado = this.myForm.value();
    
    this.citas = this.myForm.getRawValue();
    debugger;
    if(this.citas.idCita == 0)
    {
      this.createCita();
      
    }
    else{
      this.updateCita();
    }

  }

  createCita()
  {
    this._citasService.create(this.citas).subscribe(
      (data:CitasModel)=>{
        alert("Registro creado de forma satisfactoria");
        this.closeModalEmmit.emit(true);
      },
      err => {
        console.log(err);
        this.closeModalEmmit.emit(false);
      }
    );
  }
  updateCita()
  {
    this._citasService.update(this.citas).subscribe(
      (data:CitasModel)=>{
        alert("Registro actualizado de forma satisfactoria");
        this.closeModalEmmit.emit(true);
      },
      err => {
        console.log(err);
        this.closeModalEmmit.emit(false);
      }
    );
  }
}

