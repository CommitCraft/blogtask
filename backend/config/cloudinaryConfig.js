const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;  // Access cloudinary using v2 directly
const dotenv = require("dotenv");
dotenv.config();

// Cloudinary configuration using credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", 
    allowed_formats: ["jpg", "jpeg", "png"], 
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
