package com.restaurant.bookingsystem.controller;

import com.restaurant.bookingsystem.dto.LoginRequest;
import com.restaurant.bookingsystem.dto.LoginResponse;
import com.restaurant.bookingsystem.dto.RegisterRequest;
import com.restaurant.bookingsystem.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return userService.loginUser(request);
    }



    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return userService.registerUser(registerRequest);
    }
}