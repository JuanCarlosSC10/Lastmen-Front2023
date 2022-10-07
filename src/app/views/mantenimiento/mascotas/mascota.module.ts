import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MascotaRoutingModule } from './mascota-routing.module';
import { MascotaListComponent } from './mascota-list/mascota-list.component';
import { MascotaRegisterComponent } from './mascota-register/mascota-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltroMascotaPipe } from '../../../pipes/filtro-mascota.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    MascotaListComponent,
    MascotaRegisterComponent,
    FiltroMascotaPipe
  ],
  imports: [
    CommonModule,
    MascotaRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule

  ]
})
export class MascotaModule { }