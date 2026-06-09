import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, KeyRound, User, Camera, ShieldCheck, Mail, BookOpen, AlertCircle, Trash } from 'lucide-react';
import { Screen, User as UserType } from '../types';

interface EditUserViewProps {
  userId: string;
  users: UserType[];
  onNavigate: (screen: Screen, transition?: 'slide_up' | 'push_back' | 'none') => void;
  onUpdateUser: (updatedUser: UserType) => void;
}

export default function EditUserView({ 
  userId, 
  users, 
  onNavigate, 
  onUpdateUser 
}: EditUserViewProps) {
  // Find current user
  const currentUser = users.find(u => u.id === userId) || users[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'giang-vien' as 'admin' | 'giang-vien' | 'sinh-vien',
    status: 'active' as 'active' | 'pending' | 'locked',
    level: '',
    department: '',
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        status: currentUser.status,
        level: currentUser.level || 'Giảng viên',
        department: currentUser.department || 'Khoa CNTT',
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="p-8 text-center bg-white border border-outline-variant rounded-xl font-sans">
        <p className="text-sm font-semibold text-rose-600">Lỗi: Không tìm thấy thông tin thành viên.</p>
        <button onClick={() => onNavigate(Screen.USER_MANAGEMENT)} className="mt-4 px-4 py-2 bg-primary text-white rounded text-xs">
          Quay lại quản lý
        </button>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Vui lòng điền đầy đủ Họ tên và Email!');
      return;
    }

    if (password && password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp nhau!');
      return;
    }

    setSaving(true);
    setTimeout(() => {
      onUpdateUser({
        ...currentUser,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        level: formData.level,
        department: formData.department,
      });
      setSaving(false);
      alert('Cập nhật thông tin thành viên thành công!');
      onNavigate(Screen.USER_MANAGEMENT, 'none');
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Header section with last login status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Chỉnh sửa thông tin</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Cập nhật hồ sơ và thông tin bảo mật của người dùng hệ thống.
          </p>
        </div>

        <div className="flex flex-col items-end text-right">
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded text-xs font-bold border border-emerald-200">
            ● Đang hoạt động
          </span>
          <p className="text-[10px] text-outline mt-1 font-medium">Lần cuối đăng nhập: 2 giờ trước</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Column: Avatar & Permissions Card */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Avatar & Summary Card */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant flex flex-col items-center text-center">
              <div className="relative group w-32 h-32 mb-4">
                <img 
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover border-4 border-slate-50 shadow-inner"
                />
                <div className="absolute inset-0 bg-slate-900/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{formData.name}</h3>
              <p className="text-xs text-outline font-semibold mt-1 uppercase tracking-wider">
                {formData.role === 'admin' ? 'Quản trị viên' : formData.role === 'giang-vien' ? 'Giảng viên' : 'Sinh viên'}
              </p>
              
              <div className="w-full grid grid-cols-1 gap-2 mt-6">
                <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100/80">
                  <p className="text-[10px] text-outline font-bold uppercase tracking-wider">Tài liệu đã tải</p>
                  <p className="text-xl font-bold text-primary mt-1">128 tài liệu</p>
                </div>
              </div>
            </div>

            {/* Permissions & Department details cards */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4.5 h-4.5 text-primary" />
                Quyền hạn & Phân loại
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-outline-variant mb-1.5 uppercase">Cấp bậc</label>
                  <input 
                    type="text" 
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3.5 py-2 border border-outline-variant rounded-lg text-xs font-semibold focus:ring-2 focus:ring-primary outline-none"
                    placeholder="VD: Giảng viên chính"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-outline-variant mb-1.5 uppercase">Phòng ban / Khoa</label>
                  <input 
                    type="text" 
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2 border border-outline-variant rounded-lg text-xs font-semibold focus:ring-2 focus:ring-primary outline-none"
                    placeholder="VD: Khoa CNTT"
                  />
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-outline font-medium">Hội viên từ:</span>
                  <span className="font-bold text-slate-700">{currentUser.joinDate || '15/08/2021'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form detail inputs */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Basic Information card */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant space-y-6">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                <User className="w-4.5 h-4.5 text-primary" />
                Thông tin cơ bản
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Họ và tên</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none bg-slate-50/20"
                    placeholder="Nhập họ và tên đầy đủ"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Email công vụ</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none bg-slate-50/20"
                    placeholder="example@univ.edu.vn"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Mã số Nhân viên/Sinh viên</label>
                  <input 
                    type="text" 
                    value={currentUser.staffId} 
                    readOnly
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold bg-slate-100 text-outline outline-none cursor-not-allowed"
                    title="Mã số nhân viên không thể thay đổi sau khi đăng ký thành công"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Vai trò hệ thống</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none bg-white"
                  >
                    <option value="admin">Admin</option>
                    <option value="giang-vien">Giảng viên giáo dục</option>
                    <option value="sinh-vien">Sinh viên / Học viên</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">Trạng thái tài khoản</label>
                  <div className="flex gap-4 items-center">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="edit_status"
                        checked={formData.status === 'active'}
                        onChange={() => setFormData({ ...formData, status: 'active' })}
                        className="text-primary focus:ring-primary w-4.5 h-4.5 cursor-pointer"
                      />
                      Đang hoạt động
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="edit_status"
                        checked={formData.status === 'locked'}
                        onChange={() => setFormData({ ...formData, status: 'locked' })}
                        className="text-primary focus:ring-primary w-4.5 h-4.5 cursor-pointer"
                      />
                      Tạm khóa
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <KeyRound className="w-4.5 h-4.5 text-primary" />
                  Đổi mật khẩu
                </h3>
                <span className="text-[10px] text-red-600 bg-red-50 px-2.5 py-1 rounded font-bold uppercase tracking-wider border border-red-200">
                  yêu cầu bảo mật cao
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Mật khẩu mới</label>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Nhập mật khẩu mới"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-outline hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Xác nhận mật khẩu mới</label>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>

                <div className="md:col-span-2 pt-2 bg-blue-50/50 p-4 rounded-lg flex items-start gap-2.5 border border-blue-100/50">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                    <span className="font-bold">Lưu ý:</span> Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt (!@#$%^&*).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action button bar */}
        <div className="flex justify-end items-center gap-4 pt-6 border-t border-outline-variant">
          <button 
            type="button"
            onClick={() => onNavigate(Screen.USER_MANAGEMENT, 'none')}
            className="px-6 py-2.5 border border-outline-variant text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-lg cursor-pointer transition-all active:scale-95"
          >
            Hủy bỏ
          </button>
          <button 
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-lg cursor-pointer hover:opacity-95 shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
          >
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}
