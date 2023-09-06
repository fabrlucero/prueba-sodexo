package com.fabrlucero.sodexo.api.comuna.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Lombok;
import lombok.Setter;

@Data
public class Comuna {

    private String name;

    private String code;

    @Getter(onMethod_ = {@JsonProperty("contained_in")})
    @Setter(onMethod_ = {@JsonProperty("contained_in")})
    private ContainedIn containedIn;
}