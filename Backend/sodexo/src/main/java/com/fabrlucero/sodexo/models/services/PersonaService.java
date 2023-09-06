package com.fabrlucero.sodexo.models.services;

import com.fabrlucero.sodexo.models.entity.Persona;

import java.util.List;

public interface PersonaService {

    public List<Persona> getAllPersona();
    public Persona savePersona(Persona persona);
    public Persona getPersonaPorId(Long id);

    public void deletePersona(Long id);


}
