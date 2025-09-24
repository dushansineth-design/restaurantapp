package com.restaurant.bookingsystem.dto;

import java.util.List;

public class OrderDTO {
    private List<OrderItemDTO> orderItems;
    private String deliveryAddress;
    private String contactNumber;

    public OrderDTO() {}

    public OrderDTO(List<OrderItemDTO> orderItems, String deliveryAddress, String contactNumber) {
        this.orderItems = orderItems;
        this.deliveryAddress = deliveryAddress;
        this.contactNumber = contactNumber;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
}