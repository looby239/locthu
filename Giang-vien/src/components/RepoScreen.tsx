import React, { useState, useMemo } from 'react';
import { useApp } from '../AppContext';
import { Sidebar } from './Sidebar';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit2,
  Download,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Bell,
  XCircle
} from 'lucide-react';
import { Document } from '../types';
import { AvatarDropdown } from './AvatarDropdown';

export const RepoScreen: React.FC = () => {
  const { navigateTo, documents, setSelectedDocIdToEdit } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Tất cả môn học');
  const [selectedType, setSelectedType] = useState('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Derive unique subject options for select filter
  const subjects = useMemo(() => {
    const list = documents.map(d => d.subject);
    return ['Tất cả môn học', ...Array.from(new Set(list))];
  }, [documents]);

  const fileTypes = ['Tất cả', 'Syllabus', 'Slide', 'Tham khảo', 'Bài tập', 'Quy chế'];
  
  const statuses = ['Tất cả', 'Đã lập chỉ mục', 'Chờ xử lý', 'Lỗi'];

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubject('Tất cả môn học');
    setSelectedType('Tất cả');
    setSelectedStatus('Tất cả');
    setCurrentPage(1);
  };

  // Filtered documents list
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchSubject = selectedSubject === 'Tất cả môn học' || doc.subject === selectedSubject;
      const matchType = selectedType === 'Tất cả' || doc.fileType === selectedType;
      
      let docStatusLabel = 'Đã lập chỉ mục';
      if (doc.status === 'Chờ xử lý') docStatusLabel = 'Chờ xử lý';
      if (doc.status === 'Lỗi') docStatusLabel = 'Lỗi';
      
      const matchStatus = selectedStatus === 'Tất cả' || 
                           (selectedStatus === 'Đã lập chỉ mục' && doc.status === 'Thành công') ||
                           docStatusLabel === selectedStatus;

      return matchSearch && matchSubject && matchType && matchStatus;
    });
  }, [documents, searchQuery, selectedSubject, selectedType, selectedStatus]);

  // Paginated list
  const paginatedDocs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDocs.slice(start, start + itemsPerPage);
  }, [filteredDocs, currentPage]);

  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage) || 1;

  const handleEditDoc = (docId: string) => {
    setSelectedDocIdToEdit(docId);
    navigateTo('edit_document', 'push');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar activeScreen="repository" />

      {/* Repository Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Row with quick search bar and profile */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Học viện Công nghệ</span>
            <span className="text-gray-350">/</span>
            <span className="text-xs font-bold text-blue-600 uppercase">Kho học liệu DMRS</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <AvatarDropdown />
          </div>
        </header>

        {/* Repository content page */}
        <main className="p-8 space-y-6 max-w-[1440px] w-full mx-auto">
          
          {/* Main Title & Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Kho tài liệu</h2>
              <p className="text-sm text-slate-500 mt-1">
                Quản lý, phân loại và cập nhật tài liệu giảng dạy của bạn.
              </p>
            </div>
            
            <button
              onClick={() => navigateTo('upload_document', 'slide_up')}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-full text-sm font-semibold shadow-md shadow-blue-100 transition-all duration-200 cursor-pointer group"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Tải lên tài liệu</span>
            </button>
          </div>

          {/* Filters Form Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            {/* Search Input Box */}
            <div className="relative">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Tìm kiếm tài liệu học phần, giáo trình, slide..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-full text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400"
              />
            </div>

            {/* Selector fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Môn học</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all"
                >
                  {subjects.map((subj, index) => (
                    <option key={index} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Loại tệp</label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all"
                >
                  {fileTypes.map((type, index) => (
                    <option key={index} value={type}>{type === 'Tất cả' ? 'Tất cả loại tệp' : type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Trạng thái AI</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all"
                >
                  {statuses.map((stat, index) => (
                    <option key={index} value={stat}>{stat === 'Tất cả' ? 'Tất cả trạng thái AI' : stat}</option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 py-2.5 px-4 rounded-full transition-all cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Xóa bộ lọc</span>
                </button>
              </div>
            </div>
          </div>

          {/* Academic Documents Data Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm" id="repo-documents-table">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold tracking-wider text-slate-500 uppercase bg-slate-50">
                    <th className="py-4 px-6">Tên tài liệu</th>
                    <th className="py-4 px-6">Môn học</th>
                    <th className="py-4 px-6">Loại tệp</th>
                    <th className="py-4 px-6">Ngày tải lên</th>
                    <th className="py-4 px-6">Trạng thái AI</th>
                    <th className="py-4 px-6 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {paginatedDocs.length > 0 ? (
                    paginatedDocs.map((doc, idx) => (
                      <tr key={doc.id} className="hover:bg-slate-50 transition-all group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 font-semibold text-xs uppercase">
                              {doc.fileType.substring(0, 2)}
                            </div>
                            <div className="min-w-0">
                              <span className="font-semibold text-xs text-slate-800 group-hover:text-blue-600 block truncate max-w-[280px]">
                                {doc.name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{doc.size}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-xs font-medium text-slate-600">
                          {doc.subject}
                        </td>
                        <td className="py-4 px-6">
                          <span className="bg-slate-100 text-slate-600 text-[10px] px-2.5 py-1 rounded font-semibold tracking-wider uppercase font-mono">
                            {doc.fileType}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-500">
                          {doc.uploadDate}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            doc.status === 'Thành công'
                              ? 'bg-green-50 text-green-700'
                              : doc.status === 'Chờ xử lý'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-700'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {doc.status === 'Thành công' ? 'Đã lập chỉ mục' : doc.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {/* Metadata Editor matches title='Chỉnh sửa metadata' & (//button[@title='Chỉnh sửa metadata'])[1] */}
                            <button
                              title="Chỉnh sửa metadata"
                              onClick={() => handleEditDoc(doc.id)}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              title="Tải xuống tệp gốc"
                              className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-sm text-slate-400 font-medium uppercase tracking-widest bg-slate-50">
                        Không tìm thấy tài liệu phù hợp với bộ lọc chính xác.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table pagination row */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
              <span>
                Hiển thị <strong className="text-slate-800">{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredDocs.length)}</strong> của <strong className="text-slate-800">{filteredDocs.length}</strong> tài liệu
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg disabled:opacity-50 text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>
                <span className="text-slate-700">Trang {currentPage} / {totalPages}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg disabled:opacity-50 text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
