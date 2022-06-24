import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadosRoutingModule } from './chamados-routing.module';
import { ChamadosComponent } from './chamados.component';
import { MaterialModule } from '../shared/material.module';
import { ChamadoCreateComponent } from './components/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado-update/chamado-update.component';
import { ChamadoDetailComponent } from './components/chamado-detail/chamado-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ChamadosComponent,
    ChamadoCreateComponent,
    ChamadoUpdateComponent,
    ChamadoDetailComponent,
  ],
  imports: [
    CommonModule,
    ChamadosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ChamadosModule { }
