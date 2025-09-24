package com.restaurant.bookingsystem.controller;

import com.restaurant.bookingsystem.dto.OrderDTO;
import com.restaurant.bookingsystem.dto.OrderItemDTO;
import com.restaurant.bookingsystem.entity.*;
import com.restaurant.bookingsystem.repository.FoodItemRepository;
import com.restaurant.bookingsystem.repository.OrderRepository;
import com.restaurant.bookingsystem.repository.UserRepository;
import com.restaurant.bookingsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Order> getUserOrders(Authentication authentication) {
        String username = authentication.getName();
        return orderService.getOrdersByUser(username);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        Optional<Order> order = orderService.getOrderById(id);

        if (order.isPresent() && order.get().getUser().getUsername().equals(username)) {
            return ResponseEntity.ok(order.get());
        }
        return ResponseEntity.notFound().build();
    }


    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setDeliveryAddress(orderDTO.getDeliveryAddress());
        order.setContactNumber(orderDTO.getContactNumber());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemDTO itemDTO : orderDTO.getOrderItems()) {
            FoodItem foodItem = foodItemRepository.findById(itemDTO.getFoodItem().getId())
                    .orElseThrow(() -> new RuntimeException("Food item not found"));

            OrderItem orderItem = new OrderItem(order, foodItem, itemDTO.getQuantity(), itemDTO.getPrice());
            items.add(orderItem);
            total = total.add(itemDTO.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity())));
        }

        order.setOrderItems(items);
        order.setTotalAmount(total);

        orderRepository.save(order);

        return ResponseEntity.ok("Order placed successfully");
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam String status, Authentication authentication) {
        try {
            String username = authentication.getName();
            Order order = orderService.getOrderById(id)
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            if (!order.getUser().getUsername().equals(username)) {
                return ResponseEntity.status(403).build();
            }

            Order updatedOrder = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/statuses")
    public OrderStatus[] getOrderStatuses() {
        return OrderStatus.values();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id, Authentication authentication) {
        try {
            String username = authentication.getName();
            Order order = orderService.getOrderById(id)
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            if (!order.getUser().getUsername().equals(username)) {
                return ResponseEntity.status(403).build();
            }

            orderService.deleteOrder(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/items")
    public ResponseEntity<Order> updateOrderItems(
            @PathVariable Long id,
            @RequestBody List<OrderItemDTO> updatedItems,
            Authentication authentication
    ) {
        String username = authentication.getName();
        Order order = orderService.getOrderById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getUsername().equals(username)) {
            return ResponseEntity.status(403).build();
        }

        List<OrderItem> newItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemDTO itemDTO : updatedItems) {
            FoodItem foodItem = foodItemRepository.findById(itemDTO.getFoodItem().getId())
                    .orElseThrow(() -> new RuntimeException("Food item not found"));

            OrderItem orderItem = new OrderItem(order, foodItem, itemDTO.getQuantity(), itemDTO.getPrice());
            newItems.add(orderItem);
            total = total.add(itemDTO.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity())));
        }

        order.setOrderItems(newItems);
        order.setTotalAmount(total);

        return ResponseEntity.ok(orderRepository.save(order));
    }

}