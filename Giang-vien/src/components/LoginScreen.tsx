import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Lock, Mail, ChevronRight, School, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const LoginScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [email, setEmail] = useState('nguyenvana@university.edu.vn');
  const [password, setPassword] = useState('••••••••');
  const [errorInfo, setErrorInfo] = useState('');

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorInfo('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }
    navigateTo('dashboard', 'push');
  };

  const handleSchoolLogin = () => {
    navigateTo('dashboard', 'push');
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('forgot_password', 'push');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans transition-all duration-300">
      {/* Top logo & branding center-aligned */}
      <div className="flex justify-center items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-md shadow-blue-100">
          D
        </div>
        <div>
          <h1 className="font-bold text-2xl text-slate-800 tracking-tight">DMRS</h1>
          <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Hệ thống quản lý dữ liệu giảng viên</p>
        </div>
      </div>

      {/* Main card box */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-white py-10 px-8 rounded-2xl border border-slate-200 shadow-md relative overflow-hidden"
        >
          {/* Accent decoration line top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Chào mừng trở lại</h2>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
              Hệ thống tra cứu học tập & quản trị dữ liệu thông minh
            </p>
          </div>

          {errorInfo && (
            <div className="mb-5 p-3.5 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-2.5 text-xs text-red-700 animate-pulse">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorInfo}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleStandardLogin}>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Email Giảng viên / Tài khoản
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email-input"
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 rounded-lg text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu.vn"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Mật khẩu
                </label>
                <a
                  href="/forgot"
                  onClick={handleForgotPassword}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  id="password-input"
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 rounded-lg text-sm text-slate-800 outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2.5 text-xs text-slate-500 font-medium selection:bg-transparent">
                  Duy trì đăng nhập
                </label>
              </div>
            </div>

            <div className="space-y-3">
              {/* Button Standard Login (xpath: //button[contains(., 'Đăng nhập') and not(contains(., 'email trường'))]) */}
              <button
                type="submit"
                id="btn-standard-login"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full shadow-md shadow-blue-105/30 transition-all cursor-pointer"
              >
                <span>Đăng nhập hệ thống</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Button Login with school email (xpath: //button[contains(., 'Đăng nhập bằng email trường')]) */}
              <button
                type="button"
                id="btn-school-login"
                onClick={handleSchoolLogin}
                className="w-full flex justify-center items-center gap-2.5 py-3 px-4 bg-white hover:bg-slate-100 text-slate-700 text-sm font-semibold rounded-full border border-slate-200 shadow-sm transition-all cursor-pointer"
              >
                <School className="w-4 h-4 text-blue-600" />
                <span>Đăng nhập bằng email trường</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Assist */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold mb-2">Truy cập nhanh Demo</span>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <span className="px-2.5 py-1 bg-slate-50 text-slate-600 text-[10px] font-mono rounded-full border border-slate-200">
                nguyenvana@university.edu.vn
              </span>
              <span className="px-2.5 py-1 bg-slate-50 text-slate-600 text-[10px] font-mono rounded-full border border-slate-200">
                Mật khẩu: 123
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-slate-455 mt-6">
        <p className="font-semibold">© 2026 DMRS — Hệ thống Quản lý Dữ liệu Giảng viên và Hỏi đáp Tự động</p>
        <p className="text-[10px] mt-1 text-slate-400">Thiết kế đạt chuẩn Corporate Minimalism</p>
      </div>
    </div>
  );
};
