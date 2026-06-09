import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Sidebar } from './Sidebar';
import {
  User,
  Shield,
  Bell,
  Cpu,
  Save,
  CheckCircle,
  Sparkles,
  Info,
  Lock,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';

export const SettingsScreen: React.FC = () => {
  const {
    navigateTo,
    userProfile,
    updateUserProfile,
    notificationSettings,
    updateNotificationSettings,
    aiSettings,
    updateAiSettings
  } = useApp();

  // Local state inputs synced to context state
  const [fullName, setFullName] = useState(userProfile.fullName);
  const [msgv, setMsgv] = useState(userProfile.msgv);
  const [department, setDepartment] = useState(userProfile.department);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);

  const [currentPw, setCurrentPw] = useState('••••••••');
  const [newPw, setNewPw] = useState('');
  const [pwAlert, setPwAlert] = useState('');

  const [studentQuestion, setStudentQuestion] = useState(notificationSettings.studentQuestion);
  const [aiProcessed, setAiProcessed] = useState(notificationSettings.aiProcessed);
  const [systemAlert, setSystemAlert] = useState(notificationSettings.systemAlert);

  const [autoCite, setAutoCite] = useState(aiSettings.autoCite);
  const [prioritizePersonal, setPrioritizePersonal] = useState(aiSettings.prioritizePersonal);

  const [successMsg, setSuccessMsg] = useState('');

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPw) {
      setPwAlert('Vui lòng nhập mật khẩu mới cần thay đổi.');
      return;
    }
    setPwAlert('');
    setNewPw('');
    setSuccessMsg('Đã cập nhật mật khẩu tài khoản thành công!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSaveChanges = () => {
    // Save to context
    updateUserProfile({ fullName, msgv, department, email, phone });
    updateNotificationSettings({ studentQuestion, aiProcessed, systemAlert });
    updateAiSettings({ autoCite, prioritizePersonal });

    setSuccessMsg('Đã lưu tất cả thay đổi cài đặt hệ thống thành công.');
    setTimeout(() => {
      setSuccessMsg('');
      navigateTo('dashboard', 'none');
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar activeScreen="settings" />

      {/* Settings Main container wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Header navigation bar with items matching xpath: //nav//a */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
          <nav className="flex items-center gap-6" id="settings-header-nav">
            <span className="text-sm font-bold text-slate-800">Quản lý hệ thống</span>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <a
              onClick={() => navigateTo('dashboard', 'none')}
              className="text-slate-500 hover:text-blue-600 text-xs font-semibold cursor-pointer block py-1 transition-all"
            >
              Bảng điều khiển
            </a>
            <a
              onClick={() => navigateTo('repository', 'none')}
              className="text-slate-500 hover:text-blue-600 text-xs font-semibold cursor-pointer block py-1 transition-all"
            >
              Kho tài liệu
            </a>
            <a
              onClick={() => navigateTo('chat_ai', 'none')}
              className="text-slate-500 hover:text-blue-600 text-xs font-semibold cursor-pointer block py-1 transition-all"
            >
              Chat AI
            </a>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <a
              onClick={() => navigateTo('upload_document', 'slide_up')}
              className="text-blue-600 hover:underline text-xs font-bold cursor-pointer block py-1 transition-all"
            >
              Tải lên tài liệu
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('dashboard', 'none')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Quay lại Bảng điều khiển
            </button>
          </div>
        </header>

        {/* Content Page area */}
        <main className="p-8 space-y-6 max-w-[1000px] w-full mx-auto" id="settings-main-container">
          
          {/* Headline details */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Cài đặt hệ thống</h2>
              <p className="text-sm text-slate-500 mt-1">Quản lý thông tin cá nhân và tùy chỉnh hệ thống DMRS.</p>
            </div>

            {/* Save All Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('dashboard', 'none')}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer transition-all"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold shadow-md shadow-blue-105/40 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </div>

          {/* Success / error popup flash messages */}
          {successMsg && (
            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl flex items-start gap-3 text-xs text-emerald-800 animate-fade-in shadow-sm">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <strong className="font-bold block">Thành công!</strong>
                <span className="mt-0.5 block">{successMsg}</span>
              </div>
            </div>
          )}

          {/* 1. Personal Information card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>Thông tin cá nhân</span>
              </h3>
              <button
                type="button"
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                onClick={() => alert('Vui lòng chỉnh sửa trực tiếp thông tin cá nhân dưới đây.')}
              >
                Chỉnh sửa
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Họ và tên</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Mã số giảng viên (MSGV)</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={msgv}
                    onChange={(e) => setMsgv(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Khoa / Phòng ban</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email giảng viên</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Số điện thoại</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Account Password Information card */}
          <form className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5" onSubmit={handleUpdatePassword}>
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>Cài đặt tài khoản</span>
              </h3>
            </div>

            {pwAlert && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-medium">{pwAlert}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Mật khẩu hiện tại</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Mật khẩu mới</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Nhập phần mật khẩu mới..."
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 py-2 px-5 rounded-full shadow-sm transition-all cursor-pointer"
              >
                Cập nhật mật khẩu
              </button>
            </div>
          </form>

          {/* 3. Notification Customizer card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                <span>Tùy chỉnh thông báo</span>
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              
              <div className="flex justify-between items-center py-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Thông báo sinh viên đặt câu hỏi mới</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Nhận email khi có sinh viên hỏi về tài liệu của bạn.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStudentQuestion(!studentQuestion)}
                  className={`relative w-11 h-6 transition-colors duration-200 rounded-full focus:outline-none cursor-pointer ${
                    studentQuestion ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    studentQuestion ? 'translate-x-[20px]' : ''
                  }`} />
                </button>
              </div>

              <div className="flex justify-between items-center py-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Thông báo tài liệu đã được AI xử lý xong</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Nhận thông báo trên hệ thống khi quá trình số hóa hoàn tất.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAiProcessed(!aiProcessed)}
                  className={`relative w-11 h-6 transition-colors duration-200 rounded-full focus:outline-none cursor-pointer ${
                    aiProcessed ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    aiProcessed ? 'translate-x-[20px]' : ''
                  }`} />
                </button>
              </div>

              <div className="flex justify-between items-center py-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Thông báo từ hệ thống</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Các cập nhật quan trọng về tính năng và bảo trì.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSystemAlert(!systemAlert)}
                  className={`relative w-11 h-6 transition-colors duration-200 rounded-full focus:outline-none cursor-pointer ${
                    systemAlert ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    systemAlert ? 'translate-x-[20px]' : ''
                  }`} />
                </button>
              </div>

            </div>
          </div>

          {/* 4. AI Customizer card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>Cài đặt AI</span>
              </h3>
              
              <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest border border-blue-105/40">
                ĐẶC QUYỀN GIẢNG VIÊN
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              
              <div className="flex justify-between items-center py-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Tự động trích dẫn nguồn khi AI trả lời</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Đảm bảo AI luôn kèm theo số trang và tên tài liệu gốc để minh bạch thông tin.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoCite(!autoCite)}
                  className={`relative w-11 h-6 transition-colors duration-200 rounded-full focus:outline-none cursor-pointer ${
                    autoCite ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    autoCite ? 'translate-x-[20px]' : ''
                  }`} />
                </button>
              </div>

              <div className="flex justify-between items-center py-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Ưu tiên tài liệu cá nhân khi AI truy xuất</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium font-medium">AI sẽ ưu tiên tìm kiếm câu trả lời trong kho tài liệu do bạn tải lên trước khi dùng tài liệu công khai của trường.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPrioritizePersonal(!prioritizePersonal)}
                  className={`relative w-11 h-6 transition-colors duration-200 rounded-full focus:outline-none cursor-pointer ${
                    prioritizePersonal ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    prioritizePersonal ? 'translate-x-[20px]' : ''
                  }`} />
                </button>
              </div>

            </div>
          </div>

          {/* Bottom Cancel & Save bar repeats */}
          <div className="pt-4 flex justify-end gap-3.5">
            <button
              type="button"
              onClick={() => navigateTo('dashboard', 'none')}
              className="px-6 py-3 bg-white text-xs font-semibold border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 cursor-pointer transition-all"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-3 px-6 rounded-full shadow-md shadow-blue-105/40 transition-all cursor-pointer"
            >
              Lưu thay đổi
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};
