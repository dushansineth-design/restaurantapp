package com.restaurant.bookingsystem.bdd;

import io.cucumber.java.en.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.http.MediaType;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class FoodItemSteps {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;
    private String itemJson;

    @Given("the user provides valid food item details")
    public void the_user_provides_valid_food_item_details() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        itemJson = "{"
                + "\"name\":\"BDD Pizza\","
                + "\"price\":12.99,"
                + "\"description\":\"BDD-driven cheesy pizza\","
                + "\"category\":\"MAIN_COURSE\","
                + "\"imageUrl\":\"http://example.com/bdd-pizza.jpg\","
                + "\"isAvailable\":true"
                + "}";
    }

    @When("the user submits the food item to the system")
    public void the_user_submits_the_food_item_to_the_system() throws Exception {
        mockMvc.perform(post("/api/food-items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(itemJson))
                .andExpect(status().isCreated());
    }

    @Then("the system should respond with status {int} Created")
    public void the_system_should_respond_with_status_created(Integer expectedStatus) {
        // Assertion already handled
    }
}