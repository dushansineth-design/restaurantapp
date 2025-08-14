// components/HeroSection.jsx
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1>Experience Flavors Beyond Expectations</h1>
          <p>From handcrafted meals to a cozy ambience, every detail is designed to make your visit unforgettable.</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn">Order Now</Link>
            <Link to="/menu" className="btn btn-outline">View Menu</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;