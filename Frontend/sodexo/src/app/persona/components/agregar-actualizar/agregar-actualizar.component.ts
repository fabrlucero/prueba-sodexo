import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../service/persona.service';
import { Comuna } from '../../class/comuna/comuna';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Persona } from '../../class/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-actualizar',
  templateUrl: './agregar-actualizar.component.html',
  styleUrls: ['./agregar-actualizar.component.sass'],
})
export class AgregarActualizarComponent implements OnInit {
  formPersona: FormGroup;
  comunas: Comuna[] = [];
  persona: Persona | null = null;

  constructor(
    private personaService: PersonaService,
    private ref: DynamicDialogRef,
    public dynamicDialogConfig: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.persona = this.dynamicDialogConfig.data['persona'];

    if (this.persona != null && this.persona.id != null) {
      this.formPersona = this.fb.group({
        nombre: [
          this.persona.nombre,
          [Validators.required, Validators.minLength(1)],
        ],
        apellido: [
          this.persona.apellido,
          [Validators.required, Validators.minLength(1)],
        ],
        telefono: [
          this.persona.telefono,
          [
            Validators.required,
            Validators.nullValidator,
            Validators.minLength(9),
            Validators.maxLength(12),
          ],
        ],
        comuna: [
          this.persona.comuna,
          [Validators.required, Validators.nullValidator],
        ],
      });
    } else {
      this.formPersona = this.fb.group({
        nombre: [
          '',
          [
            Validators.required,
            Validators.nullValidator,
            Validators.minLength(1),
          ],
        ],
        apellido: [
          '',
          [
            Validators.required,
            Validators.nullValidator,
            Validators.minLength(1),
          ],
        ],
        telefono: [
          '',
          [
            Validators.required,
            Validators.nullValidator,
            Validators.minLength(9),
            Validators.maxLength(12),
          ],
        ],
        comuna: [null, [Validators.required, Validators.nullValidator]],
      });
    }
  }

  ngOnInit(): void {
    this.personaService
      .getComunas()
      .subscribe((response) => (this.comunas = response));
  }

  onCancelar() {
    this.ref.close();
  }

  onSavePersona() {
    if (this.formPersona.valid) {
      this.persona = this.formPersona.value;
      this.personaService.createPersona(this.persona!).subscribe((response) => {
        this.ref.close(response);
      });
    }
  }

  onClearForm(){
    this.formPersona.reset();
  }

  onUpdatePersona() {
    if (this.formPersona.valid) {
      let { nombre, apellido, telefono, comuna } = this.formPersona.value;

      this.persona!.nombre = nombre;
      this.persona!.apellido = apellido;
      this.persona!.telefono = telefono;
      this.persona!.comuna = comuna;

      this.personaService
        .updatePersona(this.persona!, this.persona!.id)
        .subscribe((response) => {
          this.ref.close(response);
        });
    }
  }
}
