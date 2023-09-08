import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../service/persona.service';
import { Comuna } from '../../class/comuna/comuna';
import { Persona } from '../../class/persona';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [ConfirmationService ,MessageService]
})
export class HomeComponent implements OnInit{

  comunas: Comuna[] = [];
  personas: Persona[] | null = null;

  loading: boolean = false;

  constructor(private personaService: PersonaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService){
    this.personaService.getComunas().subscribe(
      response => {
        this.comunas = response
        
      }
    );

  }
  
  ngOnInit(): void {
    this.personaService.getListPersonas().subscribe(
      response => {
        this.personas = response.personas
      }
    )
  }

  obtenerRespuesta(event: any){
    if(event == null){
      return;
    }

    let indx = this.personas?.findIndex((persona) => {
      return persona.id === event.persona.id;
    })
    if(indx == -1){
      this.personas?.push(event.persona)
    }else{
      this.personas![indx!] = event.persona;
    }
    this.messageService.add({severity: 'success', detail: event.mensaje})
  }

  onEliminarPersona(persona: Persona){
    this.confirmationService.confirm({
      message: '¿Esta seguro de eliminar a esta persona?',
      header: `Eliminar - ${persona.nombre} ${persona.apellido}`,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.eliminarPersona(persona)
      },
      reject: () => {

      }
    })
  }

  eliminarPersona(persona: Persona){
    this.personaService.deletePersona(persona.id).subscribe(
      response => {
        let indx: number = this.personas!.indexOf(persona, 0);
        if(indx > -1){
          this.personas!.splice(indx, 1);
          this.messageService.add({severity: 'error', detail: response.mensaje!})
        }
      }
    );
  }


}
