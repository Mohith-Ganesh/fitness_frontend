import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import { mockOrders } from '../services/mockData';
import { FaBox, FaTruck, FaCheckCircle, FaArrowLeft, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        
        // Fallback to mock data if API fails
        const mockOrder = mockOrders.find(o => o.order_id === parseInt(id));
        if (mockOrder) {
          setOrder(mockOrder);
        } else {
          setError('Order not found');
        }
        
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">
          {error || 'Order not found'}
        </div>
        <Link to="/orders" className="btn btn-primary">
          Back to Orders
        </Link>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString();
  const expectedDeliveryDate = order.expected_delivery_date
    ? new Date(order.expected_delivery_date).toLocaleDateString()
    : 'Not available';

  const getOrderStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return 'status-placed';
      case 'processed':
        return 'status-processed';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      default:
        return '';
    }
  };

  const renderStatusSteps = () => {
    const steps = [
      { status: 'placed', label: 'Order Placed', icon: <FaBox /> },
      { status: 'processed', label: 'Processing', icon: <FaBox /> },
      { status: 'shipped', label: 'Shipped', icon: <FaTruck /> },
      { status: 'delivered', label: 'Delivered', icon: <FaCheckCircle /> }
    ];
    
    const currentStep = steps.findIndex(step => 
      step.status.toLowerCase() === order.status.toLowerCase()
    );
    
    return (
      <div className="order-status-steps">
        {steps.map((step, index) => (
          <div 
            key={step.status} 
            className={`status-step ${index <= currentStep ? 'active' : ''}`}
          >
            <div className="step-icon">
              {step.icon}
            </div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="order-detail-page">
      <div className="container">
        <div className="page-header">
          <Link to="/orders" className="back-link">
            <FaArrowLeft /> Back to Orders
          </Link>
          <h1 className="page-title">Order #{order.order_id}</h1>
        </div>
        
        <div className="order-detail-content">
          <div className="order-detail-info">
            <div className="order-status-section">
              <h3>Order Status</h3>
              <div className={`order-status ${getOrderStatusClass(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
              
              {renderStatusSteps()}
              
              {order.tracking_number && (
                <div className="tracking-info">
                  <h4>Tracking Number</h4>
                  <div className="tracking-number">{order.tracking_number}</div>
                  <a href="#" className="btn btn-sm btn-secondary">Track Package</a>
                </div>
              )}
            </div>
            
            <div className="order-meta-section">
              <div className="meta-block">
                <h3>Order Information</h3>
                <div className="meta-info">
                  <div className="meta-row">
                    <div className="meta-label">Order Date:</div>
                    <div className="meta-value">{orderDate}</div>
                  </div>
                  <div className="meta-row">
                    <div className="meta-label">Expected Delivery:</div>
                    <div className="meta-value">{expectedDeliveryDate}</div>
                  </div>
                  <div className="meta-row">
                    <div className="meta-label">Payment Method:</div>
                    <div className="meta-value">
                      <FaCreditCard /> {order.payment_method}
                    </div>
                  </div>
                  <div className="meta-row">
                    <div className="meta-label">Payment Status:</div>
                    <div className={`meta-value payment-status-${order.payment_status}`}>
                      {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="meta-block">
                <h3>Shipping Address</h3>
                <div className="address-box">
                  <FaMapMarkerAlt className="address-icon" />
                  <div className="address-text">
                    {order.shipping_address}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-items-section">
            <h3>Order Items</h3>
            
            <div className="order-items-list">
              {order.OrderItems?.map((item) => (
                <div key={item.item_id} className="order-item-detail">
                  <div className="item-image">
                    <img 
                      src={item.Product?.image_url} 
                      alt={item.Product?.name} 
                    />
                  </div>
                  
                  <div className="item-info">
                    <h4 className="item-name">{item.Product?.name}</h4>
                    <div className="item-price">${parseFloat(item.price).toFixed(2)}</div>
                    <div className="item-quantity">Quantity: {item.quantity}</div>
                  </div>
                  
                  <div className="item-total">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-summary">
              <div className="summary-row subtotal">
                <div className="summary-label">Subtotal</div>
                <div className="summary-value">${parseFloat(order.total_amount).toFixed(2)}</div>
              </div>
              
              <div className="summary-row shipping">
                <div className="summary-label">Shipping</div>
                <div className="summary-value">Free</div>
              </div>
              
              <div className="summary-row tax">
                <div className="summary-label">Tax</div>
                <div className="summary-value">Included</div>
              </div>
              
              <div className="summary-row total">
                <div className="summary-label">Total</div>
                <div className="summary-value">${parseFloat(order.total_amount).toFixed(2)}</div>
              </div>
            </div>
          </div>
          
          <div className="order-actions">
            <Link to="/contact" className="btn btn-outline">
              Need Help?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;