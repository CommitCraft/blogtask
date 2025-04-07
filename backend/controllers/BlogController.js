const Blog = require('../models/BlogModel');
const User = require('../models/userModel'); 


exports.addBlog = async (req, res) => {
  try {
   const user = req.user;
   if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const { title, content, parentId, type } = req.body;
    const blogPic = req.file ? req.file.path : null;

 
    const blog = new Blog({
      title: type == 'post' ? title : null, 
      content,
      userId : user.userId,
      blogPic: blogPic,
      parentId: type === 'comment' ? parentId : null, 
      type,
    });

    await blog.save();

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while creating the blog',info : error });
  }
};


exports.getAllBlogs = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {  
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const blogs = await Blog.find({userId : user.userId});
    
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found' });
    } 

    const filterBlog = blogs.map((item)=>{
      
      const title = item.title;
      const excerpt = item.content;
    
      const image = item.blogPic;
      const date = item.createdAt;
      const updatedAt = item.updatedAt;
      const id = item._id;
      const type = item.type;
      const parentId = item.parentId;
      const likes = Math.floor(Math.random() * 501);
      const comments = Math.floor(Math.random() * 50);
      return {title,excerpt,image,date,updatedAt,id,type,likes,comments,parentId}
    })

    return res.status(200).json({
      status : 200,
      message : 'Blogs fecthed successfully',
      info : filterBlog
    });


    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while fetching blogs' });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('userId', 'username') 
      .populate('comments') 

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while fetching the blog' });
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const { title, content, type, parentId } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }


    if (type === 'post') {
      blog.title = title || blog.title; 
    }
    blog.content = content || blog.content; 
    blog.parentId = type === 'comment' ? parentId : blog.parentId; 
    blog.blogPic = req.file ? req.file.path : blog.blogPic; 

    await blog.save(); 

    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while updating the blog' });
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    const user = req.user; 
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }


    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    await Blog.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while deleting the blog' });
  }
};