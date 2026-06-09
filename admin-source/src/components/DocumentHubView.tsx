import React, { useState } from 'react';
import { 
  Search, Upload, Filter, Edit2, Trash2, DownloadCloud, Eye,
  FileSpreadsheet, FileText, ChevronLeft, ChevronRight, FileArchive, Plus, RefreshCw
} from 'lucide-react';
import { Screen, DocumentItem } from '../types';

interface DocumentHubViewProps {
  documents: DocumentItem[];
  onNavigate: (screen: Screen, transition?: 'slide_up' | 'push_back' | 'none') => void;
  setSelectedDocId: (id: string) => void;
  onDeleteDocument: (id: string) => void;
}

export default function DocumentHubView({ 
  documents, 
  onNavigate, 
  setSelectedDocId,
  onDeleteDocument
}: DocumentHubViewProps) {
  const [fieldFilter, setFieldFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDocs = documents.filter(doc => {
    const matchesField = fieldFilter === 'all' || doc.domain === fieldFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesField && matchesStatus && matchesSearch;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Công khai':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Nội bộ':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Chờ xử lý':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-250';
    }
  };

  const handlesDownloadDoc = (title: string, fileName: string) => {
    alert(`Đang tải xuống tệp chính thức: ${fileName}\n(Hệ thống DMRS - Tải tệp thành công!)`);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Kho tài liệu (Admin)</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Quản trị và quản lý biên tập tài liệu nghiên cứu khoa học, giáo trình, báo cáo liên phòng ban.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate(Screen.UPLOAD_DOCUMENT, 'slide_up')}
            className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-lg flex items-center gap-2 hover:opacity-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tải lên tài liệu mới
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-outline-variant flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-outline-variant rounded-lg text-xs font-semibold focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-slate-50/50"
          />
        </div>

        {/* Categories Selection filter */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-outline" />
            <span className="text-outline font-bold">LĨNH VỰC</span>
            <select
              value={fieldFilter}
              onChange={(e) => setFieldFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-outline-variant rounded-md text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tất cả lĩnh vực</option>
              <option value="Công nghệ thông tin">Công nghệ thông tin</option>
              <option value="Kinh tế">Kinh tế</option>
              <option value="Y dược">Y dược</option>
              <option value="Khoa học cơ bản">Khoa học cơ bản</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-outline font-bold">TRẠNG THÁI</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-outline-variant rounded-md text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Công khai">Công khai</option>
              <option value="Nội bộ">Nội bộ</option>
              <option value="Chờ xử lý">Chờ xử lý</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Document Center */}
      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-surface border-b border-outline-variant text-[11px] font-bold text-outline uppercase tracking-wider">
                <th className="py-4 px-6">Tài liệu</th>
                <th className="py-4 px-6">Lĩnh vực</th>
                <th className="py-4 px-6">Tác giả</th>
                <th className="py-4 px-6">Từ khóa (Tags)</th>
                <th className="py-4 px-6 text-center">Trạng thái</th>
                <th className="py-4 px-6 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium text-xs">
                    Không có tài liệu nào phù hợp với điều kiện tìm kiếm.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => {
                  return (
                    <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50/60 transition-all text-xs text-slate-800">
                      {/* Title block */}
                      <td className="py-4 px-6 max-w-sm">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 bg-slate-100 text-slate-600 rounded">
                            {doc.fileName.endsWith('.pdf') ? (
                              <FileText className="w-5 h-5 text-red-600" />
                            ) : (
                              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm leading-tight hover:text-primary cursor-pointer line-clamp-2" onClick={() => {
                              setSelectedDocId(doc.id);
                              onNavigate(Screen.EDIT_DOCUMENT, 'none');
                            }}>{doc.title}</p>
                            <p className="text-[10px] text-outline font-medium mt-1">
                              {doc.fileName} • <span className="font-mono">{doc.fileSize}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Domain */}
                      <td className="py-4 px-6">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-[10px] font-bold">
                          {doc.domain}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="py-4 px-6 font-semibold text-slate-800">{doc.author}</td>

                      {/* Tags list */}
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                          {doc.tags.map((tg, i) => (
                            <span key={i} className="bg-blue-50/60 text-blue-600 px-1.5 py-0.5 rounded text-[9px] font-semibold border border-blue-100">
                              #{tg}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Status Badges conforming strictly to UI standards */}
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-sm text-[10px] font-bold border ${getStatusStyle(doc.status)}`}>
                          {doc.status}
                        </span>
                      </td>

                      {/* Operations */}
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handlesDownloadDoc(doc.title, doc.fileName)}
                            className="p-1.5 text-slate-600 hover:text-primary hover:bg-slate-50 rounded cursor-pointer transition-colors"
                            title="Tải xuống tệp PDF/Docx"
                          >
                            <DownloadCloud className="w-4.5 h-4.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDocId(doc.id);
                              onNavigate(Screen.EDIT_DOCUMENT, 'none');
                            }}
                            className="p-1.5 text-slate-600 hover:text-primary hover:bg-slate-50 rounded cursor-pointer transition-colors"
                            title="Chỉnh sửa thông tin tài liệu"
                          >
                            <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Bạn có chắc muốn xóa tài liệu này từ thư viện?\n"${doc.title}"`)) {
                                onDeleteDocument(doc.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-650 hover:bg-rose-50 rounded cursor-pointer transition-colors"
                            title="Xóa vĩnh viễn"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Hiển thị 1 - {filteredDocs.length} của {documents.length} tài liệu</span>
          
          <div className="flex items-center gap-2">
            <button className="p-1 px-2 rounded hover:bg-slate-200 flex items-center gap-0.5 cursor-pointer border border-slate-200">
              <ChevronLeft className="w-3.5 h-3.5" /> Trước
            </button>
            <span className="bg-primary text-white p-1 px-2.5 rounded text-xs select-none">1</span>
            <span className="p-1 px-2.5 hover:bg-slate-200 rounded cursor-pointer">2</span>
            <button className="p-1 px-2 rounded hover:bg-slate-200 flex items-center gap-0.5 cursor-pointer border border-slate-200">
              Sau <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
