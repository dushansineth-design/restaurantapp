import './MenuItem.css';

const MenuItem = ({ item, onAddToCart }) => {
  return (
    <div className="menu-item-card">
      <div className="menu-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-info">
        <h3>{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <div className="item-footer">
          <p className="item-price">${item.price.toFixed(2)}</p>
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