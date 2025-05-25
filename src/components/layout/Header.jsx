import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

function Header() {
  const { currentUser, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h1>FitShop</h1>
            </Link>
          </div>

          <div className="mobile-menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className={location.pathname.includes('/products') ? 'active' : ''}>Products</Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            
            
            <div className="user-actions">
              <Link to="/cart" className="cart-icon">
                <FaShoppingCart />
                {cart.totalItems > 0 && (
                  <span className="cart-count">{cart.totalItems}</span>
                )}
              </Link>
              
              {currentUser ? (
                <div className="user-dropdown">
                  <button className="user-button">
                    <FaUser />
                  </button>
                  <div className="dropdown-menu">
                    {isAdmin() && (
                      <Link to="/admin" className="dropdown-item">Admin</Link>
                    )}
                    <Link to="/orders" className="dropdown-item">My Orders</Link>
                    
                    <button onClick={logout} className="dropdown-item logout-button">Logout</button>
                  </div>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
                  <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;