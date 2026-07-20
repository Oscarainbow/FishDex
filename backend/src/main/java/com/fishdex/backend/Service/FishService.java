package com.fishdex.backend.service;

import com.fishdex.backend.model.Fish;
import com.fishdex.backend.repository.FishRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FishService {

    private final FishRepository fishRepository;

    public FishService(FishRepository fishRepository) {
        this.fishRepository = fishRepository;
    }

    public List<Fish> getAllFish() {
        return fishRepository.findAll();
    }

    public Fish getFishById(String id) {
        return fishRepository
                .findById(id)
                .orElse(null);
    }
}