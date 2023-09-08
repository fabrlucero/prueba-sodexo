package com.fabrlucero.sodexo.controllers;

import com.fabrlucero.sodexo.api.comuna.entity.Comuna;
import com.fabrlucero.sodexo.api.comuna.entity.Elemento;
import com.fabrlucero.sodexo.api.comuna.services.ComunaService;
import com.fabrlucero.sodexo.models.entity.Persona;
import com.fabrlucero.sodexo.models.services.PersonaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/persona")
@RequiredArgsConstructor
public class PersonaController {

    private final ComunaService comunaService;
    private final PersonaService personaService;

    @GetMapping("/comunas")
    public ResponseEntity<?> getComunas(){
        // Obtenemos los datos desde la URL indicada.
        Elemento[] elementos = comunaService.getAllComunas();
        List<Comuna> comunas = new ArrayList<>();

        //Extraemos de la data los objeto de la comuna
        for (Elemento e : elementos){
            comunas.add(e.getComuna());
        }

        return new ResponseEntity<>(comunas
                , HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllPersona(){
        //Obtenemos los datos de los usuarios
        List<Persona> personas = personaService.getAllPersona();
        Map<String, Object> response = new HashMap<>();

        //Validamos si la lista no esta vaciá
        if(personas == null || personas.isEmpty()){
            response.put("mensaje", "No hay datos en el sistema");
            return  new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        response.put("personas", personas);
        response.put("mensaje", "Datos encontrados");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getPersona(@PathVariable Long id){
        //Obtenemos el dato del usuario por su id
         Persona persona = personaService.getPersonaPorId(id);

         Map<String, Object> response = new HashMap<>();

         //Validamos que exista el ID
         if(persona == null){
             response.put("mensaje", "No hay persona con el id solicitado");
             return  new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
         }

         response.put("persona", persona);
         response.put("mensaje", "Persona encontrada, cargando datos");

         return  new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> crearUsuario(@Valid @RequestBody Persona persona, BindingResult result){

        //Validamos que todos los campos esten completos
        if(result.hasErrors()){
            List<String> errors = new ArrayList<>();
            result.getFieldErrors().forEach(f -> errors.add(f.getField() + ": " + f.getDefaultMessage()));
            return  new ResponseEntity<>(errors, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Persona personaCreate = new Persona(persona.getNombre(), persona.getApellido(), persona.getTelefono(), persona.getComuna());
        Map<String, Object> response = new HashMap<>();
        personaService.savePersona(personaCreate);

        response.put("persona", personaCreate);
        response.put("mensaje", "Se ha creado a la persona con éxito");

        return  new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUsuario(@Valid @RequestBody Persona persona, @PathVariable Long id, BindingResult result){



        //Validamos que todos los campos esten completos
        if(result.hasErrors()){
            List<String> errors = new ArrayList<>();
            result.getFieldErrors().forEach(f -> errors.add(f.getField() + ": " + f.getDefaultMessage()));
            return  new ResponseEntity<>(errors, HttpStatus.INTERNAL_SERVER_ERROR);
        }


        Persona personaUpdate = personaService.getPersonaPorId(id);

        if(personaUpdate == null){
            return new ResponseEntity<>("No existe el usuario con el id" + id, HttpStatus.NOT_FOUND);
        }
        Map<String, Object> response = new HashMap<>();
        personaUpdate.updatePersona(persona);

        response.put("persona", personaUpdate);
        response.put("mensaje", "Se ha actualizado la persona con exito");

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePersona(@PathVariable Long id){
        Persona persona = personaService.getPersonaPorId(id);

        Map<String, Object> response = new HashMap<>();

        if(persona == null){
            response.put("mensaje", "No hay datos en el sistema");
            return  new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        personaService.deletePersona(id);
        response.put("mensaje", "Se ha eliminado a " + persona.getNombre());

        return  new ResponseEntity<>(response , HttpStatus.OK);
    }



}
