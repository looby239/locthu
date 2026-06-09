/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, Shield, Bell, Check, Camera, RefreshCw, Undo2, LogOut 
} from 'lucide-react';
import { ScreenId, UserProfile, SystemSettings } from '../types';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface SettingsScreenProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back') => void;
}

export default function SettingsScreen({ profile, onUpdateProfile, onNavigate }: SettingsScreenProps) {
  
  // Local reactive states
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notify'>('profile');
  
  const [fullName, setFullName] = useState(profile.name);
  const [mssv, setMssv] = useState(profile.mssv);
  const [classCode, setClassCode] = useState(profile.className);
  const [department, setDepartment] = useState(profile.department);
  const [emailText, setEmailText] = useState(profile.email);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [docNotify, setDocNotify] = useState(true);
  const [teacherNotify, setTeacherNotify] = useState(true);

  const [showToast, setShowToast] = useState(false);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: fullName,
      mssv: mssv,
      className: classCode,
      department: department,
      email: emailText,
      avatarUrl: profile.avatarUrl,
    });
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    setFullName(profile.name);
    setMssv(profile.mssv);
    setClassCode(profile.className);
    setDepartment(profile.department);
    setEmailText(profile.email);
    setCurrentPassword('');
    setNewPassword('');
    setDocNotify(true);
    setTeacherNotify(true);
  };

  const tabs = [
    { id: 'profile' as const, label: 'Thông tin cá nhân', icon: User },
    { id: 'security' as const, label: 'Bảo mật & Mật khẩu', icon: Shield },
    { id: 'notify' as const, label: 'Thông báo', icon: Bell },
  ];

  return (
    <div className="flex bg-[#f8f9fd] min-h-screen">
      {/* Sidebar navigation */}
      <Sidebar currentScreen="settings" onNavigate={onNavigate} />

      {/* Main content viewport */}
      <div className="flex-1 ml-[280px] pt-[70px] flex flex-col p-8 space-y-6">
        <Topbar title="Cài đặt hệ thống" subtitle="Cài đặt tài khoản sinh viên" profile={profile} onNavigate={onNavigate} />

        {/* Heading panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 animate-fade-in">
          <h3 className="text-xl font-bold text-slate-800">Cài đặt hệ thống</h3>
          <p className="text-xs text-slate-500 font-medium">
            Quản lý thông tin hồ sơ sinh viên cá nhân, theo dõi bảo mật mật khẩu học đường và cấu hình hòm thư nhận thông báo từ DMRS.
          </p>
        </div>

        {/* Split grid layout of Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-fade-in">
          
          {/* Left Column Profile Summary & Selection Tabs */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Summary card matching Image 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-4">
              <div className="relative inline-block mx-auto group">
                <img
                  src={profile.avatarUrl}
                  alt={fullName}
                  className="w-24 h-24 rounded-full border-4 border-slate-100 object-cover shadow-md mx-auto"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute bottom-1 right-1 p-2 bg-[#003fb1] text-white rounded-full hover:bg-[#114ec3] transition-all shadow cursor-pointer">
                  <Camera size={14} />
                </button>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-800">{fullName}</h4>
                <p className="text-xs text-slate-400 font-semibold mt-1">{department}</p>
              </div>
            </div>

            {/* Selection tabs sidebar list */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-3 divide-y divide-slate-50">
                {tabs.map((t) => {
                  const TabIcon = t.icon;
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`w-full text-left px-4 py-3 text-xs font-bold leading-tight flex items-center justify-between transition-all cursor-pointer ${
                        isActive 
                          ? 'text-[#003fb1] bg-blue-50/50' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <TabIcon size={16} className={isActive ? 'text-[#003fb1]' : 'text-slate-400'} />
                        {t.label}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full bg-[#003fb1] transition-transform ${
                        isActive ? 'scale-100' : 'scale-0'
                      }`}></span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Back to Login option */}
            <button
              onClick={() => onNavigate('login', 'push_back')}
              className="w-full py-3 h-[45px] hover:bg-red-50 text-red-500 font-bold bg-white border border-red-200 rounded-xl transition-all cursor-pointer text-xs flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Đăng xuất tài khoản
            </button>
          </div>

          {/* Right Column: Setting Sections Forms */}
          <form onSubmit={handleSaveAll} className="lg:col-span-2 space-y-6">
            
            {/* SECTION 1: Personal Info Form always visible or dynamic */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <User size={16} className="text-[#003fb1]" />
                  Thông tin cá nhân
                </h4>
                <span className="text-[10px] uppercase font-bold text-[#003fb1] bg-blue-50 px-2.5 py-1 rounded">
                  Chỉnh sửa
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Mã số sinh viên (MSSV)
                  </label>
                  <input
                    type="text"
                    value={mssv}
                    onChange={(e) => setMssv(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Lớp sinh hoạt
                  </label>
                  <input
                    type="text"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Khoa Đào tạo
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1]"
                  />
                </div>

                <div className="col-span-full space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Email liên kết
                  </label>
                  <input
                    type="email"
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1]"
                  />
                </div>

              </div>
            </div>

            {/* SECTION 2: Account Security (Password reset mockup) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Shield size={16} className="text-[#003fb1]" />
                  Cài đặt tài khoản
                </h4>
                <p className="text-[11px] text-slate-400 font-semibold mt-1">Cập nhật mật khẩu để bảo mật tài khoản học tập của bạn.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1]"
                  />
                </div>

              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPassword('');
                    setNewPassword('');
                    setShowToast(true);
                  }}
                  className="px-4 py-2 bg-[#003fb1] hover:bg-[#114ec3] text-white text-xs font-bold rounded-lg transition-all shadow cursor-pointer active:scale-95"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </div>

            {/* SECTION 3: Notification Switches */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Bell size={16} className="text-[#003fb1]" />
                  Tùy chỉnh thông báo
                </h4>
                <p className="text-[11px] text-slate-400 font-semibold mt-1">Chọn cách thức bạn nhận được các cập nhật tài liệu quan trọng.</p>
              </div>

              <div className="space-y-4">
                
                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-700 leading-tight">Thông báo tài liệu mới</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Nhận thông báo khi có tài liệu học tập mới được phê duyệt trên DMRS.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={docNotify}
                      onChange={(e) => setDocNotify(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003fb1]"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-700 leading-tight">Thông báo từ giảng viên</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Thông báo quan trọng về bài tập và lịch học từ giảng viên của bạn.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={teacherNotify}
                      onChange={(e) => setTeacherNotify(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003fb1]"></div>
                  </label>
                </div>

              </div>
            </div>

            {/* Bottom Actions Row matching Image 4 */}
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-xs rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Undo2 size={14} />
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#003fb1] hover:bg-[#114ec3] text-white font-bold text-xs rounded-lg transition-all shadow cursor-pointer flex items-center gap-1.5"
              >
                <Check size={14} />
                Lưu thay đổi
              </button>
            </div>

          </form>

        </div>

      </div>

      {/* Saving Toast alert popup message */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121c28] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-slide-up border border-slate-700/50">
          <Check className="text-emerald-400" size={18} />
          <span className="text-xs font-bold">Cập nhật hồ sơ sinh viên thành công!</span>
        </div>
      )}
    </div>
  );
}
