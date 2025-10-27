import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>BlogSpace Management System</h1>
      <div className="button-group">
        <button onClick={() => navigate('/add')}>Add Blog</button>
        <button onClick={() => navigate('/view')}>View Blogs</button>
      </div>
    </div>
  );
};

export default Home;
