import React, { useState, useEffect } from 'react';
import { 
  FileText, Calendar, CloudUpload, Tag, History, X, 
  ChevronRight, ArrowLeft, ArrowDown, Save, FileSpreadsheet, Download 
} from 'lucide-react';
import { Screen, DocumentItem } from '../types';

interface EditDocumentViewProps {
  docId: string;
  documents: DocumentItem[];
  onNavigate: (screen: Screen, transition?: 'slide_up' | 'push_back' | 'none') => void;
  onUpdateDocument: (updatedDoc: DocumentItem) => void;
}

export default function EditDocumentView({ 
  docId, 
  documents, 
  onNavigate, 
  onUpdateDocument 
}: EditDocumentViewProps) {
  // Find the selected document matching state
  const currentDoc = documents.find(d => d.id === docId) || documents[0];

  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    author: '',
    description: '',
    publishDate: '',
    status: 'Công khai' as 'Công khai' | 'Nội bộ' | 'Chờ xử lý',
    fileName: '',
    fileSize: '',
  });

  const [tags, setTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentDoc) {
      setFormData({
        title: currentDoc.title,
        domain: currentDoc.domain,
        author: currentDoc.author,
        description: currentDoc.description,
        publishDate: currentDoc.publishDate,
        status: currentDoc.status,
        fileName: currentDoc.fileName,
        fileSize: currentDoc.fileSize,
      });
      setTags([...currentDoc.tags]);
    }
  }, [currentDoc]);

  if (!currentDoc) {
    return (
      <div className="p-8 text-center bg-white border border-outline-variant rounded-xl font-sans">
        <p className="text-sm font-semibold text-rose-600">Lỗi: Không tìm thấy tài liệu này.</p>
        <button onClick={() => onNavigate(Screen.DOCUMENT_HUB)} className="mt-4 px-4 py-2 bg-primary text-white rounded text-xs">
          Quay lại kho tài liệu
        </button>
      </div>
    );
  }

  const handleRemoveTag = (tagIdx: number) => {
    setTags(tags.filter((_, idx) => idx !== tagIdx));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(newTagInput.trim())) {
        setTags([...tags, newTagInput.trim()]);
      }
      setNewTagInput('');
    }
  };

  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Tên tài liệu là bắt buộc!');
      return;
    }

    setSaving(true);
    setTimeout(() => {
      onUpdateDocument({
        ...currentDoc,
        title: formData.title,
        domain: formData.domain,
        author: formData.author,
        description: formData.description,
        publishDate: formData.publishDate,
        status: formData.status,
        tags: tags,
      });
      setSaving(false);
      alert('Lưu cập nhật thông tin tài liệu thành công!');
      onNavigate(Screen.DOCUMENT_HUB, 'push_back');
    }, 1000);
  };

  const handleDownloadAttachment = () => {
    alert(`Đang bắt đầu tải tệp: ${formData.fileName}\n(Lưu tệp thành công từ máy chủ học thuật DMRS)`);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Breadcrumb link heading */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-outline font-bold uppercase transition-colors">
        <button 
          onClick={() => onNavigate(Screen.DOCUMENT_HUB, 'push_back')}
          className="hover:text-primary cursor-pointer"
        >
          Kho tài liệu
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800">Chỉnh sửa tài liệu</span>
      </div>

      <div>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Chỉnh sửa tài liệu</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Cập nhật thông tin thư mục, bản sửa đổi và phân quyền tài sản nghiên cứu khoa học.
        </p>
      </div>

      <form onSubmit={handleSaveDoc} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Side: General Info & Upload Zone (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* General Info Card */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant space-y-5">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Thông tin chung</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Tên tài liệu *</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Nhập tên tài liệu khoa học..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Lĩnh vực *</label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none bg-white"
                      required
                    >
                      <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                      <option value="Kinh tế">Kinh tế</option>
                      <option value="Y dược">Y dược</option>
                      <option value="Khoa học cơ bản">Khoa học cơ bản</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Tác giả *</label>
                    <input 
                      type="text" 
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none"
                      placeholder="Nhập tên tác giả chính..."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Mô tả tài liệu</label>
                  <textarea 
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none resize-none"
                    placeholder="Mô tả chi tiết nội dung nghiên cứu..."
                  />
                </div>
              </div>
            </div>

            {/* Attached file & replacement upload card */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant space-y-4">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Tệp đính kèm</h3>
              
              {/* Existing file tag display */}
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-650 rounded">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{formData.fileName}</p>
                    <p className="text-[10px] text-outline font-medium mt-0.5">{formData.fileSize} • Cập nhật lần cuối: 10/10/2023</p>
                  </div>
                </div>
                
                <button 
                  type="button" 
                  onClick={handleDownloadAttachment}
                  className="px-3 py-1.5 text-primary bg-white border border-outline-variant rounded hover:bg-blue-50/50 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Tải xuống tệp
                </button>
              </div>

              {/* Dotted upload zone */}
              <div 
                onClick={() => alert('Vui lòng chọn một tệp từ hệ thống cục bộ để tải đè thay thế!')}
                className="border-2 border-dashed border-outline-variant hover:border-primary bg-slate-50/50 hover:bg-blue-50/10 rounded-xl p-8 text-center flex flex-col items-center justify-center cursor-pointer transition-all"
              >
                <CloudUpload className="w-9 h-9 text-outline mb-3 group-hover:scale-110" />
                <p className="text-xs font-bold text-slate-700">Kéo thả tệp mới vào đây hoặc <span className="text-primary hover:underline">Chọn tệp</span> để thay thế</p>
                <p className="text-[10px] text-outline mt-1 font-medium">Hỗ trợ định dạng PDF, DOCX, XLSX (Tối đa dung lượng 50MB)</p>
              </div>
            </div>
          </div>

          {/* Right Side: Properties & Version List (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Attribute configs column */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant space-y-5">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Thuộc tính khoa khoa</h3>
              
              <div className="space-y-4">
                {/* Publish date helper */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Ngày phát hành</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formData.publishDate}
                      onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                      className="w-full pl-9 pr-4 py-2 border border-outline-variant rounded-lg text-xs font-bold focus:ring-2 focus:ring-primary outline-none"
                      placeholder="MM/DD/YYYY"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  </div>
                </div>

                {/* Status selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">Trạng thái phát hành</label>
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="doc_status"
                        checked={formData.status === 'Công khai'}
                        onChange={() => setFormData({ ...formData, status: 'Công khai' })}
                        className="text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      Công khai (Học viên tra cứu)
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="doc_status"
                        checked={formData.status === 'Nội bộ'}
                        onChange={() => setFormData({ ...formData, status: 'Nội bộ' })}
                        className="text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      Lưu hành nội bộ bộ phận
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="doc_status"
                        checked={formData.status === 'Chờ xử lý'}
                        onChange={() => setFormData({ ...formData, status: 'Chờ xử lý' })}
                        className="text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      Đang chờ rà soát duyệt
                    </label>
                  </div>
                </div>

                {/* Keywords tags */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 font-mono">Từ khóa (Tags)</label>
                  <div className="flex flex-wrap gap-1.5 p-2 border border-outline-variant bg-slate-50/20 rounded-lg max-h-36 overflow-y-auto">
                    {tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 border border-slate-200">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(idx)} className="text-outline hover:text-red-500 cursor-pointer">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {tags.length === 0 && <span className="text-[10px] text-outline p-1 font-semibold">Chưa thiết lập tags...</span>}
                  </div>
                  <input 
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full mt-2 px-3 py-1.5 border border-slate-200 focus:border-primary text-xs font-semibold rounded outline-none"
                    placeholder="Nhập tag mới bấm Enter..."
                  />
                </div>
              </div>
            </div>

            {/* Version histories */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant space-y-4">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                <History className="w-4.5 h-4.5 text-primary" />
                Lịch sử phiên bản
              </h3>

              <div className="space-y-4">
                {currentDoc.versions && currentDoc.versions.map((ver, i) => (
                  <div key={i} className="flex gap-3 text-xs leading-relaxed border-l-2 border-slate-100 pl-3.5 pb-2">
                    <div className="font-extrabold text-blue-600">{ver.version}</div>
                    <div>
                      <p className="font-bold text-slate-700">{ver.description}</p>
                      <p className="text-[10px] text-outline mt-0.5">Bởi {ver.author} • {ver.date}</p>
                    </div>
                  </div>
                ))}
                
                <button 
                  type="button" 
                  onClick={() => alert('Lịch sử biên soạn chi tiết được đồng bộ lên trung tâm VCS của DMRS.')}
                  className="w-full text-center text-xs text-primary font-bold hover:underline cursor-pointer block pt-2"
                >
                  Xem toàn bộ lịch sử
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bottom command bar */}
        <div className="flex justify-end items-center gap-4 pt-6 border-t border-outline-variant">
          <button 
            type="button" 
            onClick={() => onNavigate(Screen.DOCUMENT_HUB, 'push_back')}
            className="px-6 py-2.5 border border-outline-variant text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-lg cursor-pointer transition-all active:scale-95"
          >
            Hủy bỏ
          </button>
          
          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-lg cursor-pointer hover:opacity-95 shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4.5 h-4.5" />
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}
