import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VeterinarioModel } from 'src/app/models/veterinario.model';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario-register',
  templateUrl: './veterinario-register.component.html',
  styleUrls: ['./veterinario-register.component.css']
})
export class VeterinarioRegisterComponent implements OnInit {

  /*VARIABLES DE ENTRADA */
  @Input() veterinario: VeterinarioModel = new VeterinarioModel();
  /*VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _veterinarioService: VeterinarioService
  ) {
    this.myForm = this.fb.group({
      
      idMedico: [null, [Validators.required]],
      nombres: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      dni: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      celular: [null, [Validators.required]],
    });
  }

  get f() { return this.myForm.controls; }

  ngOnInit(): void {
    /*FIXME: SET VALUE TRAE ERRORES CUANDO LOS ATRIBUTOS NO COINCIDEN AL 100% */
    //this.myForm.setValue(this.estado);
    this.myForm.patchValue(this.veterinario);
  }

  closeModal(res: boolean) {
    this.closeModalEmmit.emit(res);
  }

  save()
  {
    /*FIXME: SI POR A O B, TENEMOS UN CAMPO DES-HABILITADO DESDE ANGULAR / NO TRAE ESE VALOR */
    //this.estado = this.myForm.value();
    
    this.veterinario = this.myForm.getRawValue();
    debugger;
    if(this.veterinario.idMedico == 0)
    {
      this.createVeterinario();
      
    }
    else{
      this.updateVeterinario();
    }

  }

  createVeterinario()
  {
    this._veterinarioService.create(this.veterinario).subscribe(
      (data:VeterinarioModel)=>{
        alert("Registro creado de forma satisfactoría");
        this.closeModalEmmit.emit(true);
      },
      err => {
        console.log(err);
        this.closeModalEmmit.emit(false);
      }
    );
  }
  updateVeterinario()
  {
    this._veterinarioService.update(this.veterinario).subscribe(
      (data:VeterinarioModel)=>{
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