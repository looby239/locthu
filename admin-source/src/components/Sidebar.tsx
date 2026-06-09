import React from 'react';
import { LayoutDashboard, Users, FolderOpen, Grid, BarChart3, Upload, Shield } from 'lucide-react';
import { Screen } from '../types';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen, transitionType?: 'slide_up' | 'push_back' | 'none') => void;
  currentUserRole?: string;
}

export default function Sidebar({ currentScreen, onNavigate, currentUserRole = 'Admin' }: SidebarProps) {
  const menuItems = [
    {
      id: Screen.DASHBOARD,
      label: 'Bảng điều khiển',
      icon: LayoutDashboard,
    },
    {
      id: Screen.USER_MANAGEMENT,
      label: 'Quản lý người dùng',
      icon: Users,
    },
    {
      id: Screen.DOCUMENT_HUB,
      label: 'Kho tài liệu',
      icon: FolderOpen,
    },
    {
      id: Screen.CATEGORIES,
      label: 'Phân loại tài liệu',
      icon: Grid,
    },
    {
      id: Screen.QUERY_STATS,
      label: 'Thống kê truy vấn',
      icon: BarChart3,
    },
  ];

  return (
    <aside className="fixed h-screen w-[280px] left-0 top-0 bg-white border-r border-slate-200 flex flex-col z-50 select-none">
      {/* Brand logo container */}
      <div className="p-6 border-b border-slate-100">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => onNavigate(Screen.INITIAL, 'none')}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-extrabold text-base">
            D
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">DMRS</span>
        </div>
      </div>

      {/* Navigation section */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = 
            currentScreen === item.id || 
            (item.id === Screen.USER_MANAGEMENT && (currentScreen === Screen.EDIT_USER || currentScreen === Screen.ADD_USER)) ||
            (item.id === Screen.DOCUMENT_HUB && (currentScreen === Screen.EDIT_DOCUMENT || currentScreen === Screen.UPLOAD_DOCUMENT));

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id, 'none')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all text-left ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar bottom action and user widget */}
      <div className="p-4 border-t border-slate-200 space-y-4">
        {/* Quick actions uploads */}
        <button
          onClick={() => onNavigate(Screen.UPLOAD_DOCUMENT, 'slide_up')}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
        >
          <Upload className="w-4 h-4" />
          Tải lên tài liệu
        </button>

        {/* Dynamic admin user status snippet */}
        <div 
          onClick={() => onNavigate(Screen.USER_MANAGEMENT, 'none')}
          className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
            <img
              alt="Admin System profile avatar"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-900 truncate">Nguyễn Văn A</p>
            <p className="text-[10px] text-slate-500 font-medium truncate">Admin System</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
