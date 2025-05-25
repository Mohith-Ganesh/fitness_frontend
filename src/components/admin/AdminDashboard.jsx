import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { mockProducts, mockOrders } from '../../services/mockData';
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign, FaArrowUp, FaArrowDown, FaExclamationTriangle } from 'react-icons/fa';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // In a real application, you'd have API endpoints for these stats
        // For now, we'll use mock data
        const productsResponse = await api.get('/products');
        const products = productsResponse.data;
        
        const ordersResponse = await api.get('/orders');
        const orders = ordersResponse.data;
        
        // Calculate statistics
        const totalProducts = products.length;
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
        const totalUsers = 42; // Mock value
        
        // Find products with low stock (less than 10 items)
        const lowStockProducts = products.filter(product => product.stock_quantity < 10);
        
        // Get recent orders (last 5)
        const recent = [...orders].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ).slice(0, 5);
        
        setStats({
          totalProducts,
          totalOrders,
          totalRevenue,
          totalUsers,
          lowStockProducts
        });
        
        setRecentOrders(recent);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        
        // Fallback to mock data
        const totalProducts = mockProducts.length;
        const totalOrders = mockOrders.length;
        const totalRevenue = mockOrders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
        const totalUsers = 42;
        const lowStockProducts = mockProducts.filter(product => product.stock_quantity < 10);
        
        setStats({
          totalProducts,
          totalOrders,
          totalRevenue,
          totalUsers,
          lowStockProducts
        });
        
        setRecentOrders(mockOrders.slice(0, 5));
        setError('Could not fetch dashboard data. Showing sample data instead.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {error && (
        <div className="alert alert-info">{error}</div>
      )}
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon products">
            <FaBox />
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total Products</h3>
            <div className="stat-value">{stats.totalProducts}</div>
            <div className="stat-change positive">
              <FaArrowUp /> 5% from last month
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon orders">
            <FaShoppingCart />
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total Orders</h3>
            <div className="stat-value">{stats.totalOrders}</div>
            <div className="stat-change positive">
              <FaArrowUp /> 12% from last month
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon revenue">
            <FaDollarSign />
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total Revenue</h3>
            <div className="stat-value">${stats.totalRevenue.toFixed(2)}</div>
            <div className="stat-change positive">
              <FaArrowUp /> 8% from last month
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total Users</h3>
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-change negative">
              <FaArrowDown /> 2% from last month
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recent Orders</h2>
            <Link to="/admin/orders" className="view-all">View All</Link>
          </div>
          
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.order_id}>
                    <td>#{order.order_id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>Customer {order.user_id}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>${parseFloat(order.total_amount).toFixed(2)}</td>
                    <td>
                      <Link to={`/admin/orders/${order.order_id}`} className="btn btn-sm btn-outline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              <FaExclamationTriangle className="warning-icon" /> Low Stock Products
            </h2>
            <Link to="/admin/products" className="view-all">View All Products</Link>
          </div>
          
          {stats.lowStockProducts.length === 0 ? (
            <div className="empty-state">
              <p>No products are currently low in stock.</p>
            </div>
          ) : (
            <div className="low-stock-products">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>ID</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.lowStockProducts.map(product => (
                    <tr key={product.product_id}>
                      <td className="product-cell">
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="product-thumbnail"
                        />
                        <span className="product-name">{product.name}</span>
                      </td>
                      <td>#{product.product_id}</td>
                      <td className="stock-cell">
                        <span className={`stock-badge ${product.stock_quantity === 0 ? 'out-of-stock' : 'low-stock'}`}>
                          {product.stock_quantity} left
                        </span>
                      </td>
                      <td>${parseFloat(product.price).toFixed(2)}</td>
                      <td>
                        <Link 
                          to={`/admin/products/edit/${product.product_id}`} 
                          className="btn btn-sm btn-outline"
                        >
                          Update Stock
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;