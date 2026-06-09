/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bell, HelpCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface TopbarProps {
  title: string;
  subtitle?: string;
  profile: UserProfile;
  onNavigate?: (screen: any, transition?: any) => void;
}

export default function Topbar({ title, subtitle, profile, onNavigate }: TopbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-[70px] bg-white border-b border-[#E5E7EB] flex items-center justify-between px-8 fixed top-0 right-0 left-[280px] z-10 animate-fade-in shadow-sm">
      {/* Title & Path Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h2>
          {subtitle && (
            <>
              <span className="text-slate-300 text-sm">/</span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {subtitle}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right Side Accessories */}
      <div className="flex items-center gap-6">
        {/* Support Buttons */}
        <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-full transition-all relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-full transition-all" title="Trợ giúp">
          <HelpCircle size={20} />
        </button>

        {/* Vertical divider */}
        <div className="h-8 w-px bg-slate-200"></div>

        {/* User Card */}
        <div className="relative">
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-[#003fb1] transition-colors">{profile.name}</p>
              <p className="text-[11px] text-slate-500 font-semibold tracking-wide">
                {profile.mssv ? `Sinh viên` : 'Khách'}
              </p>
            </div>
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-10 h-10 rounded-full border-2 border-slate-200 group-hover:border-[#003fb1] object-cover shadow-sm bg-slate-200 transition-colors"
              referrerPolicy="no-referrer"
            />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  if (onNavigate) onNavigate('settings', 'push');
                }}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Thông tin
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  if (onNavigate) onNavigate('login', 'push_back');
                }}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
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
