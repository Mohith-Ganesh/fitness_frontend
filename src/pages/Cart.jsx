import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FaTrash, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';

function Cart() {
  const { cart, updateQuantity, removeFromCart, loading } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    // Simulate coupon validation
    if (couponCode.toUpperCase() === 'FITSHOP10') {
      setCouponSuccess('Coupon applied successfully! 10% discount added.');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Please try again.');
      setCouponSuccess('');
    }
  };

  const handleCheckout = () => {
    if (currentUser) {
      navigate('/checkout');
    } else {
      // Redirect to login with a return URL
      navigate('/login?redirect=/checkout');
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">
              <FaShoppingBag />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate subtotal, shipping, and total
  const subtotal = cart.totalPrice;
  
  // Free shipping over $100, otherwise $10
  const shipping = subtotal > 100 ? 0 : 10;
  
  // Apply coupon discount if valid
  const discount = couponSuccess ? subtotal * 0.1 : 0;
  
  const total = subtotal + shipping - discount;

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr key={item.productId} className="cart-item">
                    <td className="cart-product">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="cart-product-image"
                      />
                      <div className="cart-product-details">
                        <h3 className="cart-product-name">
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </h3>
                      </div>
                    </td>
                    <td className="cart-price">${item.price.toFixed(2)}</td>
                    <td className="cart-quantity">
                      <div className="quantity-control">
                        <button 
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="quantity-btn"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                          className="quantity-input"
                        />
                        <button 
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="cart-subtotal">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="cart-actions">
                      <button 
                        onClick={() => handleRemove(item.productId)}
                        className="remove-btn"
                        aria-label="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="coupon-form">
              <form onSubmit={handleCouponSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="form-control"
                  />
                  <button type="submit" className="btn btn-secondary">
                    Apply
                  </button>
                </div>
              </form>
              
              {couponError && (
                <div className="alert alert-danger">{couponError}</div>
              )}
              
              {couponSuccess && (
                <div className="alert alert-success">{couponSuccess}</div>
              )}
            </div>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="btn btn-lg btn-primary btn-block checkout-btn"
            >
              Proceed to Checkout
            </button>
            
            <Link to="/" className="continue-shopping">
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;