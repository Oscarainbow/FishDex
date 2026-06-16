package com.fishdex.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class Fish {

    private String id;

    private String commonName;

    private String scientificName;

    private String imageUrl;

    private String description;

    private String habitat;

    private String averageLength;

    private List<String> fishingTips;

    private List<FishLocation> locations;

    private int scannedCount;

    private boolean collected;
}