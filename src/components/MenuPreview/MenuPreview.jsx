// components/MenuPreview.jsx
import { Link } from 'react-router-dom';
import './MenuPreview.css';

// Import images
import chilledChicken from '../../assets/pic2.jpg';
import butterPrawns from '../../assets/pic16.jpg';
import spicyRamen from '../../assets/pic14.jpg';
import crispyChicken from '../../assets/pic10.jpg';
import creamyPasta from '../../assets/pic7.jpg';
import cheesePizza from '../../assets/pic5.jpg';

const MenuPreview = () => {
  const menuItems = [
    { name: 'CHILLED CHICKEN', price: '$8.33', image: chilledChicken },
    { name: 'BUTTER PRAWNS', price: '$10.11', image: butterPrawns },
    { name: 'SPICY GARLIC RAMEN', price: '$15.67', image: spicyRamen },
    { name: 'CRISPY CHICKEN', price: '$9.58', image: crispyChicken },
    { name: 'CREAMY PASTA', price: '$12.43', image: creamyPasta },
    { name: 'CHEESE PIZZA', price: '$11.95', image: cheesePizza },
  ];

  return (
    <section className="menu-preview section-padding">
      <div className="container">
        <h2 className="section-title">Menu Preview</h2>
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <div className="menu-item" key={index}>
              <div className="menu-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/menu" className="btn">View Full Menu</Link>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;