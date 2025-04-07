const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');
const upload = require('../config/cloudinaryConfig');
const blogController = require('../controllers/BlogController'); // Import the blog controller
const authenticateJWT = require('../middlewares/authMiddleware');


router.post('/auth/login', loginUser);

router.post('/auth/register', upload.single('image'), registerUser);

router.post('/blog',authenticateJWT, upload.single('image'), blogController.addBlog);

router.get('/blog',authenticateJWT, blogController.getAllBlogs);

router.get('/blog/:id',authenticateJWT, blogController.getBlogById);

router.put('/blog/:id',authenticateJWT,upload.single('image'), blogController.updateBlog);


router.delete('/blog/:id',authenticateJWT, blogController.deleteBlog);

module.exports = router;
