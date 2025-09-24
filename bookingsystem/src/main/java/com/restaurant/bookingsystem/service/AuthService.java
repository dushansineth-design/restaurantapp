package com.restaurant.bookingsystem.service;

import com.restaurant.bookingsystem.dto.LoginRequest;
import com.restaurant.bookingsystem.dto.LoginResponse;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public LoginResponse login(LoginRequest request) {
        // Dummy implementation for testing
        if ("dushan".equals(request.getUsername()) && "123456".equals(request.getPassword())) {
            return new LoginResponse("mock-jwt-token", "dushan");
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}