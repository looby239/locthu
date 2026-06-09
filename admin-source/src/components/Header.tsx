import React, { useState } from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { Screen } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigate: (screen: Screen, transition?: 'slide_up' | 'push_back' | 'none') => void;
  currentScreen: Screen;
}

export default function Header({ searchQuery, setSearchQuery, onNavigate, currentScreen }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case Screen.DASHBOARD: return 'BẢNG ĐIỀU KHIỂN';
      case Screen.USER_MANAGEMENT: return 'QUẢN LÝ NGƯỜI DÙNG';
      case Screen.DOCUMENT_HUB: return 'KHO TÀI LIỆU';
      case Screen.CATEGORIES: return 'PHÂN LOẠI TÀI LIỆU';
      case Screen.QUERY_STATS: return 'THỐNG KÊ TRUY VẤN';
      case Screen.EDIT_USER: return 'CHỈNH SỬA THÀNH VIÊN';
      case Screen.ADD_USER: return 'THÊM THÀNH VIÊN';
      case Screen.EDIT_DOCUMENT: return 'SỬA TÀI LIỆU';
      case Screen.UPLOAD_DOCUMENT: return 'TẢI LÊN TÀI LIỆU';
      default: return 'DMRS SYSTEM';
    }
  };

  return (
    <header className="h-16 px-8 flex justify-between items-center bg-white border-b border-slate-200 sticky top-0 z-40 select-none">
      {/* Page Title on the left */}
      <div className="flex items-center gap-8">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest min-w-[160px]">
          {getScreenTitle()}
        </h2>

        {/* Minimal rounded search bar */}
        <div className="relative w-72 hidden md:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm nhanh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Action buttons on the right */}
      <div className="flex items-center gap-4">
        {/* Support helper */}
        <button 
          onClick={() => alert('Trung tâm trợ giúp DMRS luôn sẵn sàng hỗ trợ bạn.')}
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          title="Trợ giúp"
        >
          <HelpCircle className="w-4.5 h-4.5" />
        </button>

        {/* Notifications and indicator counter */}
        <button 
          onClick={() => alert('Hộp thư thông báo của bạn trống.')}
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer"
          title="Thông báo"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
        </button>

        {/* Inline Avatar info details */}
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        
        <div className="relative">
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2.5 pl-2 cursor-pointer group"
          >
            <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 group-hover:border-blue-500 transition-colors duration-200 flex-shrink-0">
              <img
                alt="Admin avatar"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Nguyễn Văn A</p>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">SYSTEM ADMIN</p>
            </div>
          </div>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  onNavigate(Screen.LOGIN, 'none');
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
