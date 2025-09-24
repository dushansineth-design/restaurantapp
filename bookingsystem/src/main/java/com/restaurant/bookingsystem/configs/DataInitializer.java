package com.restaurant.bookingsystem.configs;

import com.restaurant.bookingsystem.entity.Category;
import com.restaurant.bookingsystem.entity.FoodItem;
import com.restaurant.bookingsystem.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static com.restaurant.bookingsystem.entity.Category.*;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== DATA INITIALIZER STARTED ===");

        long countBefore = foodItemRepository.count();
        System.out.println("Items in database before: " + countBefore);

        // Only add items if the table is empty
        if (countBefore == 0) {
            List<FoodItem> defaultFoodItems = Arrays.asList(
                    createFoodItem("GRILLED CHICKEN", "Juicy grilled chicken with special herbs",
                            new BigDecimal("8.33"), "/images/pic2.jpg", MAIN_COURSE),
                    createFoodItem("BUTTER PRAWNS", "Fresh prawns cooked in rich butter sauce",
                            new BigDecimal("10.11"), "/images/pic16.jpg", SIDE_DISHES),
                    createFoodItem("SPICY GARLIC RAMEN", "Authentic ramen with spicy garlic broth",
                            new BigDecimal("15.67"), "/images/pic14.jpg", MAIN_COURSE),
                    createFoodItem("CRISPY CHICKEN", "Golden crispy chicken with dipping sauce",
                            new BigDecimal("9.58"), "/images/pic10.jpg", Appetizer),
                    createFoodItem("CREAMY PASTA", "Pasta in our signature creamy sauce",
                            new BigDecimal("12.43"), "/images/pic7.jpg", MAIN_COURSE),
                    createFoodItem("CHEESE PIZZA", "Classic pizza with three cheese blend",
                            new BigDecimal("11.95"), "/images/pic5.jpg", MAIN_COURSE)
            );

            foodItemRepository.saveAll(defaultFoodItems);
            System.out.println("Added new food items");

            long countFinal = foodItemRepository.count();
            System.out.println("Items in database after insert: " + countFinal);
        } else {
            System.out.println("Database already has data. Skipping initialization.");
        }

        System.out.println("=== DATA INITIALIZER COMPLETED ===");
    }

    private FoodItem createFoodItem(String name, String description, BigDecimal price,
                                    String imageUrl, Category category) {
        FoodItem item = new FoodItem();
        item.setName(name);
        item.setDescription(description);
        item.setPrice(price);
        item.setImageUrl(imageUrl);
        item.setCategory(category);
        item.setIsAvailable(true);
        return item;
    }
}