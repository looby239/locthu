import React, { useState } from 'react';
import { useApp } from '../AppContext';

export const AvatarDropdown: React.FC = () => {
  const { navigateTo } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="Avatar"
        className="w-10 h-10 rounded-full border border-slate-200 cursor-pointer hover:border-blue-500 transition-colors"
        referrerPolicy="no-referrer"
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
          <button
            onClick={() => {
              setShowDropdown(false);
              navigateTo('settings', 'none');
            }}
            className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Thông tin
          </button>
          <button
            onClick={() => {
              setShowDropdown(false);
              navigateTo('login', 'none');
            }}
            className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};
