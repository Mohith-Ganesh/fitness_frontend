import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import api from '../services/api';
import { mockProducts } from '../services/mockData';
import { FaShoppingCart, FaHeart, FaTruck, FaExchangeAlt, FaShieldAlt } from 'react-icons/fa';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  // Related products will be populated based on similar category/attributes
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setAdded(false);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        
        // Get related products (could be from same category or similar products)
        const allProducts = await api.get('/products');
        // Filter out current product and take up to 4 related products
        // In a real app, you'd have a more sophisticated recommendation algorithm
        const related = allProducts.data
          .filter(p => p.product_id !== parseInt(id))
          .slice(0, 4);
        
        setRelatedProducts(related);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details:', err);
        
        // Fallback to mock data if API fails
        const mockProduct = mockProducts.find(p => p.product_id === parseInt(id));
        if (mockProduct) {
          setProduct(mockProduct);
          
          // Get mock related products
          const mockRelated = mockProducts
            .filter(p => p.product_id !== parseInt(id))
            .slice(0, 4);
          
          setRelatedProducts(mockRelated);
        } else {
          setError('Product not found');
        }
        
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock_quantity || 10)) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < (product?.stock_quantity || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      
      // Reset the "Added" status after 3 seconds
      setTimeout(() => {
        setAdded(false);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">
          {error || 'Product not found'}
        </div>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const discountPercentage = product.discounted_price 
    ? Math.round(((product.price - product.discounted_price) / product.price) * 100) 
    : 0;

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / 
          <Link to="/products">Products</Link> / 
          <span>{product.name}</span>
        </nav>
        
        <div className="product-detail">
          <div className="product-gallery">
            <img
              src={product.image_url}
              alt={product.name}
              className="product-detail-image"
            />
            
            {discountPercentage > 0 && (
              <span className="badge badge-accent discount-badge-large">
                {discountPercentage}% OFF
              </span>
            )}
          </div>
          
          <div className="product-info-detail">
            <h1 className="product-title-large">{product.name}</h1>
            
            <div className="product-price-detail">
              {product.discounted_price ? (
                <>
                  <span className="original-price-large">${product.price}</span>
                  <span className="discounted-price-large">${product.discounted_price}</span>
                </>
              ) : (
                <span className="regular-price-large">${product.price}</span>
              )}
            </div>
            
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Availability:</span>
                <span className={`meta-value ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock_quantity > 0 
                    ? `In Stock (${product.stock_quantity} available)` 
                    : 'Out of Stock'}
                </span>
              </div>
              
              {product.size && (
                <div className="meta-item">
                  <span className="meta-label">Size:</span>
                  <span className="meta-value">{product.size}</span>
                </div>
              )}
              
              {product.color && (
                <div className="meta-item">
                  <span className="meta-label">Color:</span>
                  <span className="meta-value">{product.color}</span>
                </div>
              )}
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            {product.stock_quantity > 0 && (
              <div className="product-actions">
                <div className="quantity-control">
                  <button onClick={decrementQuantity} className="quantity-btn">-</button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock_quantity}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="quantity-input"
                  />
                  <button onClick={incrementQuantity} className="quantity-btn">+</button>
                </div>
                
                <button 
                  onClick={handleAddToCart} 
                  className={`btn btn-lg ${added ? 'btn-success' : 'btn-primary'}`}
                  disabled={product.stock_quantity === 0}
                >
                  {added ? 'Added to Cart!' : (
                    <>
                      <FaShoppingCart className="icon-cart" /> 
                      Add to Cart
                    </>
                  )}
                </button>
                
                <button className="btn btn-outline btn-lg wishlist-btn">
                  <FaHeart /> Wishlist
                </button>
              </div>
            )}
            
            <div className="product-benefits">
              <div className="benefit-item">
                <FaTruck className="benefit-icon" />
                <div className="benefit-text">
                  <h4>Free Shipping</h4>
                  <p>On orders over $50</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <FaExchangeAlt className="benefit-icon" />
                <div className="benefit-text">
                  <h4>Easy Returns</h4>
                  <p>30-day return policy</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <FaShieldAlt className="benefit-icon" />
                <div className="benefit-text">
                  <h4>Warranty</h4>
                  <p>1-year warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2 className="section-title">You May Also Like</h2>
            <div className="product-grid">
              {relatedProducts.map(relatedProduct => (
                <Link 
                  key={relatedProduct.product_id} 
                  to={`/product/${relatedProduct.product_id}`}
                  className="related-product-link"
                >
                  <div className="related-product-card">
                    <img 
                      src={relatedProduct.image_url} 
                      alt={relatedProduct.name} 
                      className="related-product-image"
                    />
                    <div className="related-product-info">
                      <h3 className="related-product-title">{relatedProduct.name}</h3>
                      <div className="related-product-price">
                        {relatedProduct.discounted_price ? (
                          <>
                            <span className="original-price">${relatedProduct.price}</span>
                            <span className="discounted-price">${relatedProduct.discounted_price}</span>
                          </>
                        ) : (
                          <span className="regular-price">${relatedProduct.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;