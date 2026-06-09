import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Sidebar } from './Sidebar';
import {
  Send,
  Paperclip,
  Sparkles,
  Info,
  CheckCircle,
  FileText,
  AlertCircle,
  Clock,
  RotateCcw,
  Bell,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { ChatMessage } from '../types';
import { AvatarDropdown } from './AvatarDropdown';

export const ChatScreen: React.FC = () => {
  const { navigateTo, chatHistory, addChatMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    addChatMessage(inputText, 'user');
    setInputText('');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar activeScreen="chat_ai" />

      {/* Chat Area Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        
        {/* Top Header Bar Row */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">Chat AI - Giảng viên</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-1.5 bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium">Học kỳ I (2026)</span>
            </div>

            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative cursor-pointer transition-all">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <AvatarDropdown />
          </div>
        </header>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          <div className="max-w-[850px] mx-auto space-y-6">
            
            {chatHistory.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div key={msg.id} className={`flex items-start gap-4 ${isAi ? '' : 'flex-row-reverse'}`}>
                  
                  {/* Sender Icon/Avatar */}
                  <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-bold text-xs uppercase transition-all ${
                    isAi
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-blue-55 text-blue-600 border border-blue-100 shadow-sm'
                  }`}>
                    {isAi ? 'A' : 'T'}
                  </div>

                  {/* Body cluster */}
                  <div className="space-y-2.5 max-w-[80%]">
                    
                    {/* Chat Bubble card */}
                    <div className={`p-4 rounded-xl leading-relaxed text-sm shadow-sm transition-all ${
                      isAi
                        ? 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                        : 'bg-blue-600 text-white rounded-tr-none'
                    }`}>
                      <p className="whitespace-pre-line text-xs md:text-sm font-normal">
                        {msg.text}
                      </p>
                    </div>

                    {/* Integrated verified source citation container for AI responding to vắng mặt quy chế */}
                    {isAi && msg.citations && msg.citations.length > 0 && (
                      <div className="bg-blue-50/50 rounded-xl border border-blue-105 p-4 space-y-2.5 max-w-full">
                        <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Nguồn trích dẫn (Verified)</span>
                        </div>

                        {msg.citations.map((c) => (
                          <div key={c.id} className="space-y-1.5">
                            <p className="text-slate-700 text-xs leading-normal bg-white/80 p-2.5 rounded-lg border border-slate-100 font-mono italic">
                              [{c.id}] "{c.snippet}"
                            </p>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 select-all">
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              <span>{c.source} ({c.clause || 'Trang ' + c.page})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Timestamp signature */}
                    <div className={`text-[10px] text-slate-400 font-mono select-none px-1 ${!isAi ? 'text-right' : ''}`}>
                      {msg.timestamp}
                    </div>

                  </div>

                </div>
              );
            })}

            <div ref={chatBottomRef} />
          </div>
        </div>

        {/* Bottom input section form aligned with disclaimer */}
        <div className="bg-white border-t border-slate-200 p-4 shrink-0">
          <div className="max-w-[850px] mx-auto space-y-3">
            
            {/* Input form panel */}
            <form onSubmit={handleSend} className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-blue-600 focus-within:bg-white rounded-full overflow-hidden transition-all px-3 py-1">
              <button
                type="button"
                title="Đính kèm tài liệu phân tích nhanh"
                onClick={() => alert('Chọn tệp đính kèm để trích xuất nội dung bằng AI.')}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all cursor-pointer shrink-0"
              >
                <Paperclip className="w-4.5 h-4.5" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập câu hỏi của bạn cho AI..."
                className="flex-1 bg-transparent py-2 px-2 text-sm text-slate-800 focus:outline-none placeholder-slate-400 font-medium"
              />

              <button
                type="submit"
                title="Gửi câu hỏi"
                className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md shadow-blue-105/30 transition-all cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Disclaimer text */}
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-medium">
              <Info className="w-3.5 h-3.5 text-slate-350" />
              <span>AI có thể tạo ra thông tin không chính xác. Hãy luôn kiểm tra lại nguồn trích dẫn.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
