import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeterinarioListComponent } from './veterinario-list/veterinario-list.component';

const routes: Routes = [
  {
    path: '',
    component: VeterinarioListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeterinarioRoutingModule { }

