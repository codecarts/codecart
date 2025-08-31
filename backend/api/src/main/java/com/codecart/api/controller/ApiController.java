package com.codecart.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Import all your models, repositories, and DTOs

@RestController
@RequestMapping("/api")
public class ApiController {
    
    // Autowire all your repositories here
    @Autowired private NoteRepository noteRepository;
    // ...

    // --- PUBLIC GET ENDPOINTS ---
    @GetMapping("/notes")
    public List<Note> getAllNotes() {
        return noteRepository.findAllByOrderByCreatedAtDesc();
    }
    // ... create similar GET endpoints for Pyqs, Blogs, Products ...

    // --- USER REGISTRATION ---
    @PostMapping("/users/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto userDto) {
        // Add logic to save user with hashed password
        return ResponseEntity.ok("User registered successfully");
    }
    
    // --- ADMIN POST ENDPOINTS (Simplified) ---
    // You would add admin protection logic here later
    @PostMapping("/notes")
    public Note createNote(@RequestBody Note note) {
        return noteRepository.save(note);
    }
    // ... create similar POST endpoints for Pyqs, Blogs, Products ...
}