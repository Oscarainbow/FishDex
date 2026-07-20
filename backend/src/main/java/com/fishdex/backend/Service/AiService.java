package com.fishdex.backend.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;


@Service
public class AiService {


    private final RestTemplate restTemplate = new RestTemplate();


    private final String AI_URL =
            "http://localhost:8000/predict";


    public String predict(MultipartFile file) throws Exception {


        ByteArrayResource resource =
                new ByteArrayResource(file.getBytes()) {

                    @Override
                    public String getFilename() {
                        return file.getOriginalFilename();
                    }
                };


        MultiValueMap<String, Object> body =
                new LinkedMultiValueMap<>();

        body.add("file", resource);



        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(
                MediaType.MULTIPART_FORM_DATA
        );


        HttpEntity<MultiValueMap<String,Object>> request =
                new HttpEntity<>(
                        body,
                        headers
                );


        ResponseEntity<String> response =
                restTemplate.postForEntity(
                        AI_URL,
                        request,
                        String.class
                );


        return response.getBody();
    }
}