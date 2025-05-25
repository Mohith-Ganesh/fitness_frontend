import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { mockOrders } from '../../services/mockData';
import { FaSearch, FaFilter, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

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
        // Fallback to mock data
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
        setError('Could not fetch orders from server. Showing sample data instead.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on search term and status
    let filtered = orders;
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(order => 
        order.order_id.toString().includes(searchTerm) ||
        order.shipping_address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => 
        order.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    // Sort orders
    const sortedOrders = [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredOrders(sortedOrders);
  }, [searchTerm, statusFilter, orders, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="sort-icon" />;
    }
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="sort-icon active" /> : 
      <FaSortDown className="sort-icon active" />;
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="order-list-admin">
      {error && (
        <div className="alert alert-info">{error}</div>
      )}
      
      <div className="admin-toolbar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search orders by ID or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-dropdown">
          <FaFilter className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="placed">Placed</option>
            <option value="processed">Processed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <h3>No orders found</h3>
          <p>Try adjusting your search criteria or filter settings.</p>
        </div>
      ) : (
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort('order_id')}>
                  Order ID {getSortIcon('order_id')}
                </th>
                <th className="sortable" onClick={() => handleSort('createdAt')}>
                  Date {getSortIcon('createdAt')}
                </th>
                <th className="sortable" onClick={() => handleSort('user_id')}>
                  Customer {getSortIcon('user_id')}
                </th>
                <th className="sortable" onClick={() => handleSort('total_amount')}>
                  Total {getSortIcon('total_amount')}
                </th>
                <th className="sortable" onClick={() => handleSort('status')}>
                  Status {getSortIcon('status')}
                </th>
                <th className="sortable" onClick={() => handleSort('payment_status')}>
                  Payment {getSortIcon('payment_status')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.order_id}>
                  <td>#{order.order_id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>Customer {order.user_id}</td>
                  <td>${parseFloat(order.total_amount).toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span className={`payment-status ${order.payment_status.toLowerCase()}`}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td>
                    <Link 
                      to={`/admin/orders/${order.order_id}`} 
                      className="btn btn-sm btn-outline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderList;