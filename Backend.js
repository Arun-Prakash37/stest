const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRouter = require('./routers/blogRouter');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/blogspace', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.error(' MongoDB connection error:', err));

app.use('/api/blogs', blogRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/', blogController.createBlog);
router.get('/', blogController.getBlogs);

module.exports = router;

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required']
    },
    content: {
      type: String,
      required: [true, 'Blog content is required']
    },
    author: {
      type: String,
      default: 'Anonymous'
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

const Blog = require('../models/blogModel');

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const blog = await Blog.create({
      title,
      content,
      author: author || 'Anonymous'
    });

    res.status(201).json({
      message: 'Blog created successfully',
      blog
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all blog posts
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'Blogs retrieved successfully',
      blogs,
      count: blogs.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
