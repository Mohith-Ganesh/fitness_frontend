import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import api from '../services/api';
import { mockProducts } from '../services/mockData';
import { FaSearch, FaSortUp, FaSortDown } from 'react-icons/fa';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchTerm = searchParams.get('q') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback to mock data
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setError('Could not fetch products from server. Showing sample products instead.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter and sort products
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>All Products</h1>
          
          <div className="filters">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            
            <div className="sort-options">
              <button
    onClick={() => handleSort("name")}
    className={`flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium transition ${
      sortConfig.key === "name"
        ? "bg-blue-500 text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`} 
  >
    Name
    {sortConfig.key === "name" &&
      (sortConfig.direction === "asc" ? (
        <FaSortUp className="w-4 h-4" />
      ) : (
        <FaSortDown className="w-4 h-4" />
      ))}
  </button>

  <button
    onClick={() => handleSort("price")}
    className={`flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium transition ${
      sortConfig.key === "price"
        ? "bg-blue-500 text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    Price
    {sortConfig.key === "price" &&
      (sortConfig.direction === "asc" ? (
        <FaSortUp className="w-4 h-4" />
      ) : (
        <FaSortDown className="w-4 h-4" />
      ))}
  </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-info">{error}</div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <h2>No products found</h2>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;