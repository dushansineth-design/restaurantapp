import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import MenuItem from '../../components/MenuItem/MenuItem.jsx';
import './Menu.css';

import grilledChicken from '../../assets/pic2.jpg';
import butterPrawns from '../../assets/pic16.jpg';
import spicyRamen from '../../assets/pic14.jpg';
import crispyChicken from '../../assets/pic10.jpg';
import creamyPasta from '../../assets/pic7.jpg';
import cheesePizza from '../../assets/pic5.jpg';

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fallbackMenuItems = [
    { 
      id: 1, 
      name: 'GRILLED CHICKEN', 
      description: 'Juicy grilled chicken with special herbs', 
      price: 8.33,
      imageUrl: grilledChicken
    },
    { 
      id: 2, 
      name: 'BUTTER PRAWNS', 
      description: 'Fresh prawns cooked in rich butter sauce', 
      price: 10.11,
      imageUrl: butterPrawns
    },
    { 
      id: 3, 
      name: 'SPICY GARLIC RAMEN', 
      description: 'Authentic ramen with spicy garlic broth', 
      price: 15.67,
      imageUrl: spicyRamen
    },
    { 
      id: 4, 
      name: 'CRISPY CHICKEN', 
      description: 'Golden crispy chicken with dipping sauce', 
      price: 9.58,
      imageUrl: crispyChicken
    },
    { 
      id: 5, 
      name: 'CREAMY PASTA', 
      description: 'Pasta in our signature creamy sauce', 
      price: 12.43,
      imageUrl: creamyPasta
    },
    { 
      id: 6, 
      name: 'CHEESE PIZZA', 
      description: 'Classic pizza with three cheese blend', 
      price: 11.95,
      imageUrl: cheesePizza
    },
  ];

  useEffect(() => {
    fetchFoodItems();
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!(token && user));
  };

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      
      try {
        const API_URL = 'http://localhost:8080/api/food-items';
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log("API response status:", response.status);
        
        if (response.ok) {
          const items = await response.json();
          console.log("API response data:", items);
          
          const processedItems = items.map(item => ({
            id: item.id,
            name: item.name || 'Unknown Item',
            description: item.description || 'No description available',
            price: typeof item.price === 'number' ? item.price : 
                  typeof item.price === 'string' ? parseFloat(item.price) : 0,
            imageUrl: item.imageUrl ? `http://localhost:8080${item.imageUrl}` : fallbackMenuItems[0].imageUrl,
            category: item.category || 'Uncategorized',
            isAvailable: item.isAvailable !== undefined ? item.isAvailable : true
          }));
          
          if (Array.isArray(processedItems) && processedItems.length > 0) {
            setFoodItems(processedItems);
          } else {
            console.log("API returned empty array, using fallback data");
            setFoodItems(fallbackMenuItems);
          }
        } else {
          console.error("API returned error status:", response.status);
          throw new Error(`API error: ${response.status}`);
        }
      } catch (apiError) {
        console.error('API fetch failed, using fallback data:', apiError);
        setFoodItems(fallbackMenuItems);
      }
    } catch (err) {
      console.error('Error fetching food items:', err);
      setFoodItems(fallbackMenuItems);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleOrder = async () => {
    if (cart.length === 0) return;
    
    if (!isLoggedIn) {
      alert('Please login to place an order');
      window.location.href = '/login';
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      const order = {
        orderItems: cart.map(item => ({
          foodItem: { id: item.id },
          quantity: 1,
          price: item.price
        })),
        deliveryAddress: userData.address || 'Not specified',
        contactNumber: userData.contact || 'Not specified'
      };
      
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(order)
      });
      
      if (response.ok) {
        setCart([]);
        alert('Order placed successfully!');
        window.location.href = '/dashboard';
      } else {
        const errorText = await response.text(); 
        console.error('Order failed:', errorText);
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (loading) {
    return (
      <div className="menu-page">
        <div className="container">
          <div className="page-title-wrapper">
            <h1 className="page-title">Our Menu</h1>
          </div>
          <div className="loading-spinner">Loading menu items...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <div className="container">
        <h1 className="page-title">Our Menu</h1>
        
        <div className="menu-container">
          <div className="menu-items">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="items-grid">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <MenuItem 
                    key={item.id} 
                    item={item} 
                    onAddToCart={addToCart} 
                  />
                ))
              ) : (
                <div className="no-items">
                  <p>No menu items found{searchTerm ? ` for "${searchTerm}"` : ''}.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="cart-section">
            <h3>My Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="cart-total">
              <span>TOTAL</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            {!isLoggedIn ? (
              <div className="login-prompt">
                <p>Please login to place an order</p>
                <button 
                  className="login-btn"
                  onClick={() => window.location.href = '/login'}
                >
                  Login Now
                </button>
              </div>
            ) : (
              <button 
                className="btn order-btn" 
                disabled={cart.length === 0}
                onClick={handleOrder}
              >
                Order Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;