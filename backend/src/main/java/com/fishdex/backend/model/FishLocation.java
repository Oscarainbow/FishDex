package com.fishdex.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FishLocation {

    private String id;

    private String name;

    private double latitude;

    private double longitude;
}