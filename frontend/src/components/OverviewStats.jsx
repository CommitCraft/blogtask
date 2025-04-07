import React from 'react';
import { BookOpen, BarChart, ThumbsUp } from 'lucide-react';

function OverviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700">Total Posts</h3>
          <BookOpen className="w-6 h-6 text-indigo-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900 mt-4">156</p>
        <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700">Total Views</h3>
          <BarChart className="w-6 h-6 text-indigo-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900 mt-4">45.2K</p>
        <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700">Engagement Rate</h3>
          <ThumbsUp className="w-6 h-6 text-indigo-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900 mt-4">8.5%</p>
        <p className="text-sm text-red-600 mt-2">↓ 2% from last month</p>
      </div>
    </div>
  );
}

export default OverviewStats;
