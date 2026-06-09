/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { ScreenId } from '../types';

interface PassRecoveryScreenProps {
  onNavigate: (screen: ScreenId, transition: 'none' | 'push' | 'push_back') => void;
}

export default function PassRecoveryScreen({ onNavigate }: PassRecoveryScreenProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#121c28] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <rect width="100%" height="100%" fill="url(#grid)" />
          <circle cx="30%" cy="30%" r="200" fill="#003fb1" fillOpacity="0.08" filter="blur(50px)" />
        </svg>
      </div>

      <main className="relative z-10 w-full max-w-[440px] animate-slide-up">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#003fb1] rounded-2xl mb-4 shadow-lg shadow-[#003fb1]/20">
            <Database className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#003fb1] tracking-tight">DMRS System</h1>
          <p className="text-sm font-semibold text-slate-500 mt-1 uppercase">Khôi phục mật khẩu</p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200/85 shadow-xl">
          {!submitted ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Quên mật khẩu?</h2>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Nhập địa chỉ email sinh viên được liên kết với tài khoản của bạn. Chúng tôi sẽ gửi mã OTP xác nhận và hướng dẫn khôi phục qua hòm thư.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase block">
                    Email Sinh viên
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail size={18} />
                    </span>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anv.2021601234@student.edu.vn"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1] focus:bg-white transition-all font-medium text-sm outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#003fb1] hover:bg-[#114ec3] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {loading ? 'Đang gửi...' : 'Gửi yêu cầu khôi phục'}
                  <Send size={16} />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Yêu cầu đã gửi thành công</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed px-2">
                Chúng tôi đã gửi file hướng dẫn đặt lại mật khẩu của bạn đến địa chỉ <strong className="text-slate-700">{email}</strong>. Vui lòng kiểm tra hộp thư đến hoặc thư rác (Spam).
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#003fb1] hover:underline"
                >
                  Thử lại bằng email khác
                </button>
              </div>
            </div>
          )}

          {/* Back link - IMPORTANT */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <a
              id="back-to-login"
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('login', 'push_back');
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#003fb1] transition-colors"
            >
              <ArrowLeft size={16} />
              Quay lại trang đăng nhập
            </a>
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-slate-400 font-medium">
          © 2026 DMRS System. Bảo lưu mọi quyền.
        </footer>
      </main>
    </div>
  );
}
