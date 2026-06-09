import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Mail, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export const ForgotPasswordScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorText('Vui lòng nhập địa chỉ email trường của bạn.');
      return;
    }
    if (!email.endsWith('@university.edu.vn') && !email.includes('@')) {
      setErrorText('Email của bạn phải đúng định cấu trúc trường đại học (Ví dụ: @university.edu.vn).');
      return;
    }
    setIsSubmitted(true);
    setErrorText('');
  };

  const handleBackToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('login', 'push_back');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="flex justify-center items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-md shadow-blue-100">
          D
        </div>
        <div>
          <h1 className="font-bold text-2xl text-slate-800 tracking-tight">DMRS</h1>
          <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Hệ thống quản lý dữ liệu giảng viên</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white py-10 px-8 rounded-2xl border border-slate-200 shadow-md relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>

          {!isSubmitted ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Quên mật khẩu?</h2>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Nhập email trường của bạn để nhận liên kết khôi phục mật khẩu.
                </p>
              </div>

              {errorText && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded text-xs text-red-750 flex gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorText}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Email trường của bạn
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 rounded-lg text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
                      placeholder="nguyenvana@university.edu.vn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full shadow-md shadow-blue-105/30 transition-all cursor-pointer"
                >
                  Gửi liên kết khôi phục
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Gửi yêu cầu thành công</h2>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                Hệ thống đã gửi hướng dẫn khôi phục mật khẩu đến email trường: <br />
                <strong className="text-slate-800 font-mono">{email}</strong>
              </p>
              <div className="mt-4 p-3.5 bg-blue-50/50 rounded-xl text-blue-800 text-xs border border-blue-100">
                Lưu ý: Vui lòng kiểm tra kỹ hòm thư rác (Spam) nếu bạn không thấy email trong vòng 2 phút.
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            {/* Back link with strict xpath matching //a[contains(., 'Quay lại trang đăng nhập')] */}
            <a
              id="btn-back-to-login"
              onClick={handleBackToLogin}
              className="inline-flex justify-center items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer group transition-all"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Quay lại trang đăng nhập</span>
            </a>
          </div>
        </motion.div>
      </div>

      <div className="text-center text-xs text-slate-400">
        <p className="font-semibold">© 2026 DMRS — Hệ thống Quản lý Dữ liệu Giảng viên</p>
      </div>
    </div>
  );
};
