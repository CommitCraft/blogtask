import React, { useState, useEffect } from 'react';
import { X, Loader } from 'lucide-react'; // Import Loader from lucide-react
import axios from 'axios';

function NewPostForm({ closeForm, selectedPost }) {
  const blogAPI = import.meta.env.VITE_API_URL; // API URL from environment variables

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to control loader visibility

  // Load data if it's an update
  useEffect(() => {
    if (selectedPost) {
      setIsUpdating(true);
      setTitle(selectedPost.title);
      setContent(selectedPost.content);
      setImagePreview(selectedPost.blogPic); // Set the current image as preview
    } else {
      setIsUpdating(false);
      setTitle('');
      setContent('');
      setImagePreview(null);
      setImageFile(null);
    }
  }, [selectedPost]);

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !content) {
      alert('Title and Content are required.');
      return; // Basic validation
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('type', 'post');
    if (imageFile) formData.append('image', imageFile);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };

    // Set isLoading to true to show the loader
    setIsLoading(true);

    try {
      let url = `${blogAPI}/blog`;
      let method = 'POST';

      if (isUpdating) {
        url = `${blogAPI}/blog/${selectedPost.id}`; // Use _id for updates
        method = 'PUT'; // Update if it's an existing post
      }

      const response = await axios({
        method,
        url,
        data: formData,
        ...config,
      });

      console.log('Post created/updated successfully', response.data);
      
      // Reload the window after success
      window.location.reload();

      setIsLoading(false); // Set isLoading to false to hide the loader
      closeForm(); // Close form after submission
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Error creating/updating post');
      setIsLoading(false); // Set isLoading to false if there's an error
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isUpdating ? 'Update Post' : 'Create New Post'}</h2>
        <button onClick={closeForm} className="text-gray-400 hover:text-gray-500">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter post title"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Write your post content..."
          />
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              id="featured-image"
              onChange={handleImageChange}
            />
            <label
              htmlFor="featured-image"
              className="cursor-pointer text-indigo-600 hover:text-indigo-700"
            >
              Click to upload
            </label>
            <p className="text-sm text-gray-500 mt-1">or drag and drop</p>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-48 object-contain mx-auto"
                />
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={closeForm}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader className="animate-spin w-5 h-5 text-white" /> {/* Loader spinner */}
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              isUpdating ? 'Update Post' : 'Publish Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPostForm;
