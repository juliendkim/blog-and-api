import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await apiClient.post('/posts', formData);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="create-post">
      <h2>Create New Post</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;