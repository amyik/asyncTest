package com.albert.asyncTest.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Builder

public class Pipeline {

    private String projectId;

    private String name;

    private String status;

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
