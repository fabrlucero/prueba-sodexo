import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbrirDialogDirective } from './directiva/abrir-dialog.directive';
import { AgregarActualizarComponent } from './agregar-actualizar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AbrirDialogDirective,
    AgregarActualizarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule
  ],
  exports: [
    AbrirDialogDirective,
  ]
})
export class AgregarActualizarModule { }
