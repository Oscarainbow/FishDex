package com.fishdex.backend.controller;


import com.fishdex.backend.service.AiService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AiController {
    @GetMapping("/test")
    public String test(){
        return "controller works";
    }


    private final AiService aiService;


    public AiController(AiService aiService){
        this.aiService = aiService;
    }



    @PostMapping("/predict")
    public String predict(
            @RequestParam("file") MultipartFile file
    ) throws Exception {


        return aiService.predict(file);
    }
}