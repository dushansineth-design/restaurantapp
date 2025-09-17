import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('dinexOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dinexOrders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderItems) => {
    const newOrder = {
      id: Date.now(),
      orderDate: new Date().toISOString(),
      orderItems: orderItems.map(item => ({
        foodItem: { name: item.name },
        quantity: 1
      })),
      total: orderItems.reduce((sum, item) => sum + item.price, 0)
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  const value = {
    orders,
    addOrder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};