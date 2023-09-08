import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { HomeComponent } from './page/home/home.component';

import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AgregarActualizarModule } from './components/agregar-actualizar/agregar-actualizar.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    AgregarActualizarModule,
    ButtonModule,
    DynamicDialogModule,
    ToastModule,
    TableModule,
    ConfirmDialogModule
  ]
})
export class PersonaModule { }
