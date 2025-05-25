import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    setIsAdded(true);
    
    // Reset the "Added" status after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const discountPercentage = product.discounted_price 
    ? Math.round(((product.price - product.discounted_price) / product.price) * 100) 
    : 0;

  return (
    <div 
      className="card product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.product_id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="product-image"
          />
          
          {discountPercentage > 0 && (
            <span className="badge badge-accent discount-badge">
              {discountPercentage}% OFF
            </span>
          )}
          
          <div className={`product-overlay ${isHovered ? 'visible' : ''}`}>
            <button 
              className={`btn ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
              onClick={handleAddToCart}
            >
              {isAdded ? 'Added!' : (
                <>
                  <FaShoppingCart className="icon-cart" /> 
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          
          <div className="product-price">
            {product.discounted_price ? (
              <>
                <span className="original-price">${product.price}</span>
                <span className="discounted-price">${product.discounted_price}</span>
              </>
            ) : (
              <span className="regular-price">${product.price}</span>
            )}
          </div>
          
          {product.stock_quantity < 10 && product.stock_quantity > 0 && (
            <p className="stock-warning">Only {product.stock_quantity} left!</p>
          )}
          
          {product.stock_quantity === 0 && (
            <p className="out-of-stock">Out of stock</p>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;