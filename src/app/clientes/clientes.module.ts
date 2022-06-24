import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { MaterialModule } from '../shared/material.module';
import { ClienteUpdateComponent } from './components/cliente-update/cliente-update.component';
import { ClienteCreateComponent } from './components/cliente-create/cliente-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ClientesComponent,
    ClienteUpdateComponent,
    ClienteCreateComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    SharedModule
  ],
})
export class ClientesModule {}
