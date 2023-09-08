import { Directive, Input, HostListener, EventEmitter, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AgregarActualizarComponent } from '../agregar-actualizar.component';
import { Persona } from 'src/app/persona/class/persona';
import { ResponsePersona } from 'src/app/persona/class/response-persona';

@Directive({
  selector: '[abrir-dialog]',
  providers: [DialogService]
})
export class AbrirDialogDirective {

  @Input() persona: Persona | null = null;
  @Output() response: EventEmitter<ResponsePersona> = new EventEmitter<ResponsePersona>;

  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) { 

  }

  @HostListener('click', ['$event'])
  onClickButton(){
    this.openDialog();
  }

  openDialog(){
    this.ref = this.dialogService.open(AgregarActualizarComponent,{
      data:{
        persona: this.persona
      },
      style:{
        'width' : '100%',
        'max-width' : '600px'
      }, 
      header: this.persona == null ? 'Crear persona' : `Actualizando a ${this.persona.nombre} ${this.persona.apellido}` 
      
    })

    let respuesta
    this.ref.onClose.subscribe(
      response =>{ 
        respuesta = response
        this.response.emit(respuesta);
      }
    )
      
   
  }


}
