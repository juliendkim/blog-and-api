import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/api';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get('/posts');
        setPosts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await apiClient.delete(`/posts/${id}`);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      <h1>Blog Posts</h1>
      
      {posts.length === 0 ? (
        <p>No posts yet. Create the first one!</p>
      ) : (
        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <p className="post-meta">By {post.username} on {new Date(post.created_at).toLocaleDateString()}</p>
              <p className="post-excerpt">{post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}</p>
              <div className="post-actions">
                {user && Number(user.id) === Number(post.user_id) && (
                  <>
                    <Link to={`/edit/${post.id}`} className="btn btn-secondary">Edit</Link>
                    <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;