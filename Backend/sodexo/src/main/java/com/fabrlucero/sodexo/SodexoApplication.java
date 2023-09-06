package com.fabrlucero.sodexo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SodexoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SodexoApplication.class, args);
	}

}
