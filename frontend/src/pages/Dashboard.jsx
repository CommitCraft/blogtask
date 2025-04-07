import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import OverviewStats from '../components/OverviewStats';
import BlogPost from '../components/BlogPost';
import NewPostForm from '../components/NewPostForm';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic')); // Get profile image from localStorage
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profilePic');
    navigate('/login');
  };

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React and TypeScript",
      excerpt: "Learn how to set up a new React project with TypeScript and best practices for type safety.",
      author: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      date: "Mar 15, 2024",
      readTime: "5 min read",
      likes: 124,
      comments: 35,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      excerpt: "Discover advanced techniques and tips for building beautiful interfaces with Tailwind CSS.",
      author: {
        name: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      date: "Mar 14, 2024",
      readTime: "7 min read",
      likes: 89,
      comments: 21,
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
  ];

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
          <div className="mb-8 border-b border-gray-200">
            <div className="flex space-x-8">
              <button 
                onClick={() => {
                  setActiveTab('overview');
                  setShowNewPostForm(false); 
                }} 
                className={`pb-4 text-sm font-medium ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => {
                  setActiveTab('posts');
                  setShowNewPostForm(false); 
                }} 
                className={`pb-4 text-sm font-medium ${activeTab === 'posts' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Posts
              </button>
            </div>
          </div>

          {showNewPostForm ? (
            <NewPostForm closeForm={() => setShowNewPostForm(false)} />
          ) : (
            activeTab === 'overview' ? <OverviewStats /> : blogPosts.map(post => <BlogPost key={post.id} post={post} />)
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
