import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data.blogs || []);
      } catch (err) {
        setError('Unable to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;
  if (blogs.length === 0) return <p>No blogs available yet.</p>;

  return (
    <div className="view-blogs-container">
      <h2>All Blog Posts</h2>
      <div className="blogs-grid">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <h3>{blog.title}</h3>
            <p>By {blog.author || 'Anonymous'}</p>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBlogs;
