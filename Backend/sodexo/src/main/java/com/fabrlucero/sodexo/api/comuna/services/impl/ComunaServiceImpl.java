package com.fabrlucero.sodexo.api.comuna.services.impl;

import com.fabrlucero.sodexo.api.comuna.client.ComunaFeignClient;
import com.fabrlucero.sodexo.api.comuna.entity.Comuna;
import com.fabrlucero.sodexo.api.comuna.entity.Elemento;
import com.fabrlucero.sodexo.api.comuna.services.ComunaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ComunaServiceImpl implements ComunaService {
    private final ComunaFeignClient client;

    @Override
    public Elemento[] getAllComunas() {

        return client.getComunas();
    }
}
