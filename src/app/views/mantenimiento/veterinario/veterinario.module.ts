import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VeterinarioRoutingModule } from './veterinario-routing.module';
import { VeterinarioListComponent } from './veterinario-list/veterinario-list.component';
import { VeterinarioRegisterComponent } from './veterinario-register/veterinario-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltroVeterinarioPipe } from '../../../pipes/filtro-veterinario.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    VeterinarioListComponent,
    VeterinarioRegisterComponent,
    FiltroVeterinarioPipe
  ],
  imports: [
    CommonModule,
    VeterinarioRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class VeterinarioModule { }
