package com.fabrlucero.sodexo.models.dao;

import com.fabrlucero.sodexo.models.entity.Persona;
import org.springframework.data.repository.CrudRepository;

public interface PersonaDao extends CrudRepository<Persona, Long> {
}
