package com.restaurant.bookingsystem.controller;

import com.restaurant.bookingsystem.dto.FoodItemDTO;
import com.restaurant.bookingsystem.entity.FoodItem;
import com.restaurant.bookingsystem.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/food-items")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    private FoodItemDTO convertToDTO(FoodItem foodItem) {
        return new FoodItemDTO(
                foodItem.getId(),
                foodItem.getName(),
                foodItem.getDescription(),
                foodItem.getPrice(),
                foodItem.getImageUrl(),
                foodItem.getCategory(),
                foodItem.getIsAvailable()
        );
    }

    @GetMapping
    public List<FoodItemDTO> getAllFoodItems() {
        return foodItemService.getAllFoodItems().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItemDTO> getFoodItemById(@PathVariable Long id) {
        Optional<FoodItem> foodItem = foodItemService.getFoodItemById(id);
        return foodItem.map(item -> ResponseEntity.ok(convertToDTO(item)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FoodItem> createFoodItem(@RequestBody FoodItem foodItem) {
        FoodItem savedItem = foodItemService.createFoodItem(foodItem);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodItem> updateFoodItem(@PathVariable Long id, @RequestBody FoodItem foodItemDetails) {
        try {
            FoodItem updatedFoodItem = foodItemService.updateFoodItem(id, foodItemDetails);
            return ResponseEntity.ok(updatedFoodItem);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFoodItem(@PathVariable Long id) {
        try {
            foodItemService.deleteFoodItem(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<FoodItem> searchFoodItems(@RequestParam String query) {
        return foodItemService.searchFoodItems(query);
    }

    @GetMapping("/category/{category}")
    public List<FoodItem> getFoodItemsByCategory(@PathVariable String category) {
        return foodItemService.getFoodItemsByCategory(category);
    }

    @GetMapping("/available")
    public List<FoodItem> getAvailableFoodItems() {
        return foodItemService.getAvailableFoodItems();
    }
}