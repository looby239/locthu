/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageSquare, FolderGit, Settings } from 'lucide-react';
import { ScreenId } from '../types';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back') => void;
}

export default function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
  const menuItems = [
    {
      id: 'ai-retrieval' as ScreenId,
      label: 'Chat AI',
      icon: MessageSquare,
      matches: (s: ScreenId) => s === 'ai-retrieval' || s === 'saved-answers'
    },
    {
      id: 'classify' as ScreenId,
      label: 'Kho tài liệu',
      icon: FolderGit,
      matches: (s: ScreenId) => s === 'classify' || s === 'all-documents'
    },
    {
      id: 'settings' as ScreenId,
      label: 'Cài đặt',
      icon: Settings,
      matches: (s: ScreenId) => s === 'settings'
    }
  ];

  const handleItemClick = (e: React.MouseEvent, id: ScreenId) => {
    e.preventDefault();

    // Determine specific transition specified in navigation map
    let transition: 'none' | 'push' | 'push_back' = 'none';
    if (currentScreen === 'saved-answers' && id === 'ai-retrieval') {
      transition = 'push_back';
    }

    onNavigate(id, transition);
  };

  return (
    <aside className="w-[280px] bg-white border-r border-[#E5E7EB] flex flex-col h-screen fixed top-0 left-0 z-20">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#F3F4F6]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#003fb1] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
            D
          </div>
          <div>
            <h1 className="font-bold text-xl text-[#003fb1] tracking-tight">DMRS</h1>
            <p className="text-xs text-slate-500 font-medium">Hệ thống quản lý dữ liệu</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = item.matches(currentScreen);
          const IconComponent = item.icon;

          return (
            <a
              id={`nav-link-${item.id}`}
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleItemClick(e, item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-150 group ${
                isActive
                  ? 'bg-[#e5eeff] text-[#003fb1] border-l-4 border-[#003fb1] rounded-l-none pl-3'
                  : 'text-[#5c5f60] hover:bg-slate-50 hover:text-[#191c1f]'
              }`}
            >
              <IconComponent 
                size={20} 
                className={`${
                  isActive ? 'text-[#003fb1]' : 'text-[#737686] group-hover:text-[#191c1f]'
                } transition-colors`} 
              />
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Footer metadata for structure */}
      <div className="p-4 border-t border-[#F3F4F6] text-center">
        <p className="text-[10px] text-slate-400 font-mono">DMRS STUDENT v1.2.0</p>
      </div>
    </aside>
  );
}
