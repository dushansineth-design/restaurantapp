package com.restaurant.bookingsystem.service;

import com.restaurant.bookingsystem.entity.FoodItem;
import com.restaurant.bookingsystem.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public Optional<FoodItem> getFoodItemById(Long id) {
        return foodItemRepository.findById(id);
    }

    public FoodItem createFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }

    public FoodItem updateFoodItem(Long id, FoodItem foodItemDetails) {
        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FoodItem not found with id: " + id));

        foodItem.setName(foodItemDetails.getName());
        foodItem.setDescription(foodItemDetails.getDescription());
        foodItem.setPrice(foodItemDetails.getPrice());
        foodItem.setImageUrl(foodItemDetails.getImageUrl());
        foodItem.setCategory(foodItemDetails.getCategory());
        foodItem.setIsAvailable(foodItemDetails.getIsAvailable());

        return foodItemRepository.save(foodItem);
    }

    public void deleteFoodItem(Long id) {
        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FoodItem not found with id: " + id));
        foodItemRepository.delete(foodItem);
    }

    public List<FoodItem> searchFoodItems(String query) {
        return foodItemRepository.findByNameContainingIgnoreCase(query);
    }

    public List<FoodItem> getFoodItemsByCategory(String category) {
        return foodItemRepository.findByCategory(category);
    }

    public List<FoodItem> getAvailableFoodItems() {
        return foodItemRepository.findByIsAvailableTrue();
    }

    public FoodItem save(FoodItem item) {
        return foodItemRepository.save(item);
    }
}