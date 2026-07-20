package com.fishdex.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "fish")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Fish {

    @Id
    private String id;

    private String commonName;

    private String scientificName;

    private String imageUrl;

    @Column(length = 1000)
    private String description;

    private String habitat;

    private String averageLength;

    @ElementCollection
    private List<String> fishingTips;

    @ElementCollection
    private List<FishLocation> locations;

    private int scannedCount;

    private boolean collected;
}