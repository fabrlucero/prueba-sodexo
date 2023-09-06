package com.fabrlucero.sodexo.api.comuna.client;

import com.fabrlucero.sodexo.api.comuna.entity.Comuna;
import com.fabrlucero.sodexo.api.comuna.entity.Elemento;
import com.fabrlucero.sodexo.api.configuration.FeignClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name="COMUNA-APIARY", url = "${external.apiary.url}", configuration = FeignClientConfig.class)
public interface ComunaFeignClient {

    @GetMapping(value = "/comunas", consumes = MediaType.APPLICATION_JSON_VALUE)
    Elemento[] getComunas();

}
