import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Sidebar } from './Sidebar';
import {
  Upload,
  ChevronRight,
  CheckCircle,
  FileText,
  AlertTriangle,
  Loader,
  Sliders,
  Sparkles,
  Info,
  XCircle,
  Plus
} from 'lucide-react';
import { Document, VersionInfo } from '../types';

export const UploadDocScreen: React.FC = () => {
  const { navigateTo, addNewDocument } = useApp();

  const [subject, setSubject] = useState('Công nghệ phần mềm');
  const [fileType, setFileType] = useState<'Syllabus' | 'Slide' | 'Tham khảo' | 'Bài tập' | 'Quy chế'>('Slide');
  const [customName, setCustomName] = useState('');
  const [description, setDescription] = useState('');

  // AI Options
  const [indexImmediately, setIndexImmediately] = useState(true);
  const [autoSummary, setAutoSummary] = useState(true);
  const [createFlashcards, setCreateFlashcards] = useState(false);

  // Upload mechanics
  const [dragActive, setDragActive] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const simulateProgressLoad = (fileName: string, fileSize: string) => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setAttachedFile({ name: fileName, size: fileSize });
          if (!customName) {
            setCustomName(fileName);
          }
          setIsUploading(false);
          return 100;
        }
        return p + 25;
      });
    }, 120);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      simulateProgressLoad(file.name, sizeStr);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      simulateProgressLoad(file.name, sizeStr);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attachedFile) {
      setUploadError('Vui lòng chọn hoặc kéo thả một tệp tài liệu trước khi tải lên.');
      return;
    }

    const finalName = customName.trim() || attachedFile.name;
    const todayStr = new Date().toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      name: finalName,
      subject,
      fileType,
      uploadDate: todayStr,
      size: attachedFile.size,
      status: indexImmediately ? 'Thành công' : 'Chờ xử lý',
      description: description.trim() || 'Tài liệu giáo trình học phần mới tải lên hệ thống.',
      lastUpdated: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ', Hôm nay',
      updater: 'Nguyễn Văn A',
      versionHistory: [
        {
          version: '1.0',
          description: 'Khởi tạo phiên bản tải lên gốc ban đầu.',
          date: todayStr,
          author: 'Nguyễn Văn A',
          isCurrent: true
        }
      ],
      filePath: attachedFile.name
    };

    addNewDocument(newDoc);
    navigateTo('repository', 'none'); // Return to Kho tài liệu on success
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar activeScreen="repository" />

      {/* Upload Container wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header bar with exact nav links matching: //nav//a */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
          <nav className="flex items-center gap-6" id="upload-header-nav">
            <span className="text-sm font-bold text-slate-800">Đăng tải & Số hóa</span>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            {/* Nav link: Bảng điều khiển */}
            <a
              onClick={() => navigateTo('dashboard', 'none')}
              className="text-slate-500 hover:text-blue-600 text-xs font-semibold cursor-pointer block py-1 transition-all"
            >
              Bảng điều khiển
            </a>
            {/* Nav link: Kho tài liệu */}
            <a
              onClick={() => navigateTo('repository', 'none')}
              className="text-slate-500 hover:text-blue-600 text-xs font-semibold cursor-pointer block py-1 transition-all"
            >
              Kho tài liệu
            </a>
          </nav>
          
          <div>
            <button
              onClick={() => navigateTo('repository', 'none')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Hủy đăng tải
            </button>
          </div>
        </header>

        {/* Form Container */}
        <main className="p-8 space-y-6 max-w-[900px] w-full mx-auto" id="upload-doc-main-container">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Tải lên tài liệu mới</h2>
            <p className="text-sm text-slate-500 mt-1">Cung cấp học liệu giảng dạy để phục vụ hỏi đáp thông minh và chia sẻ.</p>
          </div>

          {uploadError && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-xs text-red-700 flex gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Left box: Main Form fields */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              
              {/* Grid selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Môn học học phần</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white transition-all"
                  >
                    <option value="Công nghệ phần mềm">Công nghệ phần mềm</option>
                    <option value="Cơ sở dữ liệu">Cơ sở dữ liệu</option>
                    <option value="Hệ điều hành">Hệ điều hành</option>
                    <option value="Mạng máy tính">Mạng máy tính</option>
                    <option value="Lập trình C">Lập trình C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Loại tệp học liệu</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-[#191c1f] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white transition-all"
                  >
                    <option value="Syllabus">Syllabus chương trình học</option>
                    <option value="Slide">Slide bài giảng lý thuyết</option>
                    <option value="Tham khảo">Tài liệu tham khảo chuyên ngành</option>
                    <option value="Bài tập">Đề thi / Đề mẫu bài tập</option>
                    <option value="Quy chế">Mẫu biểu quy chuẩn</option>
                  </select>
                </div>
              </div>

              {/* Drag drop upload box */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-10 text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                  dragActive 
                    ? 'border-blue-600 bg-blue-50/50' 
                    : 'border-slate-200 bg-slate-50 hover:border-blue-600 hover:bg-white'
                }`}
              >
                <input
                  type="file"
                  id="file-element"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.docx,.pptx"
                />

                <label htmlFor="file-element" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-12 h-12 text-slate-400 group-hover:text-blue-600 mb-3" />
                  <p className="text-sm font-bold text-slate-700">Kéo thả tệp vào đây hoặc <span className="text-blue-600">click để chọn tệp</span></p>
                  <p className="text-xs text-slate-400 mt-2">Định dạng hỗ trợ: PDF, DOCX, PPTX (Tối đa 50MB)</p>
                </label>
              </div>

              {/* Loading progress / attached state layout */}
              {isUploading && (
                <div className="bg-blue-50/55 border border-blue-100 rounded-lg p-4 space-y-1.5 flex items-center justify-between gap-4">
                  <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-blue-600">
                      <span>Đang chuyển dữ liệu và xử lý...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                  <Loader className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
                </div>
              )}

              {attachedFile && !isUploading && (
                <div className="p-4 bg-emerald-50/55 border border-emerald-100 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100/60 text-emerald-600 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 font-mono">{attachedFile.name}</h4>
                      <p className="text-[10px] text-slate-400">Đã kiểm tất cả điều kiện an toàn ({attachedFile.size})</p>
                    </div>
                  </div>

                  <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                    Đã chọn
                  </span>
                </div>
              )}

              {/* Rename field */}
              {attachedFile && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Đặt tên hiển thị tài liệu</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Nhập tên hiển thị trên trang tra cứu..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                </div>
              )}

              {/* Description field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mô tả tóm tắt nội dung</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ghi chú tóm tắt của tài liệu học phần này, giúp tối ưu tìm kiếm của AI..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

            </div>

            {/* Right box: AI custom indexes parameters */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>Tùy chọn xử lý AI</span>
              </h3>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={indexImmediately}
                    onChange={(e) => setIndexImmediately(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Lập chỉ mục ngay khi tải lên</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Số hóa văn bản và đưa vào vector database để sẵn sàng phục vụ sinh viên hỏi đáp.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSummary}
                    onChange={(e) => setAutoSummary(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Trích xuất tóm tắt tự động</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Mô hình AI tự động tạo văn bản tóm tắt chi tiết cấu trúc học liệu.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createFlashcards}
                    onChange={(e) => setCreateFlashcards(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Tạo bộ câu hỏi ôn tập (Flashcards)</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Tạo ngay một danh sách câu hỏi kiểm tra khả năng tiếp thu dành cho sinh viên.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Bottom cancel / upload bar */}
            <div className="flex justify-end gap-3.5 pt-4">
              {/* Button Hủy bỏ matches: //button[contains(text(), 'Hủy bỏ')] */}
              <button
                type="button"
                onClick={() => navigateTo('repository', 'none')}
                className="px-6 py-3 bg-white text-xs font-semibold border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 cursor-pointer transition-all"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-3 px-6 rounded-full shadow-md shadow-blue-100 cursor-pointer transition-all"
              >
                Tải lên tài liệu
              </button>
            </div>

          </form>
        </main>
      </div>
    </div>
  );
};
