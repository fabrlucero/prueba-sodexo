package com.fabrlucero.sodexo.models.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "personas")
@AllArgsConstructor
@NoArgsConstructor
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "persona_id")
    private Long id;

    @NotNull(message = "El nombre de la persona no puede estar vacío")
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull(message = "El apellido de la persona no puede estar vacío")
    @Column(name = "apellido", nullable = false)
    private String apellido;

    @NotNull(message = "El telefono de la persona no puede estar vacío")
    @Column(name = "telefono", nullable = false)
    private String telefono;

    @NotNull(message = "La comuna de la persona no puede estar vacío")
    @Column(name = "comuna", nullable = false)
    private String comuna;

    public Persona(@NotNull String nombre, @NotNull String apellido,
                   @NotNull String telefono, @NotNull String comuna){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.comuna = comuna;
    }

    public void updatePersona(Persona persona){
        this.id = persona.getId();
        this.nombre = persona.getNombre();
        this.apellido = persona.getApellido();
        this.telefono = persona.getTelefono();
        this.comuna = persona.getComuna();

    }


}
