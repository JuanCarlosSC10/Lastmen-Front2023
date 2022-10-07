import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/service/producto.service';
import{CategoriaService} from'src/app/service/categoria.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-producto-register',
  templateUrl: './producto-register.component.html',
  styleUrls: ['./producto-register.component.css']
})
export class ProductoRegisterComponent implements OnInit {

  /*VARIABLES DE ENTRADA */
  @Input() producto: ProductoModel = new ProductoModel();
  /*VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  myForm: FormGroup;

  categoria$!:Observable<any[]>;
  categoria:any=[];
  constructor(
    private _categoriaservice:CategoriaService,
    private fb: FormBuilder,
    private _productoService: ProductoService
  ) {
    this.myForm = this.fb.group({
      
      idProducto: [null, [Validators.required]],
      idCategoria: [null, [Validators.required]],
      nombreProducto: [null, [Validators.required]],
      precioCompra: [null, [Validators.required]],
      precioVenta: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
      fechaIngreso:[null, [Validators.required]],
      descripcion:[null, [Validators.required]],
    });
  }

  get f() { return this.myForm.controls; }

  ngOnInit(): void {
    /*FIXME: SET VALUE TRAE ERRORES CUANDO LOS ATRIBUTOS NO COINCIDEN AL 100% */
    //this.myForm.setValue(this.estado);
    this.myForm.patchValue(this.producto);
    this.categoriagetall();
  }

  categoriagetall(){
    this._categoriaservice.getAll().subscribe(data=>{
      this.categoria=data;
    })
  }
  
  closeModal(res: boolean) {
    this.closeModalEmmit.emit(res);
  }

  save()
  {
    /*FIXME: SI POR A O B, TENEMOS UN CAMPO DES-HABILITADO DESDE ANGULAR / NO TRAE ESE VALOR */
    //this.estado = this.myForm.value();
    
    this.producto = this.myForm.getRawValue();
    debugger;
    if(this.producto.idProducto == 0)
    {
      this.createProducto();
      
    }
    else{
      this.updateProducto();
    }

  }

  createProducto()
  {
    debugger;
    this._productoService.create(this.producto).subscribe(
      (data:ProductoModel)=>{
        alert("Registro creado de forma satisfactoría");
        this.closeModalEmmit.emit(true);
      },
      err => {
        console.log(err);
        this.closeModalEmmit.emit(false);
      }
    );
  }
  updateProducto()
  {
    this._productoService.update(this.producto).subscribe(
      (data:ProductoModel)=>{
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
