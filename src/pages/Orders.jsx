import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { mockOrders } from '../services/mockData';
import { FaBox, FaTruck, FaCheckCircle, FaFileAlt, FaSearch } from 'react-icons/fa';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get('/orders');
        setOrders(response.data);
        setFilteredOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        // Fallback to mock data if API fails
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
        setError('Could not fetch orders from server. Showing sample orders instead.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on search term
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => 
        order.order_id.toString().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return <FaBox className="status-icon placed" />;
      case 'shipped':
        return <FaTruck className="status-icon shipped" />;
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      default:
        return <FaFileAlt className="status-icon" />;
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1 className="page-title">My Orders</h1>
        
        {error && (
          <div className="alert alert-info">{error}</div>
        )}
        
        <div className="orders-toolbar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search orders by ID or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <h3>No Orders Found</h3>
            {searchTerm ? (
              <p>No orders match your search criteria. Try a different search term.</p>
            ) : (
              <div>
                <p>You haven't placed any orders yet.</p>
                <Link to="/" className="btn btn-primary">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order.order_id} className="order-card">
                <div className="order-header">
                  <div className="order-number">
                    Order #{order.order_id}
                  </div>
                  <div className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="order-status">
                  {getStatusIcon(order.status)}
                  <span className={`status-text ${order.status.toLowerCase()}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                
                <div className="order-summary">
                  <div className="order-items">
                    {order.OrderItems && order.OrderItems.map((item, index) => (
                      <div key={item.item_id} className="order-item">
                        <img
                          src={item.Product?.image_url}
                          alt={item.Product?.name}
                          className="item-image"
                        />
                        <div className="item-details">
                          <div className="item-name">
                            {item.Product?.name}
                          </div>
                          <div className="item-meta">
                            Qty: {item.quantity} x ${parseFloat(item.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {order.OrderItems?.length > 2 && (
                      <div className="more-items">
                        +{order.OrderItems.length - 2} more items
                      </div>
                    )}
                  </div>
                  
                  <div className="order-total">
                    <div className="total-label">Total:</div>
                    <div className="total-amount">${parseFloat(order.total_amount).toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="order-footer">
                  <Link to={`/orders/${order.order_id}`} className="btn btn-outline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;