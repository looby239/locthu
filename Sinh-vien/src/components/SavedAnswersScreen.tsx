/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Calendar, Trash2, ExternalLink, 
  ChevronLeft, ChevronRight, BookmarkCheck, BookOpen 
} from 'lucide-react';
import { ScreenId, SavedAnswer, UserProfile } from '../types';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface SavedAnswersScreenProps {
  profile: UserProfile;
  savedAnswers: SavedAnswer[];
  onDeleteAnswer: (id: string) => void;
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back') => void;
}

export default function SavedAnswersScreen({ 
  profile, 
  savedAnswers, 
  onDeleteAnswer, 
  onNavigate 
}: SavedAnswersScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByDate, setSortByDate] = useState('newest');
  const [selectedAnswer, setSelectedAnswer] = useState<SavedAnswer | null>(null);

  const filteredAnswers = savedAnswers.filter(ans => {
    return ans.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           ans.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
           ans.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex bg-[#f8f9fd] min-h-screen">
      {/* Sidebar - anchor navs */}
      <Sidebar currentScreen="ai-retrieval" onNavigate={onNavigate} />

      {/* Main Content Pane */}
      <div className="flex-1 ml-[280px] pt-[70px] flex flex-col p-8 space-y-6">
        <Topbar title="Câu trả lời đã lưu" subtitle="Học liệu học tập cá nhân" profile={profile} onNavigate={onNavigate} />

        {/* Breadcrumb line linking back targeting //a[contains(., 'Chat AI')] or push_back */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-4 py-2 border border-slate-200/60 rounded-xl w-max shadow-sm animate-fade-in">
          <a 
            id="back-breadcrumb"
            href="#chat-ai" 
            onClick={(e) => { e.preventDefault(); onNavigate('ai-retrieval', 'push_back'); }}
            className="hover:text-[#003fb1] flex items-center gap-1 cursor-pointer transition-colors text-slate-500 font-bold"
          >
            <ArrowLeft size={14} />
            Chat AI
          </a>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-[#003fb1]">Câu trả lời đã lưu</span>
        </div>

        {/* Title area */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 animate-fade-in">
          <h3 className="text-xl font-bold text-slate-800">Câu trả lời đã lưu</h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Quản lý và tra cứu các câu trả lời hữu ích từ Chat AI. Bạn có thể xem nhanh nội dung học tập, quy định và thủ tục hành chính học sinh sinh viên bất kể khi nào.
          </p>
        </div>

        {/* Search controls row */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex gap-4 items-center flex-wrap animate-fade-in">
          {/* Search box */}
          <div className="flex-1 min-w-[240px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm trong câu trả lời..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1] focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Date sort dropdown */}
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-slate-400" />
            <select
              value={sortByDate}
              onChange={(e) => setSortByDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg text-xs py-1.5 px-3 font-semibold text-slate-600 outline-none cursor-pointer"
            >
              <option value="newest">Lọc theo ngày</option>
              <option value="oldest">Cũ nhất trước</option>
            </select>
          </div>
        </div>

        {/* Grid of Saved answers matching Image 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredAnswers.map((ans) => {
            const isAcademic = ans.category === 'Academic';
            const isTechnical = ans.category === 'Technical';
            const isPolicy = ans.category === 'Policy';

            return (
              <div 
                key={ans.id} 
                className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all duration-150"
              >
                <div>
                  {/* Card head: Tag, Date, Delete button */}
                  <div className="flex justify-between items-center mb-3">
                    <span className={`px-2.5 py-0.5 text-[10px] uppercase font-black tracking-wider rounded ${
                      isAcademic ? 'bg-indigo-50 text-indigo-600' :
                      isTechnical ? 'bg-emerald-50 text-emerald-600' :
                      isPolicy ? 'bg-slate-100 text-slate-600' :
                      'bg-slate-50 text-slate-500'
                    }`}>
                      {ans.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {ans.date}
                    </span>
                  </div>

                  {/* Body text */}
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-relaxed mb-2 hover:text-[#003fb1] transition-colors cursor-pointer" onClick={() => setSelectedAnswer(ans)}>
                    {ans.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed font-semibold">
                    {ans.content}
                  </p>
                </div>

                {/* Card actions bottom */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase transition-colors">
                  <button 
                    onClick={() => setSelectedAnswer(ans)}
                    className="text-[#003fb1] hover:text-[#114ec3] flex items-center gap-1 font-bold cursor-pointer hover:underline text-[11px]"
                  >
                    Xem chi tiết
                    <ExternalLink size={12} />
                  </button>
                  <button
                    onClick={() => onDeleteAnswer(ans.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                    title="Xóa câu hỏi đã lưu"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredAnswers.length === 0 && (
            <div className="col-span-full bg-white border border-dashed border-slate-250 py-12 text-center rounded-2xl flex flex-col items-center justify-center space-y-3">
              <BookmarkCheck size={40} className="text-slate-300" />
              <p className="text-sm font-semibold text-slate-400">Không tìm thấy câu hỏi học tập nào đã lưu phù hợp.</p>
            </div>
          )}
        </div>

        {/* Simple pagination matching Image 6 footer */}
        {filteredAnswers.length > 0 && (
          <div className="bg-white px-6 py-4 rounded-xl border border-slate-200/80 shadow-sm flex justify-between items-center text-xs text-slate-400 font-bold animate-fade-in">
            <span className="font-semibold text-slate-500">
              Đang hiển thị <span className="text-[#191c1f] font-bold">1 đến {filteredAnswers.length}</span> trong số{' '}
              <span className="text-[#191c1f] font-bold">12</span> kết quả
            </span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded bg-slate-50 hover:bg-slate-100 cursor-pointer text-slate-400">
                <ChevronLeft size={16} />
              </button>
              <button className="px-2.5 py-0.5 rounded bg-[#e5eeff] text-[#003fb1] border border-blue-200 font-bold cursor-pointer">
                1
              </button>
              <button className="px-2.5 py-0.5 rounded bg-white hover:bg-slate-50 border border-slate-150 font-bold cursor-pointer text-slate-500">
                2
              </button>
              <button className="px-2.5 py-0.5 rounded bg-white hover:bg-slate-50 border border-slate-150 font-bold cursor-pointer text-slate-500">
                3
              </button>
              <button className="p-1 rounded bg-slate-50 hover:bg-slate-100 cursor-pointer text-slate-400">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Detail Answer Modal mockup */}
      {selectedAnswer && (
        <div className="fixed inset-0 bg-[#121c28]/45 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-slide-up space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <span className="px-2 py-0.5 bg-blue-50 text-[#003fb1] text-[9px] font-black uppercase rounded">
                {selectedAnswer.category}
              </span>
              <span className="text-[10px] text-slate-400 font-bold">{selectedAnswer.date}</span>
            </div>
            
            <h4 className="text-sm font-bold text-slate-800 leading-relaxed">
              {selectedAnswer.title}
            </h4>
            <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed font-semibold max-h-[240px] overflow-y-auto whitespace-pre-wrap border border-slate-100">
              {selectedAnswer.content}
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setSelectedAnswer(null)}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold text-xs rounded-lg transition-colors cursor-pointer border border-slate-200"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  onDeleteAnswer(selectedAnswer.id);
                  setSelectedAnswer(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Xóa khỏi danh sách
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
