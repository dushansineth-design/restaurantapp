package com.restaurant.bookingsystem.dto;

import java.math.BigDecimal;

public class OrderItemDTO {
    private FoodItemDTO foodItem;
    private Integer quantity;
    private BigDecimal price;

    public OrderItemDTO() {}

    public OrderItemDTO(FoodItemDTO foodItem, Integer quantity, BigDecimal price) {
        this.foodItem = foodItem;
        this.quantity = quantity;
        this.price = price;
    }

    public FoodItemDTO getFoodItem() {
        return foodItem;
    }

    public void setFoodItem(FoodItemDTO foodItem) {
        this.foodItem = foodItem;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}