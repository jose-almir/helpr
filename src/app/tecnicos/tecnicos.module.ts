import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnicosRoutingModule } from './tecnicos-routing.module';
import { TecnicosComponent } from './tecnicos.component';
import { MaterialModule } from '../shared/material.module';
import { TecnicoUpdateComponent } from './components/tecnico-update/tecnico-update.component';
import { TecnicoCreateComponent } from './components/tecnico-create/tecnico-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    TecnicosComponent,
    TecnicoUpdateComponent,
    TecnicoCreateComponent,
  ],
  imports: [
    CommonModule,
    TecnicosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ],
})
export class TecnicosModule {}
