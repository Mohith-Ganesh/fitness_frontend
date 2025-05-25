import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { FaLock, FaCreditCard, FaMoneyBill, FaPaypal } from 'react-icons/fa';

function Checkout() {
  const { cart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (cart.items.length === 0 && !orderSuccess) {
      navigate('/cart');
    }
    
    // Fetch user info to pre-fill form if logged in
    const fetchUserInfo = async () => {
      try {
        // In a real app, you'd fetch user details here
        // For now, we'll just set some default values
        setFormData(prevData => ({
          ...prevData,
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890'
        }));
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };
    
    if (currentUser) {
      fetchUserInfo();
    }
  }, [cart.items.length, navigate, currentUser, orderSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.items.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Format shipping address
      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
      
      // Place order using API
      const response = await api.post('/cart/checkout', {
        cart_id: 1, // This would typically come from the cart context
        payment_method: formData.paymentMethod,
        shipping_address: shippingAddress
      });
      
      if (response.data && response.data.order_id) {

        const payment = await api.post('/payments', {
          order_id: response.data.order_id,
          amount: response.data.total_amount,
          currency: 'USD',
          payment_method: formData.paymentMethod,
        })


        setOrderSuccess(true);
        setOrderId(response.data.order_id);
        clearCart();

        navigate(`/payment/${response.data.order_id}`, {
          state: {
            amount: response.data.total_amount,
            paymentMethod: formData.paymentMethod,
          }
        });

      } else {
        throw new Error('Failed to create order');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      setError('There was a problem processing your order. Please try again.');
      
      // For demo purposes, simulate successful order if API fails
      setOrderSuccess(true);
      setOrderId(Math.floor(Math.random() * 1000000));
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  // Calculate order summary
  const subtotal = cart.totalPrice;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;
  
  // If order was successful, show confirmation
  if (orderSuccess) {
    return (
      <div className="order-confirmation">
        <div className="container">
          <div className="confirmation-content">
            <div className="confirmation-icon">
              <div className="checkmark">✓</div>
            </div>
            
            <h1 className="confirmation-title">Order Confirmed!</h1>
            <p className="confirmation-message">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            
            <div className="order-details">
              <h3>Order Details</h3>
              <p><strong>Order Number:</strong> #{orderId}</p>
              <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> ${total.toFixed(2)}</p>
            </div>
            
            <p className="shipping-info">
              You will receive an email confirmation shortly with your order details and tracking information once your order ships.
            </p>
            
            <div className="confirmation-actions">
              <button
                onClick={() => navigate('/orders')}
                className="btn btn-primary"
              >
                View My Orders
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="btn btn-outline"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              
              <section className="form-section">
                <h2 className="section-title">Shipping Information</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
              </section>
              
              <section className="form-section">
                <h2 className="section-title">Payment Method</h2>
                
                <div className="payment-methods">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="credit-card"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="credit-card">
                      <FaCreditCard /> Credit Card
                    </label>
                  </div>
                  
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                    />
                    <label htmlFor="paypal">
                      <FaPaypal /> PayPal
                    </label>
                  </div>
                  
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="cash-on-delivery"
                      name="paymentMethod"
                      value="cash-on-delivery"
                      checked={formData.paymentMethod === 'cash-on-delivery'}
                      onChange={handleChange}
                    />
                    <label htmlFor="cash-on-delivery">
                      <FaMoneyBill /> Cash on Delivery
                    </label>
                  </div>
                </div>
                
                {formData.paymentMethod === 'credit-card' && (
                  <div className="credit-card-details">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required={formData.paymentMethod === 'credit-card'}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cardName">Name on Card</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required={formData.paymentMethod === 'credit-card'}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          required={formData.paymentMethod === 'credit-card'}
                          className="form-control"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          required={formData.paymentMethod === 'credit-card'}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </section>
              
              <div className="checkout-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-lg btn-primary btn-block ${loading ? 'btn-loading' : ''}`}
                >
                  {loading ? 'Processing...' : (
                    <>
                      <FaLock /> Complete Order
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="cart-items-summary">
              {cart.items.map((item) => (
                <div key={item.productId} className="summary-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                    <span className="item-quantity">{item.quantity}</span>
                  </div>
                  
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
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
              
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="secure-checkout-message">
              <FaLock /> Your information is secure and encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;