import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { ProveedorRegisterComponent } from './proveedor-register/proveedor-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltroClientePipe } from '../../../pipes/filtro-cliente.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ProveedorListComponent,
    ProveedorRegisterComponent,
    FiltroClientePipe
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ClientesModule { }