package com.codecart.api.dto;

import lombok.Data;

@Data
public class UserRegistrationDto {
    private String email;
    private String password;
}