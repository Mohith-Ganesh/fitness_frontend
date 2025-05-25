import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import api from '../services/api';
import { mockProducts } from '../services/mockData';
import { FaDumbbell, FaRunning, FaHeartbeat, FaRegClock } from 'react-icons/fa';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback to mock data if API fails
        setProducts(mockProducts);
        setError('Could not fetch products from server. Showing sample products instead.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Featured products (first 4)
  const featuredProducts = products.slice(0, 4);
  
  // New arrivals (last 4)
  const newArrivals = [...products].reverse().slice(0, 4);
  
  // Top deals (products with highest discount)
  const topDeals = [...products]
    .filter(product => product.discounted_price)
    .sort((a, b) => {
      const discountA = a.price - a.discounted_price;
      const discountB = b.price - b.discounted_price;
      return discountB - discountA;
    })
    .slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title slide-up">Elevate Your Fitness Journey</h1>
            <p className="hero-subtitle fade-in">
              Premium equipment and accessories for every fitness level
            </p>
            <div className="hero-cta">
              <Link to="/products" className="btn btn-lg btn-primary">
                Shop Equipment
              </Link>
              <Link to="/products" className="btn btn-lg btn-outline">
                Explore Accessories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <FaDumbbell />
              </div>
              <h3 className="feature-title">Quality Equipment</h3>
              <p className="feature-text">
                Professional-grade fitness gear built to last
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FaRegClock />
              </div>
              <h3 className="feature-title">Fast Delivery</h3>
              <p className="feature-text">
                Quick shipping to get you started right away
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FaRunning />
              </div>
              <h3 className="feature-title">Expert Advice</h3>
              <p className="feature-text">
                Guidance from fitness professionals
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FaHeartbeat />
              </div>
              <h3 className="feature-title">Fitness Community</h3>
              <p className="feature-text">
                Join like-minded fitness enthusiasts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="product-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="view-all">View All</Link>
          </div>
          
          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="alert alert-info">{error}</div>
          ) : (
            <div className="product-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="product-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link to="/products" className="view-all">View All</Link>
          </div>
          
          <div className="product-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Get Exclusive Offers</h2>
            <p className="newsletter-text">
              Subscribe to our newsletter and be the first to know about new products and special deals.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="form-control"
                required
              />
              <button type="submit" className="btn btn-accent">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;