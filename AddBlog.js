import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/blogs', {
        title,
        content,
      });

      if (response.status === 201) {
        setSuccess('Blog created successfully!');
        setTitle('');
        setContent('');
      }
    } catch (err) {
      setError('Failed to publish blog');
    }
  };

  return (
    <div className="add-blog-container">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Blog Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="content">Blog Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit">Publish Blog</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};
export default AddBlog;
