import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Sidebar } from './Sidebar';
import {
  ArrowLeft,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  User,
  CheckCircle,
  FileText,
  Upload,
  Download,
  Trash2,
  RotateCcw,
  Sparkles,
  Save,
  X
} from 'lucide-react';
import { Document, VersionInfo } from '../types';

export const EditDocScreen: React.FC = () => {
  const { navigateTo, documents, selectedDocIdToEdit, updateDocumentData } = useApp();

  // Find document to edit, fallback to first if none
  const documentToEdit = documents.find(d => d.id === selectedDocIdToEdit) || documents[0];

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [fileType, setFileType] = useState<'Syllabus' | 'Slide' | 'Tham khảo' | 'Bài tập' | 'Quy chế'>('Syllabus');
  const [description, setDescription] = useState('');
  
  // For uploading temporary simulation info
  const [isUploadingVersion, setIsUploadingVersion] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Sync edits on loading
  useEffect(() => {
    if (documentToEdit) {
      setName(documentToEdit.name);
      setSubject(documentToEdit.subject);
      setFileType(documentToEdit.fileType);
      setDescription(documentToEdit.description || '');
    }
  }, [documentToEdit]);

  const handleCancel = () => {
    navigateTo('repository', 'push_back');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated: Document = {
      ...documentToEdit,
      name,
      subject,
      fileType,
      description,
      lastUpdated: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ', Hôm nay',
      updater: 'Nguyễn Văn A'
    };

    updateDocumentData(updated);
    navigateTo('repository', 'push_back');
  };

  // Simulating dragging file for version upload
  const simulateVersionUpload = () => {
    setIsUploadingVersion(true);
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploadingVersion(false);
            // Append a version history item
            const newVersion: VersionInfo = {
              version: `2.2`,
              description: 'Tải lên phiên bản mới sửa đổi chương trình giảng dạy gốc.',
              date: 'Hôm nay, ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
              author: 'Nguyễn Văn A',
              isCurrent: true
            };
            
            const updatedHistory = [
              newVersion,
              ...documentToEdit.versionHistory.map(v => ({ ...v, isCurrent: false }))
            ];

            updateDocumentData({
              ...documentToEdit,
              versionHistory: updatedHistory,
              size: '4.5 MB',
              lastUpdated: 'Vừa xong'
            });
          }, 600);
          return 100;
        }
        return p + 30;
      });
    }, 150);
  };

  const handleRestoreVersion = (v: VersionInfo) => {
    const updatedHistory = documentToEdit.versionHistory.map(item => ({
      ...item,
      isCurrent: item.version === v.version
    }));
    
    updateDocumentData({
      ...documentToEdit,
      versionHistory: updatedHistory,
      lastUpdated: 'Khôi phục lúc Vừa xong'
    });
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar activeScreen="repository" />

      {/* Edit Rep Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top bar with Breadcrumbs */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            {/* Link to Kho tài liệu matches: //a[contains(text(), 'Kho tài liệu')] */}
            <a
              onClick={() => navigateTo('repository', 'push_back')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Kho tài liệu
            </a>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            <span className="text-slate-800">Chỉnh sửa tài liệu</span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Button Hủy matches: //button[contains(text(), 'Hủy bỏ') or contains(text(), 'Hủy')] */}
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 cursor-pointer transition-all"
            >
              Hủy bỏ
            </button>
            
            {/* Button Lưu matches: //button[contains(text(), 'Lưu thay đổi') or contains(text(), 'Lưu')] */}
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold shadow-md shadow-blue-100 cursor-pointer transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </header>

        {/* Content Page Grid UI */}
        <main className="p-8 space-y-6 max-w-[1440px] w-full mx-auto" id="edit-doc-main-container">
          
          {/* Headline details */}
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Chỉnh sửa tài liệu</h2>
            <p className="text-slate-500 text-sm mt-1">Cập nhật thông tin chi tiết và phiên bản của tài liệu giảng dạy.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Left columns (Forms & File updates) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Form 1: Basic Info */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-3">
                  Thông tin cơ bản
                </h3>

                <div className="space-y-4">
                  {/* Tên tài liệu * */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tên tài liệu *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Bài giảng Nhập môn Trí tuệ Nhân tạo - Chương 1"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Môn học selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Môn học</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                      >
                        <option value="Công nghệ phần mềm">Công nghệ phần mềm</option>
                        <option value="Cơ sở dữ liệu">Cơ sở dữ liệu</option>
                        <option value="Hệ điều hành">Hệ điều hành</option>
                        <option value="Mạng máy tính">Mạng máy tính</option>
                        <option value="Lập trình C">Lập trình C</option>
                        <option value="Nhập môn Trí tuệ Nhân tạo (INT3401)">Nhập môn Trí tuệ Nhân tạo (INT3401)</option>
                      </select>
                    </div>

                    {/* Loại tệp selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Loại tệp</label>
                      <select
                        value={fileType}
                        onChange={(e) => setFileType(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                      >
                        <option value="Syllabus">Syllabus môn học</option>
                        <option value="Slide">Slide bài giảng</option>
                        <option value="Tham khảo">Tài liệu tham khảo</option>
                        <option value="Bài tập">Đề học / Bài tập lớn</option>
                        <option value="Quy chế">Quy chuẩn / Quy chế</option>
                      </select>
                    </div>
                  </div>

                  {/* Mô tả ngắn */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mô tả ngắn</label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Nhập mô tả chi tiết của học liệu phục vụ cho AI trích xuất nội dung..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Form 2: Attachment Updates */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-3">
                  Tệp đính kèm & Phiên bản
                </h3>

                {/* Drag Drop Area */}
                <div
                  onClick={simulateVersionUpload}
                  className="border-2 border-dashed border-slate-200 hover:border-blue-600 bg-slate-50 hover:bg-slate-50/50 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer group transition-all"
                >
                  <Upload className="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:-translate-y-1" />
                  <p className="text-xs font-bold text-slate-700 mt-3">Kéo thả tệp mới vào đây hoặc <span className="text-blue-600">chọn tệp</span></p>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                    Hỗ trợ: PDF, PPTX, DOCX (Tối đa 50MB). <br /> Tải lên tệp mới sẽ tạo tự động một phiên bản tiếp theo.
                  </p>
                </div>

                {/* Simulation progress bar if uploading */}
                {isUploadingVersion && (
                  <div className="bg-blue-50/55 border border-blue-100 p-3.5 rounded-lg space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold text-blue-600">
                      <span>Đang tải lên phiên bản mới...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                )}

                {/* Active current file card */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800 font-mono truncate max-w-[280px]">
                        {documentToEdit.filePath || documentToEdit.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Đang sử dụng • {documentToEdit.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer" title="Tải xuống">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Xóa tệp">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right panels (Metadata properties & History list) */}
            <div className="space-y-6">
              
              {/* Box A: Document Properties */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-3">
                  Thuộc tính tệp
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-100/50">
                    <span className="text-slate-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Ngày tải lên gốc</span>
                    <span className="font-semibold text-slate-700 font-mono">{documentToEdit.uploadDate || '12/08/2023'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-100/50">
                    <span className="text-slate-500 flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Lần cập nhật cuối</span>
                    <span className="font-semibold text-slate-700 font-mono">{documentToEdit.lastUpdated || 'Hôm qua, 14:30'}</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-slate-100/50">
                    <span className="text-slate-500 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Người cập nhật</span>
                    <span className="font-semibold text-slate-700">{documentToEdit.updater || 'Nguyễn Văn A'}</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-slate-100/50">
                    <span className="text-slate-500 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Kích thước</span>
                    <span className="font-semibold text-slate-700 font-mono">{documentToEdit.size}</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-500 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Trạng thái AI</span>
                    <span className={`inline-flex items-center gap-1 block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      documentToEdit.status === 'Thành công' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      Đã nhúng (Success)
                    </span>
                  </div>
                </div>
              </div>

              {/* Box B: Version timeline */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-3">
                  Lịch sử phiên bản
                </h3>

                <div className="relative border-l border-slate-100 pl-4 space-y-5">
                  {documentToEdit.versionHistory && documentToEdit.versionHistory.map((v, i) => (
                    <div key={i} className="relative">
                      {/* Node circle tracker */}
                      <span className={`absolute -left-[22px] top-1.5 w-3.5 h-3.5 rounded-full border bg-white ${
                        v.isCurrent ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-350'
                      }`} />

                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-800">
                            Phiên bản {v.version} {v.isCurrent && <span className="bg-blue-50 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded ml-1 font-mono uppercase">Hiện tại</span>}
                          </h4>
                          {!v.isCurrent && (
                            <button
                              onClick={() => handleRestoreVersion(v)}
                              className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer font-semibold"
                              title="Khôi phục lại phiên bản này"
                            >
                              Khôi phục bản này
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{v.description}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-1 font-semibold">{v.date} • Bởi {v.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
