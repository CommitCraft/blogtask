import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PenSquare, LogOut, X, Menu } from 'lucide-react'; // Ensure 'X' is imported from lucide-react
import { useNavigate } from 'react-router-dom';

function Sidebar({ isSidebarOpen, handleSidebarToggle, handleLogout }) {
  const navigate = useNavigate();

  return (
    <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 fixed h-full z-30`}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-xl font-bold ${!isSidebarOpen && 'hidden'}`}>Dashboard</span>
        </div>
        <button onClick={handleSidebarToggle} className="text-gray-500 hover:text-gray-700">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          <Link to="/" className={`flex items-center space-x-2 hover:bg-gray-50 px-4 py-2 rounded-lg w-full ${window.location.pathname==="/dashboard" ? "bg-indigo-50 text-indigo-600":"text-black"}`}>
          <Home className="w-5 h-5" />
          <span className={!isSidebarOpen ? 'hidden' : ''}>Home</span>
          </Link>

          {/* Use Link for Blog navigation */}
          <Link
            to="/blog"  // Use the Link component to navigate to the Blog page
            className={`flex items-center space-x-2 hover:bg-gray-50 px-4 py-2 rounded-lg w-full ${window.location.pathname==="/blog" ? "bg-indigo-50 text-indigo-600":"text-black"}`}
          >
            <PenSquare className="w-5 h-5" />
            <span className={!isSidebarOpen ? 'hidden' : ''}>Blog</span>
          </Link>

          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className={!isSidebarOpen ? 'hidden' : ''}>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
