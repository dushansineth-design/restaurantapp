import './MenuItem.css';
import fallbackImage from '../../assets/placeholder-food.png';

const MenuItem = ({ item, onAddToCart }) => {
  const {
    name = 'Unknown Item',
    description = 'No description available',
    price = 0,
    imageUrl
  } = item || {};

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className="menu-item-card">
      <div className="menu-item-image">
        <img
          src={imageUrl || fallbackImage}
          alt={name}
          onError={handleImageError}
        />
      </div>
      <div className="item-info">
        <h3>{name}</h3>
        <p className="item-description">{description}</p>
        <div className="item-footer">
          <p className="item-price">
            ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
          </p>
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
