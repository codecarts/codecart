package com.codecart.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
@Data // Lombok annotation for getters/setters
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String department;
    private String course;
    private int semester;
    private String subject;
    private String gdriveLink;
    private LocalDateTime createdAt = LocalDateTime.now();
}