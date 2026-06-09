import React, { useState } from 'react';
import { Database, User, Lock, Eye, EyeOff, ArrowRight, School } from 'lucide-react';
import { Screen } from '../types';

interface LoginScreenProps {
  onNavigate: (screen: Screen, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
}

export default function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [username, setUsername] = useState('admin@vnu.edu.vn');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate(Screen.DASHBOARD, 'push');
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(Screen.PASS_RECOVERY, 'push');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#121c28] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Graphic Illustration Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <circle cx="80%" cy="40%" r="300" fill="#1a56db" fillOpacity="0.1" filter="blur(60px)" />
          <circle cx="20%" cy="80%" r="200" fill="#005438" fillOpacity="0.08" filter="blur(40px)" />
        </svg>
      </div>

      <main className="relative z-10 w-full max-w-[440px] animate-slide-up">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#003fb1] rounded-2xl mb-4 shadow-lg shadow-[#003fb1]/20 transform hover:scale-105 transition-transform duration-300">
            <Database className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#003fb1] tracking-tight">DMRS System</h1>
          <p className="text-sm font-semibold tracking-wide text-slate-500 mt-1 uppercase">
            Hệ thống quản lý dữ liệu tối ưu
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl border border-slate-200/80 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-xs font-bold text-slate-700 tracking-wider uppercase block">
                Email hoặc Tên đăng nhập
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={18} />
                </span>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@vnu.edu.vn"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1] focus:bg-white transition-all font-medium text-sm outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-bold text-slate-700 tracking-wider uppercase block">
                  Mật khẩu
                </label>
                <a
                  href="#forgot-password"
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-[#003fb1] hover:underline transition-all"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1] focus:bg-white transition-all font-medium text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 text-[#003fb1] border-slate-300 rounded focus:ring-[#003fb1]"
              />
              <label htmlFor="remember" className="text-xs text-slate-600 font-semibold cursor-pointer select-none">
                Ghi nhớ đăng nhập
              </label>
            </div>

            {/* Action Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#003fb1] hover:bg-[#114ec3] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Đăng nhập
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Social / School Divider */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-400 font-bold uppercase tracking-wider">Hoặc</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate(Screen.DASHBOARD, 'push')}
              type="button"
              className="w-full py-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-all duration-150 flex items-center justify-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 hover:scale-[1.01]"
            >
              <School size={16} className="text-slate-500" />
              Đăng nhập bằng SSO
            </button>
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-8 text-center text-xs text-slate-400 font-medium">
          <p>© 2026 DMRS System. Bảo lưu mọi quyền.</p>
          <p className="mt-1">
            Liên hệ hỗ trợ:{' '}
            <a href="mailto:support@dmrs.vnu.edu.vn" className="text-slate-500 hover:underline">
              support@dmrs.vnu.edu.vn
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
