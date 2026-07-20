package com.fishdex.backend.controller;

import com.fishdex.backend.model.Fish;
import com.fishdex.backend.service.FishService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fish")
@CrossOrigin(origins = "http://localhost:3000")
public class FishController {

    private final FishService fishService;

    public FishController(FishService fishService) {
        this.fishService = fishService;
    }

    @GetMapping
    public List<Fish> getAllFish() {
        return fishService.getAllFish();
    }


    @GetMapping("/{id}")
    public Fish getFishById(
        @PathVariable String id) {
        return fishService.getFishById(id);
    }
}