import React, { useState } from 'react';
import { Bell, Search, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Navbar({ profilePic, handleLogout }) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <header className="bg-white shadow-sm fixed w-full z-20">
      <div className="flex items-center justify-between px-8 py-4" style={{width: '80%'}}>
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        
        <div className="flex items-center space-x-4">
          
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <img
                src={userInfo?.profilePic} 
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-indigo-600"
              />
              <span className="text-sm font-medium text-gray-700">{JSON.parse(localStorage.getItem('userInfo')).name}</span>
            </button>

            
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-30">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <User className="w-4 h-4" />
                  <span>Your Profile</span>
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
