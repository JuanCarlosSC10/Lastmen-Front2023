import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CitasRoutingModule } from './citas-routing.module';
import { CitaListComponent } from './cita-list/cita-list.component';
import { CitasRegisterComponent } from './cita-register/cita-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CitaListComponent,
    CitasRegisterComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CitasModule { }
