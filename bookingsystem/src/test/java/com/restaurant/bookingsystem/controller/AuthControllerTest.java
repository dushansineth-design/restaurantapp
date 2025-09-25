package com.restaurant.bookingsystem.controller;

import com.restaurant.bookingsystem.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Disabled
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    private static final String TEST_EMAIL = "testuser1234@example.com";
    private static final String TEST_USERNAME = "testuser1234";

    @BeforeEach
    public void cleanUp() {
        userRepository.deleteByEmail(TEST_EMAIL); // ✅ Correct usage
    }

    @Disabled
    @Test
    public void shouldRegisterUserSuccessfully_whenValidInputProvided() throws Exception {
        String userJson = "{"
                + "\"username\":\"" + TEST_USERNAME + "\","
                + "\"email\":\"" + TEST_EMAIL + "\","
                + "\"password\":\"password123\","
                + "\"address\":\"Colombo\","
                + "\"contact\":\"0771234568\""
                + "}";

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isOk());
    }
}