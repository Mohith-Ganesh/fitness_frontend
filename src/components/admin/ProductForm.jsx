import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { mockProducts } from '../../services/mockData';
import { FaSave, FaTimes, FaUpload } from 'react-icons/fa';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discounted_price: '',
    stock_quantity: '',
    image_url: '',
    size: '',
    color: ''
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchProductDetails = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/products/${id}`);
          
          // Format values for form inputs
          const product = response.data;
          setFormData({
            name: product.name || '',
            description: product.description || '',
            price: parseFloat(product.price) || '',
            discounted_price: product.discounted_price ? parseFloat(product.discounted_price) : '',
            stock_quantity: product.stock_quantity || '',
            image_url: product.image_url || '',
            size: product.size || '',
            color: product.color || ''
          });
          
          setLoading(false);
        } catch (err) {
          console.error('Error fetching product details:', err);
          
          // Fallback to mock data
          const mockProduct = mockProducts.find(p => p.product_id === parseInt(id));
          if (mockProduct) {
            setFormData({
              name: mockProduct.name || '',
              description: mockProduct.description || '',
              price: parseFloat(mockProduct.price) || '',
              discounted_price: mockProduct.discounted_price ? parseFloat(mockProduct.discounted_price) : '',
              stock_quantity: mockProduct.stock_quantity || '',
              image_url: mockProduct.image_url || '',
              size: mockProduct.size || '',
              color: mockProduct.color || ''
            });
          } else {
            setError('Product not found');
          }
          
          setLoading(false);
        }
      };

      fetchProductDetails();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.price || !formData.stock_quantity) {
      setError('Please fill out all required fields');
      return;
    }
    
    try {
      setSubmitLoading(true);
      setError('');
      
      // Prepare data for API
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        discounted_price: formData.discounted_price ? parseFloat(formData.discounted_price) : null,
        stock_quantity: parseInt(formData.stock_quantity),
      };
      
      if (isEditMode) {
        // Update existing product
        await api.put(`/products/${id}`, productData);
      } else {
        // Create new product
        await api.post('/products', productData);
      }
      
      // Redirect back to product list
      navigate('/admin/products');
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
      
      // For demo purposes, assume success and redirect
      setTimeout(() => {
        navigate('/admin/products');
      }, 1000);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="product-form">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}
        
        <div className="form-layout">
          <div className="form-main">
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Product Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="form-control"
                ></textarea>
              </div>
            </div>
            
            <div className="form-section">
              <h3 className="section-title">Pricing</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price <span className="required">*</span></label>
                  <div className="input-with-prefix">
                    <span className="input-prefix">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="discounted_price">Discounted Price</label>
                  <div className="input-with-prefix">
                    <span className="input-prefix">$</span>
                    <input
                      type="number"
                      id="discounted_price"
                      name="discounted_price"
                      value={formData.discounted_price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="stock_quantity">Stock Quantity <span className="required">*</span></label>
                <input
                  type="number"
                  id="stock_quantity"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleChange}
                  min="0"
                  required
                  className="form-control"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3 className="section-title">Attributes</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="size">Size</label>
                  <input
                    type="text"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-sidebar">
            <div className="form-section">
              <h3 className="section-title">Product Image</h3>
              
              <div className="image-preview">
                {formData.image_url ? (
                  <img 
                    src={formData.image_url} 
                    alt="Product preview" 
                    className="preview-image"
                  />
                ) : (
                  <div className="no-image">No image</div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="image_url">Image URL</label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="btn btn-outline cancel-btn"
          >
            <FaTimes /> Cancel
          </button>
          
          <button
            type="submit"
            disabled={submitLoading}
            className={`btn btn-primary save-btn ${submitLoading ? 'btn-loading' : ''}`}
          >
            <FaSave /> {isEditMode ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;