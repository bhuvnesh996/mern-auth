import React from 'react';

const UserSidebar = () => {
  return (
    <div className="bg-gray-800 w-64 h-full flex flex-col">
      <div className="p-4">
        <h1 className="text-white text-lg font-semibold">User Dashboard</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Sidebar links */}
        <ul className="py-2">
          <li className="px-4 py-2 text-gray-200 hover:bg-gray-700">Profile</li>
          <li className="px-4 py-2 text-gray-200 hover:bg-gray-700">Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;