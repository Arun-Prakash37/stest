import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AddBlog from './Components/AddBlog';
import ViewBlogs from './Components/ViewBlogs';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBlog />} />
        <Route path="/view" element={<ViewBlogs />} />
      </Routes>
    </Router>
  );
};

export default App;
