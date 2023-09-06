package com.fabrlucero.sodexo.models.services.impl;

import com.fabrlucero.sodexo.models.dao.PersonaDao;
import com.fabrlucero.sodexo.models.entity.Persona;
import com.fabrlucero.sodexo.models.services.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PersonaServiceImpl implements PersonaService {

    @Autowired
    private PersonaDao personaDao;


    @Override
    @Transactional(readOnly = true)
    public List<Persona> getAllPersona() {
        return (List<Persona>) personaDao.findAll();
    }

    @Override
    @Transactional
    public Persona savePersona(Persona persona) {
        return personaDao.save(persona);
    }

    @Override
    @Transactional(readOnly = true)
    public Persona getPersonaPorId(Long id) {
        return personaDao.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public void deletePersona(Long id) {
        Persona persona = personaDao.findById(id).orElse(null);
        if(persona != null){
            personaDao.delete(persona);
        }
    }
}
