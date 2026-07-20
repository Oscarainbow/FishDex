package com.fishdex.backend.repository;

import com.fishdex.backend.model.Fish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishRepository
        extends JpaRepository<Fish, String> {
}