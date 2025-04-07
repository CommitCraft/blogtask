import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BlogPost from '../components/BlogPost';
import NewPostForm from '../components/NewPostForm';
import { Plus } from 'lucide-react';
import axios from 'axios';

function Blog() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic'));
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const blogApi = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        };
        const response = await axios.get(`${blogApi}/blog`, config);
        setBlogs(response.data?.info);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${blogApi}/blog/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBlogs(blogs.filter((post) => post.id !== id));  
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setShowNewPostForm(true);  
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profilePic');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        handleLogout={handleLogout}
      />

      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <Navbar profilePic={profilePic} handleLogout={handleLogout} />
        <div className="pt-24 p-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-800">Blog Posts</h2>
            <button
              onClick={() => {
                setSelectedPost(null);  
                setShowNewPostForm(true);
              }}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>New Post</span>
            </button>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {showNewPostForm ? (
                <NewPostForm
                  closeForm={() => setShowNewPostForm(false)}
                  selectedPost={selectedPost}
                  refreshPosts={() => {
                    setIsLoading(true);
                    axios
                      .get(`${blogApi}/blog`, {
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                      })
                      .then((response) => setBlogs(response.data?.info))
                      .catch((error) => console.error('Error fetching blogs:', error))
                      .finally(() => setIsLoading(false));
                  }}
                />
              ) : (
                blogs.map((post) => (
                  <BlogPost key={post._id} post={post} onDelete={handleDelete} onEdit={handleEdit} />
                ))
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Blog;
