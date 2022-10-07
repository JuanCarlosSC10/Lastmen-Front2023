import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotasModel } from 'src/app/models/mascota.model';
import { MascotaService } from 'src/app/service/mascota.service';
import {ClientesService} from'src/app/service/clientes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mascota-register',
  templateUrl: './mascota-register.component.html',
  styleUrls: ['./mascota-register.component.css']
})
export class MascotaRegisterComponent implements OnInit {

  /*VARIABLES DE ENTRADA */
  @Input() mascota: MascotasModel = new MascotasModel();
  /*VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  myForm: FormGroup;
  cliente$!:Observable<any[]>;
  cliente:any=[];
  constructor(
    private _clienteservice:ClientesService,
    private fb: FormBuilder,
    private _mascotaService: MascotaService
  ) {
    this.myForm = this.fb.group({
      
      idMascota: [null, [Validators.required]],
      codCliente: [null, [Validators.required]],
      raza: [null, [Validators.required]],
      nombres: [null, [Validators.required]],
      peso: [null, [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
    });
  }

  get f() { return this.myForm.controls; }

  ngOnInit(): void {
    /*FIXME: SET VALUE TRAE ERRORES CUANDO LOS ATRIBUTOS NO COINCIDEN AL 100% */
    //this.myForm.setValue(this.estado);
    this.myForm.patchValue(this.mascota);
    this.clientegetall();
  }
  clientegetall(){
    this._clienteservice.getAll().subscribe(data=>{
      this.cliente=data;
    })
  }

  closeModal(res: boolean) {
    this.closeModalEmmit.emit(res);
  }

  save()
  {
    /*FIXME: SI POR A O B, TENEMOS UN CAMPO DES-HABILITADO DESDE ANGULAR / NO TRAE ESE VALOR */
    //this.estado = this.myForm.value();
    
    this.mascota = this.myForm.getRawValue();
    debugger;
    if(this.mascota.idMascota == 0)
    {
      this.createMascota();
      
    }
    else{
      this.updateMascota();
    }

  }

  createMascota()
  {
    this._mascotaService.create(this.mascota).subscribe(
      (data:MascotasModel)=>{
        alert("Registro creado de forma satisfactoría");
        this.closeModalEmmit.emit(true);
      },
      err => {
        console.log(err);
        this.closeModalEmmit.emit(false);
      }
    );
  }
  updateMascota()
  {
    this._mascotaService.update(this.mascota).subscribe(
      (data:MascotasModel)=>{
        alert("Registro actualizado de forma satisfactoría");
        this.closeModalEmmit.emit(true);
      },
      err => {
        console.log(err);
        this.closeModalEmmit.emit(false);
      }
    );
  }
}
