package com.restaurant.bookingsystem.controller;

import com.restaurant.bookingsystem.repository.FoodItemRepository;
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

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class FoodItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FoodItemRepository foodItemRepository;

    private static final String TEST_NAME = "Test Pizza";
    private static final String TEST_CATEGORY = "MAIN_COURSE";

    @BeforeEach
    public void cleanUp() {
        foodItemRepository.deleteAll(
                foodItemRepository.findByName(TEST_NAME)
        );
    }

    @Disabled
    @Test
    public void shouldCreateFoodItemSuccessfully_whenValidInputProvided() throws Exception {
        String itemJson = "{"
                + "\"name\":\"" + TEST_NAME + "\","
                + "\"price\":9.99,"
                + "\"description\":\"Cheesy and delicious\","
                + "\"category\":\"" + TEST_CATEGORY + "\","
                + "\"imageUrl\":\"http://example.com/pizza.jpg\","
                + "\"isAvailable\":true"
                + "}";

        mockMvc.perform(post("/api/food-items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(itemJson))
                .andExpect(status().isCreated());
    }
}