import React, { useState } from 'react';
import { User, Info, ArrowUpRight, FolderHeart, Save, ShieldCheck, Mail, Camera, UserPlus } from 'lucide-react';
import { Screen, User as UserType } from '../types';

interface AddUserViewProps {
  onNavigate: (screen: Screen, transition?: 'slide_up' | 'push_back' | 'none') => void;
  onAddUser: (newUser: UserType) => void;
}

export default function AddUserView({ onNavigate, onAddUser }: AddUserViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    staffId: '',
    role: '' as 'admin' | 'giang-vien' | 'sinh-vien' | '',
    level: '',
    department: '',
  });

  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80');
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập Họ và tên!');
      return;
    }
    if (!formData.email.trim()) {
      alert('Vui lòng nhập Email công vụ!');
      return;
    }
    if (!formData.staffId.trim()) {
      alert('Vui lòng nhập Mã số Nhân viên/Sinh viên!');
      return;
    }
    if (!formData.role) {
      alert('Vui lòng chọn Vai trò hệ thống!');
      return;
    }

    setSaving(true);
    setTimeout(() => {
      onAddUser({
        id: Math.random().toString(),
        name: formData.name,
        email: formData.email,
        staffId: formData.staffId,
        role: formData.role as any,
        status: 'active', // default active
        level: formData.level || 'Học viên',
        department: formData.department || 'Bộ phận Giáo trình',
        avatar: avatar,
        joinDate: new Date().toLocaleDateString('vi-VN')
      });
      setSaving(false);
      alert('Thêm thành viên hệ thống mới thành công!');
      onNavigate(Screen.USER_MANAGEMENT, 'none');
    }, 1200);
  };

  const selectRandomAvatar = () => {
    const seeds = ['Jack', 'Lily', 'Anna', 'Harry', 'Sofia', 'Thomas', 'Grace'];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    setAvatar(`https://api.dicebear.com/7.x/adventurer/svg?seed=${randomSeed}`);
    alert('Đã sinh ngẫu nhiên ảnh chân dung thành viên!');
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Top Breadcrumbs / title */}
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Thêm người dùng mới</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Tạo tài khoản mới và thiết lập quyền hạn cho thành viên trong hệ thống.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Column - Avatar Select */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white p-8 rounded-xl border border-outline-variant flex flex-col items-center justify-center text-center h-full min-h-[320px]">
              <div className="relative w-40 h-40 mb-6 group">
                <div className="w-full h-full rounded-full bg-slate-50 border-2 border-dashed border-outline-variant flex flex-col items-center justify-center overflow-hidden">
                  <img 
                    src={avatar} 
                    alt="New User Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-slate-900/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <Camera className="w-6 h-6" />
                </label>
              </div>
              <div className="space-y-3">
                <button 
                  type="button" 
                  onClick={selectRandomAvatar}
                  className="text-xs font-bold text-primary border border-primary px-4 py-2 rounded-lg hover:bg-blue-50 transition-all cursor-pointer inline-block"
                >
                  Tải ảnh khác
                </button>
                <p className="text-[11px] text-outline">Dung lượng tối đa 2MB. Hỗ trợ JPG, PNG.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form section fields */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Basic Info input card */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant space-y-6">
              <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Info className="w-4.5 h-4.5 text-primary" />
                Thông tin cơ bản
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Họ và tên *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Nhập đầy đủ họ tên"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Email công vụ *</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none"
                    placeholder="example@dmrs.edu.vn"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Mã số Nhân viên/Sinh viên *</label>
                  <input 
                    type="text" 
                    value={formData.staffId}
                    onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none"
                    placeholder="VD: NV2024001"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Vai trò hệ thống *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none bg-white cursor-pointer"
                    required
                  >
                    <option value="">Chọn vai trò hệ thống</option>
                    <option value="admin">Admin (Quản trị viên)</option>
                    <option value="giang-vien">Giảng viên (Lecturer)</option>
                    <option value="sinh-vien">Sinh viên / Học viên (Student)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Permissions & Classification Card */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant space-y-6">
              <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-primary" />
                Quyền hạn & Phân loại
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Cấp bậc (Level)</label>
                  <input 
                    type="text" 
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none"
                    placeholder="VD: Senior Manager"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Khoa / Phòng ban</label>
                  <input 
                    type="text" 
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none"
                    placeholder="VD: Khoa CNTT"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form action bar */}
        <div className="flex justify-end items-center gap-4 pt-6 border-t border-outline-variant">
          <button 
            type="button" 
            onClick={() => onNavigate(Screen.USER_MANAGEMENT, 'none')}
            className="px-6 py-2.5 border border-outline-variant text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-lg cursor-pointer transition-all active:scale-95 text-center"
          >
            Hủy bỏ
          </button>
          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-lg cursor-pointer hover:opacity-95 shadow-sm active:scale-95 transition-all text-center flex items-center gap-1.5"
          >
            <UserPlus className="w-4.5 h-4.5" />
            {saving ? 'Đang tạo...' : 'Tạo người dùng'}
          </button>
        </div>
      </form>
    </div>
  );
}
