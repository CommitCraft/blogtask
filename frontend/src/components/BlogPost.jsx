import React, { useState } from 'react';
import moment from 'moment';
import { ThumbsUp, MessageCircle, MoreVertical } from 'lucide-react';

function BlogPost({ post, onDelete, onEdit }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); 
  };

  const handleDelete = () => {
    console.log('Delete button clicked', post.id); 
    if (post && post.id) {
      onDelete(post.id); 
    } else {
      console.error('Post ID is missing');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden relative">
      <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-900">{post.userName}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{moment(new Date(post.date)).format('MMMM D, YYYY')}</span>
              <span>•</span>
              <span>{"5 min read"}</span>
            </div>
          </div>
          <button onClick={toggleDropdown} className="ml-auto text-gray-400 hover:text-gray-500">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {dropdownOpen && (
          <div className="absolute bg-white border border-gray-300 rounded-lg shadow-md p-2 mt-2 w-32 right-0" style={{ marginRight: '35px', marginTop: '-20px' }}>
            <button onClick={() => onEdit(post)} className="block w-full text-left text-gray-700 px-4 py-2 hover:bg-gray-100">
              Update
            </button>
            <button onClick={handleDelete} className="block w-full text-left text-red-600 px-4 py-2 hover:bg-gray-100">
              Delete
            </button>
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center space-x-4 text-gray-500">
          <button className="flex items-center space-x-1 hover:text-gray-700">
            <ThumbsUp className="w-5 h-5" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-gray-700">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
