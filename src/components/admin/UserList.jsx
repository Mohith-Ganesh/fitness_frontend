import { useState, useEffect } from 'react';
import { FaSearch, FaSort, FaSortUp, FaSortDown, FaUserEdit, FaTrash } from 'react-icons/fa';

function UserList() {
  // Mock user data since we don't have a users endpoint
  const [users, setUsers] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  useEffect(() => {
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://fitness-backend-ota0.onrender.com/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      // Map createdAt to created_at for compatibility with existing code
      const formattedData = data.map(user => ({
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.createdAt
      }));

      setUsers(formattedData);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);


  useEffect(() => {
    // Filter users based on search term
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Sort users
    const sortedUsers = [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredUsers(sortedUsers);
  }, [searchTerm, users, sortConfig]);

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

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // In a real app, you'd call an API here
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="user-list-admin">
      <div className="admin-toolbar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <h3>No users found</h3>
          <p>Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort('id')}>
                  ID {getSortIcon('id')}
                </th>
                <th className="sortable" onClick={() => handleSort('name')}>
                  Name {getSortIcon('name')}
                </th>
                <th className="sortable" onClick={() => handleSort('email')}>
                  Email {getSortIcon('email')}
                </th>
                <th className="sortable" onClick={() => handleSort('role')}>
                  Role {getSortIcon('role')}
                </th>
                <th className="sortable" onClick={() => handleSort('created_at')}>
                  Joined Date {getSortIcon('created_at')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <button 
                      className="btn btn-sm btn-outline edit-btn"
                    >
                      <FaUserEdit /> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="btn btn-sm btn-outline delete-btn"
                    >
                      <FaTrash /> Delete
                    </button>
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

export default UserList;