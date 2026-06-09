/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Paperclip, Mic, Send, Bot, Check, AlertCircle, Phone, 
  HelpCircle, ChevronRight, FileCode, FileText, FileSpreadsheet, BookmarkCheck
} from 'lucide-react';
import { ScreenId, Message, SavedAnswer, UserProfile } from '../types';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { POPULAR_FAQS } from '../data';

interface AiRetrievalScreenProps {
  profile: UserProfile;
  savedAnswers: SavedAnswer[];
  onSaveAnswer: (answer: SavedAnswer) => void;
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back') => void;
}

export default function AiRetrievalScreen({ 
  profile, 
  savedAnswers, 
  onSaveAnswer, 
  onNavigate 
}: AiRetrievalScreenProps) {
  
  // Initial rich dialogue matching Image 2 exactly!
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_1',
      sender: 'ai',
      text: `Chào Nguyễn Văn A! Tôi là trợ lý AI của hệ thống DMRS. Tôi có thể giúp bạn tìm kiếm tài liệu học tập, quy định đào tạo hoặc giải đáp các thắc mắc về hệ thống. Bạn cần hỗ trợ gì hôm nay?`,
      timestamp: '10:30 AM',
      isSaved: false,
    },
    {
      id: 'msg_2',
      sender: 'user',
      text: 'Cho mình hỏi về quy định đăng ký học phần bổ sung của học kỳ này.',
      timestamp: '10:32 AM',
    },
    {
      id: 'msg_3',
      sender: 'ai',
      text: 'Dựa trên tài liệu "Quy chế Đào tạo 2024", đây là các mốc thời gian quan trọng bạn cần lưu ý:',
      timestamp: '10:33 AM',
      table: {
        headers: ['Giai đoạn', 'Thời gian', 'Trạng thái'],
        rows: [
          { columns: ['Đăng ký đợt 1', '15/08 - 20/08', 'Thành công'], status: 'success' },
          { columns: ['Điều chỉnh đợt cuối', '01/09 - 05/09', 'Chờ xử lý'], status: 'warning' },
        ],
      },
      suggestions: ['Tải quy trình (PDF)', 'Xem hướng dẫn video'],
      isSaved: false,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSend = async (textToSend?: string) => {
    const rawText = textToSend || inputText;
    if (!rawText.trim()) return;

    if (!textToSend) {
      setInputText('');
    }

    // Append user message
    const currentTime = new Date().toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
    
    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: rawText,
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: rawText,
          history: messages.slice(-6).map(m => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await response.json();
      
      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.text || 'Xin lỗi, tôi chưa giải quyế được yêu cầu này.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }),
        isSaved: false,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      // Local recovery mock reply
      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: 'Hiện tại tôi đang khó kết nối đến máy chủ API. Tuy nhiên bạn có thể thao tác ở "Cài đặt" hoặc xem bảng "Câu hỏi thường gặp" bên phải nhé.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }),
        isSaved: false,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSaveResponse = (msg: Message, messageIndex: number) => {
    // Generate SavedAnswer structure
    const cleanedTitle = msg.text.length > 50 ? msg.text.substring(0, 47) + '...' : msg.text;
    const isAlreadySaved = savedAnswers.some((ans) => ans.id === `sv_${msg.id}`);

    if (isAlreadySaved) {
      triggerToast('Câu hỏi này đã được lưu từ trước!');
      return;
    }

    const answerToSave: SavedAnswer = {
      id: `sv_${msg.id}`,
      title: cleanedTitle,
      category: 'Academic',
      date: new Date().toLocaleDateString('vi-VN'),
      content: msg.text + (msg.table ? '\n(Có bảng phụ lục đính kèm trong DMRS)' : ''),
    };

    onSaveAnswer(answerToSave);

    // Update message state local representation
    const updatedMsgs = [...messages];
    updatedMsgs[messageIndex] = { ...msg, isSaved: true };
    setMessages(updatedMsgs);

    triggerToast('Đã lưu thành công câu trả lời học tập!');
  };

  const handleFAQClick = (faq: typeof POPULAR_FAQS[0]) => {
    setInputText(faq.question);
    handleSend(faq.question);
  };

  return (
    <div className="flex bg-[#f8f9fd] min-h-screen">
      {/* Sidebar - has nav tags inside */}
      <Sidebar currentScreen="ai-retrieval" onNavigate={onNavigate} />

      {/* Main Content frame */}
      <div className="flex-1 ml-[280px] pt-[70px] flex">
        {/* Top bar header */}
        <Topbar title="DMRS Assistant" subtitle="Trợ lý AI sẵn sàng hỗ trợ" profile={profile} onNavigate={onNavigate} />

        {/* Left Side: Interactive Chat Console */}
        <div className="flex-1 flex flex-col h-[calc(100vh-70px)] bg-[#f8f9fd] border-r border-[#E5E7EB] p-6">
          
          {/* Chat Container Box */}
          <div className="flex-1 bg-white rounded-xl border border-[#E5E7EB] flex flex-col overflow-hidden shadow-sm">
            
            {/* Header row in Chat box */}
            <div className="px-6 py-4 bg-slate-50 border-b border-[#F3F4F6] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 leading-tight">DMRS Assistant</h3>
                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Sẵn sàng hỗ trợ
                  </p>
                </div>
              </div>
              <div className="text-xs text-slate-400 font-mono">MODEL: GEMINI-3.5-FLASH</div>
            </div>

            {/* Conversational timeline scroll */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, index) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`max-w-[80%] flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                      
                      {/* Avatar Bubble */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isUser 
                          ? 'bg-[#003fb1] text-white font-bold text-xs' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {isUser ? 'U' : <Bot size={15} />}
                      </div>

                      {/* Content block */}
                      <div className="space-y-2">
                        {/* Message body */}
                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          isUser
                            ? 'bg-[#003fb1] text-white font-medium rounded-tr-none'
                            : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/50'
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.text}</p>

                          {/* Supplementary database tables if provided */}
                          {msg.table && (
                            <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-white">
                              <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                                <thead className="bg-[#e5eeff] text-[#003fb1] font-bold">
                                  <tr>
                                    {msg.table.headers.map((h, i) => (
                                      <th key={i} className="px-4 py-2 font-bold">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                                  {msg.table.rows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                      {row.columns.map((col, colIdx) => (
                                        <td key={colIdx} className="px-4 py-2 bg-white">
                                          {colIdx === 2 ? (
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block ${
                                              row.status === 'success' 
                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                                : 'bg-amber-50 text-amber-600 border border-amber-100'
                                            }`}>
                                              {col}
                                            </span>
                                          ) : col}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* Trigger suggestion pills */}
                          {msg.suggestions && (
                            <div className="mt-3 flex flex-wrap gap-2 pt-1">
                              {msg.suggestions.map((sug, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => handleSend(sug)}
                                  className="text-xs bg-[#e5eeff] hover:bg-[#d4dcff] text-[#003fb1] font-bold px-3 py-1.5 rounded-full transition-all border border-blue-200 shadow-sm"
                                >
                                  {sug}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Interactive operations like Save answers */}
                        <div className={`flex items-center gap-3 text-[10px] text-slate-400 font-bold ${
                          isUser ? 'justify-end' : 'justify-start'
                        }`}>
                          <span>{msg.timestamp}</span>
                          {!isUser && (
                            <button
                              id={`save-btn-${msg.id}`}
                              onClick={() => handleSaveResponse(msg, index)}
                              className={`flex items-center gap-1.5 font-bold p-1 hover:text-[#003fb1] transition-colors ${
                                msg.isSaved ? 'text-[#003fb1]' : 'text-slate-400'
                              }`}
                            >
                              {msg.isSaved ? (
                                <>
                                  <BookmarkCheck size={12} className="text-[#003fb1]" />
                                  <span className="text-[#003fb1]">Đã lưu trữ</span>
                                </>
                              ) : (
                                <>
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                  Lưu câu trả lời
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}

              {/* Loader placeholder while AI typing */}
              {isTyping && (
                <div className="flex justify-start animate-pulse">
                  <div className="max-w-[80%] flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Bot size={15} />
                    </div>
                    <div className="bg-slate-100 text-slate-600 px-4 py-3 rounded-2xl rounded-tl-none font-medium text-xs flex items-center gap-1.5 border border-slate-200/50">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Console Prompt Keyboard */}
            <div className="p-4 bg-slate-50 border-t border-[#F3F4F6]">
              <div className="relative flex items-center bg-white rounded-xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-[#003fb1]/20 focus-within:border-[#003fb1] transition-all">
                <button className="p-3 text-slate-400 hover:text-slate-600" title="Đính kèm tài liệu học tập">
                  <Paperclip size={18} />
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Nhập câu hỏi của bạn tại đây..."
                  className="flex-1 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 bg-transparent"
                />
                <button className="p-3 text-slate-400 hover:text-[#003fb1] transition-colors" title="Ghi âm câu hỏi">
                  <Mic size={18} />
                </button>
                <div className="pr-2">
                  <button
                    onClick={() => handleSend()}
                    className="p-2 bg-[#003fb1] hover:bg-[#114ec3] text-white rounded-lg shadow-sm transition-all flex items-center justify-center active:scale-95 cursor-pointer"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
                AI có thể đưa ra câu trả lời không chính xác. Hãy kiểm tra các thông tin học thuật quan trọng.
              </p>
            </div>

          </div>
        </div>

        {/* Right Side Column (Widgets & Actions) */}
        <div className="w-[340px] h-[calc(100vh-70px)] overflow-y-auto bg-[#f8f9fd] p-6 space-y-6">
          
          {/* FAQ Card Component */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <HelpCircle className="text-[#003fb1]" size={18} />
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                Câu hỏi thường gặp
              </h4>
            </div>

            <div className="space-y-2.5">
              {POPULAR_FAQS.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => handleFAQClick(faq)}
                  className="w-full text-left p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-all font-medium text-xs text-slate-700 flex justify-between items-center group cursor-pointer"
                >
                  <span className="line-clamp-2 pr-2 leading-relaxed">{faq.question}</span>
                  <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>

            {/* Blue Active Answers Trigger - CRITICAL NAVIGATION ELEMENT */}
            <button
              id="saved-answers-trigger"
              onClick={() => onNavigate('saved-answers', 'push')}
              className="mt-4 w-full py-3 bg-[#e5eeff] hover:bg-[#d4dcff] text-[#003fb1] font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 border border-blue-100 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <BookmarkCheck size={16} />
              Câu trả lời đã lưu
            </button>

            <div className="mt-3 text-center">
              <a 
                href="#all-saved" 
                onClick={(e) => { e.preventDefault(); onNavigate('saved-answers', 'push'); }}
                className="text-xs text-slate-400 hover:text-[#003fb1] font-semibold hover:underline"
              >
                Xem thêm tất cả
              </a>
            </div>
          </div>

          {/* Latest Shared Academic Documents */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText size={18} className="text-orange-500" />
              Tài liệu mới nhất
            </h4>

            <div className="space-y-4">
              <div className="flex gap-3 items-start hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <div className="p-2 bg-red-50 text-red-500 rounded-lg shrink-0 mt-0.5">
                  <FileText size={16} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-700 hover:text-[#003fb1] transition-colors leading-snug cursor-pointer">
                    TKB Học kỳ 1 (2024-2025)
                  </h5>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Cập nhật 2 giờ trước • 2.4 MB</p>
                </div>
              </div>

              <div className="flex gap-3 items-start hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-lg shrink-0 mt-0.5">
                  <FileCode size={16} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-700 hover:text-[#003fb1] transition-colors leading-snug cursor-pointer">
                    Sổ tay Sinh viên 2024
                  </h5>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Cập nhật 1 ngày trước • 5.1 MB</p>
                </div>
              </div>

              <div className="flex gap-3 items-start hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg shrink-0 mt-0.5">
                  <FileSpreadsheet size={16} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-700 hover:text-[#003fb1] transition-colors leading-snug cursor-pointer">
                    Mẫu đơn đăng ký học bổ...
                  </h5>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Cập nhật 3 ngày trước • 150 KB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hotline direct assistance help card */}
          <div className="bg-gradient-to-br from-[#003fb1] to-[#125cf3] rounded-xl text-white p-5 shadow-md relative overflow-hidden group">
            {/* Soft decorative visual grids on dark banner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-12 -translate-y-6 group-hover:scale-110 transition-transform duration-300"></div>
            
            <h5 className="text-sm font-bold tracking-wide">Cần hỗ trợ trực tiếp?</h5>
            <p className="text-xs leading-relaxed text-blue-100 mt-2 font-medium">
              Liên hệ ngay với văn phòng đào tạo trường chúng tôi qua Hotline hỗ trợ.
            </p>
            <button 
              onClick={() => setShowPhoneModal(true)}
              className="mt-4 px-4 py-2 bg-white text-[#003fb1] hover:bg-blue-50 text-xs font-bold rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Gọi ngay
            </button>
          </div>

        </div>

      </div>

      {/* Global Bottom-right Floating Toast banner */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121c28] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-slide-up border border-slate-700/50">
          <Check className="text-emerald-400" size={18} />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Global Interactive Phone Hotline Modal mockup */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-[#121c28]/45 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-slide-up text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 text-[#003fb1] rounded-full flex items-center justify-center">
              <Phone size={24} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Hotline Văn phòng Đào tạo</h3>
              <p className="text-[#003fb1] text-lg font-extrabold mt-1">1900 8198 (Ext: DMRS)</p>
              <p className="text-xs text-slate-400 font-semibold mt-2">
                Giờ làm việc: Thứ 2 - Thứ 6 (lục tục từ 08:00 đến 17:00)
              </p>
            </div>
            <button
              onClick={() => setShowPhoneModal(false)}
              className="w-full py-2.5 bg-[#003fb1] hover:bg-[#114ec3] text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Đóng liên kết
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
