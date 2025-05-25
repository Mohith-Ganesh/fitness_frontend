import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { mockOrders } from '../../services/mockData';
import { FaArrowLeft, FaPrint, FaEnvelope, FaTruck, FaEdit } from 'react-icons/fa';

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    status: '',
    payment_status: '',
    tracking_number: '',
    expected_delivery_date: ''
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
        
        // Initialize form data
        setFormData({
          status: response.data.status,
          payment_status: response.data.payment_status,
          tracking_number: response.data.tracking_number || '',
          expected_delivery_date: response.data.expected_delivery_date ? 
            new Date(response.data.expected_delivery_date).toISOString().split('T')[0] : ''
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        
        // Fallback to mock data
        const mockOrder = mockOrders.find(o => o.order_id === parseInt(id));
        if (mockOrder) {
          setOrder(mockOrder);
          
          // Initialize form data
          setFormData({
            status: mockOrder.status,
            payment_status: mockOrder.payment_status,
            tracking_number: mockOrder.tracking_number || '',
            expected_delivery_date: mockOrder.expected_delivery_date ? 
              new Date(mockOrder.expected_delivery_date).toISOString().split('T')[0] : ''
          });
        } else {
          setError('Order not found');
        }
        
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setStatusUpdateLoading(true);
      
      // Call API to update order
      await api.put(`/orders/${id}`, formData);
      
      // Update local state
      setOrder(prevOrder => ({
        ...prevOrder,
        ...formData
      }));
      
      setEditMode(false);
      setStatusUpdateLoading(false);
    } catch (err) {
      console.error('Error updating order:', err);
      
      // For demo purposes, just update the UI
      setOrder(prevOrder => ({
        ...prevOrder,
        ...formData
      }));
      
      setEditMode(false);
      setStatusUpdateLoading(false);
    }
  };

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
      <div className="alert alert-danger">
        {error || 'Order not found'}
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString();
  const orderItems = order.OrderItems || [];

  return (
    <div className="order-detail-admin">
      <div className="admin-toolbar">
        <button 
          onClick={() => navigate('/admin/orders')}
          className="btn btn-outline back-btn"
        >
          <FaArrowLeft /> Back to Orders
        </button>
        
        <div className="action-buttons">
          <button className="btn btn-outline">
            <FaPrint /> Print Order
          </button>
          <button className="btn btn-outline">
            <FaEnvelope /> Email Customer
          </button>
        </div>
      </div>
      
      <div className="order-header">
        <div className="order-title">
          <h2>Order #{order.order_id}</h2>
          <span className="order-date">{orderDate}</span>
        </div>
        
        {!editMode ? (
          <button 
            onClick={() => setEditMode(true)}
            className="btn btn-primary"
          >
            <FaEdit /> Edit Order
          </button>
        ) : (
          <div className="edit-actions">
            <button 
              onClick={() => setEditMode(false)}
              className="btn btn-outline cancel-btn"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={statusUpdateLoading}
              className="btn btn-primary save-btn"
            >
              {statusUpdateLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
      
      <div className="order-sections">
        <div className="order-details-section">
          <div className="order-status-section">
            <h3>Order Status</h3>
            {!editMode ? (
              <div className="status-display">
                <div className="status-row">
                  <div className="status-label">Order Status:</div>
                  <div className={`status-value ${order.status.toLowerCase()}`}>
                    {order.status}
                  </div>
                </div>
                
                <div className="status-row">
                  <div className="status-label">Payment Status:</div>
                  <div className={`status-value payment-${order.payment_status.toLowerCase()}`}>
                    {order.payment_status}
                  </div>
                </div>
                
                {order.tracking_number && (
                  <div className="status-row">
                    <div className="status-label">Tracking Number:</div>
                    <div className="status-value">
                      <FaTruck /> {order.tracking_number}
                    </div>
                  </div>
                )}
                
                {order.expected_delivery_date && (
                  <div className="status-row">
                    <div className="status-label">Expected Delivery:</div>
                    <div className="status-value">
                      {new Date(order.expected_delivery_date).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="status-edit-form">
                <div className="form-group">
                  <label htmlFor="status">Order Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="form-control"
                  >
                    <option value="placed">Placed</option>
                    <option value="processed">Processed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="payment_status">Payment Status</label>
                  <select
                    id="payment_status"
                    name="payment_status"
                    value={formData.payment_status}
                    onChange={handleFormChange}
                    className="form-control"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="tracking_number">Tracking Number</label>
                  <input
                    type="text"
                    id="tracking_number"
                    name="tracking_number"
                    value={formData.tracking_number}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="expected_delivery_date">Expected Delivery Date</label>
                  <input
                    type="date"
                    id="expected_delivery_date"
                    name="expected_delivery_date"
                    value={formData.expected_delivery_date}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="customer-info-section">
            <h3>Customer Information</h3>
            <div className="info-block">
              <div className="info-row">
                <div className="info-label">Customer ID:</div>
                <div className="info-value">{order.user_id}</div>
              </div>
              
              <div className="info-row">
                <div className="info-label">Shipping Address:</div>
                <div className="info-value address">{order.shipping_address}</div>
              </div>
              
              <div className="info-row">
                <div className="info-label">Payment Method:</div>
                <div className="info-value">{order.payment_method}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-items-section">
          <h3>Order Items</h3>
          
          <table className="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map(item => (
                <tr key={item.item_id}>
                  <td className="product-cell">
                    <img 
                      src={item.Product?.image_url} 
                      alt={item.Product?.name} 
                      className="product-thumbnail"
                    />
                    <div className="product-info">
                      <div className="product-name">{item.Product?.name}</div>
                      <div className="product-id">ID: {item.product_id}</div>
                    </div>
                  </td>
                  <td>${parseFloat(item.price).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right">Subtotal:</td>
                <td>${parseFloat(order.total_amount).toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-right">Shipping:</td>
                <td>Free</td>
              </tr>
              <tr className="total-row">
                <td colSpan="3" className="text-right">Total:</td>
                <td>${parseFloat(order.total_amount).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;