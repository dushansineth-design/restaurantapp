// pages/Menu.jsx
import { useState } from 'react';
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

  const menuItems = [
    { id: 1, name: 'GRILLED CHICKEN', image: grilledChicken, price: 8.33 ,description: 'Juicy grilled chicken with special herbs' },
    { id: 2, name: 'BUTTER PRAWNS', image: butterPrawns, price: 10.11 ,description: 'Fresh prawns cooked in rich butter sauce' },
    { id: 3, name: 'SPICY GARLIC RAMEN', image: spicyRamen, price: 15.67 ,description: 'Authentic ramen with spicy garlic broth'},
    { id: 4, name: 'CRISPY CHICKEN', image: crispyChicken, price: 9.58 ,description: 'Golden crispy chicken with dipping sauce' },
    { id: 5, name: 'CREAMY PASTA', image: creamyPasta, price: 12.43 ,description: 'Pasta in our signature creamy sauce' },
    { id: 6, name: 'CHEESE PIZZA', image: cheesePizza, price: 11.95 ,description: 'Classic pizza with three cheese blend' },
  ];

  const filteredItems = menuItems.filter(item =>
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

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="menu-page">
      <div className="container">
        <h1 className="page-title">Our Menu</h1>
        
        <div className="menu-container">
          <div className="menu-items">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="items-grid">
              {filteredItems.map((item) => (
                <MenuItem 
                  key={item.id} 
                  item={item} 
                  onAddToCart={addToCart} 
                />
              ))}
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
            
            <button 
              className="btn order-btn" 
              disabled={cart.length === 0}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;