package com.restaurant.bookingsystem.repository;

import com.restaurant.bookingsystem.entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByCategory(String category);
    List<FoodItem> findByNameContainingIgnoreCase(String name);
    List<FoodItem> findByIsAvailableTrue();

    void deleteByName(String name);

    Iterable<? extends FoodItem> findByName(String testName);
}