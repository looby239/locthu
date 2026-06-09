import React from 'react';
import { useApp } from '../AppContext';
import { ScreenId } from '../types';
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Settings as SettingsIcon,
  Upload,
  LogOut,
  Bell,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeScreen: ScreenId;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeScreen }) => {
  const { navigateTo, userProfile } = useApp();

  const menuItems = [
    {
      id: 'dashboard' as ScreenId,
      name: 'Bảng điều khiển',
      icon: LayoutDashboard,
    },
    {
      id: 'repository' as ScreenId,
      name: 'Kho tài liệu',
      icon: FolderOpen,
    },
    {
      id: 'chat_ai' as ScreenId,
      name: 'Chat AI',
      icon: MessageSquare,
    },
    {
      id: 'settings' as ScreenId,
      name: 'Cài đặt',
      icon: SettingsIcon,
    },
  ];

  const handleNav = (screenId: ScreenId) => {
    navigateTo(screenId, 'none');
  };

  const handleUploadClick = () => {
    navigateTo('upload_document', 'slide_up');
  };

  const handleLogout = () => {
    navigateTo('login', 'push_back');
  };

  return (
    <aside className="w-[280px] bg-white border-r border-slate-200 h-screen flex flex-col shrink-0 justify-between sticky top-0" id="dmrs-sidebar-container">
      <div>
        {/* Header Branding */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              D
            </div>
            <div>
              <h1 className="font-sans font-bold text-slate-800 text-lg tracking-tight leading-none">DMRS</h1>
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block mt-1">Hệ thống quản lý dữ liệu</span>
            </div>
          </div>
        </div>

        {/* Navigation Section wrapped inside deep semantic tags so both XPaths match */}
        <nav className="p-4 space-y-1" id="dmrs-primary-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id || (item.id === 'repository' && activeScreen === 'edit_document');
            return (
              <a
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-slate-500'}`} />
                <span>{item.name} {item.id === 'chat_ai' && (
                  <span className="ml-auto bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">
                    AI
                  </span>
                )}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile and Quick Action upload button */}
      <div className="p-4 border-t border-slate-100 space-y-4">
        {/* Upload Button */}
        <button
          id="btn-sidebar-upload"
          onClick={handleUploadClick}
          className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-full text-sm font-medium shadow-md shadow-blue-100 transition-all duration-200 cursor-pointer group"
        >
          <Upload className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          <span>Tải lên tài liệu</span>
        </button>

        {/* User profile footer */}
        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200/60 relative">
          <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 text-slate-750 flex items-center justify-center font-bold font-sans text-xs uppercase shrink-0">
            {userProfile.fullName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-slate-800 truncate leading-tight">{userProfile.fullName}</h4>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 font-mono">{userProfile.msgv}</p>
          </div>
          <button
            id="btn-sidebar-logout"
            onClick={handleLogout}
            title="Đăng xuất"
            className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
