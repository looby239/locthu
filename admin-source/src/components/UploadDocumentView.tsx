import React, { useState } from 'react';
import { 
  CloudUpload, FolderOpen, Calendar, HelpCircle, X, 
  Trash, Bookmark, Save, Sparkles, FolderUp, CheckCircle, Eye 
} from 'lucide-react';
import { Screen, DocumentItem } from '../types';

interface UploadDocumentViewProps {
  onNavigate: (screen: Screen, transition?: 'slide_up' | 'push_back' | 'none') => void;
  onAddDocument: (newDoc: DocumentItem) => void;
}

export default function UploadDocumentView({ onNavigate, onAddDocument }: UploadDocumentViewProps) {
  const [formData, setFormData] = useState({
    title: '',
    domain: 'Công nghệ thông tin',
    author: 'TS. Nguyễn Văn A',
    description: '',
    publishDate: new Date().toLocaleDateString('vi-VN'),
    status: 'Công khai' as 'Công khai' | 'Nội bộ' | 'Chờ xử lý',
  });

  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [tags, setTags] = useState<string[]>(['Khoa học', 'Bài giảng']);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  const simulateQuickFileSelection = () => {
    setUploadedFile({
      name: 'Nghien_cuu_Mo_hinh_Ngon_ngu_v2.0.pdf',
      size: '5.2 MB'
    });
    alert('Đã đính kèm tệp mô phỏng thành công!');
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (idx: number) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Vui lòng nhập tên tài liệu!');
      return;
    }
    if (!uploadedFile) {
      alert('Vui lòng đính kèm tệp nguồn tài liệu trước khi tải lên (bằng cách click chọn tệp tài liệu!)');
      return;
    }

    setSaving(true);
    setTimeout(() => {
      onAddDocument({
        id: 'doc-' + Math.random().toString(),
        title: formData.title,
        domain: formData.domain,
        author: formData.author,
        description: formData.description || 'Chưa cung cấp mô tả chi tiết.',
        publishDate: formData.publishDate,
        status: formData.status,
        tags: tags,
        fileName: uploadedFile.name,
        fileSize: uploadedFile.size,
        versions: [
          {
            version: 'v1.0',
            author: 'Admin User',
            date: new Date().toLocaleDateString('vi-VN'),
            description: 'Tải lên phiên bản ban đầu'
          }
        ]
      });
      setSaving(false);
      alert('Tải lên và lập chỉ mục tài liệu mới thành công!');
      onNavigate(Screen.DOCUMENT_HUB, 'push_back');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Title block */}
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Tải lên tài liệu</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Lưu bản nghiên cứu khoa học, tài liệu giảng dạy hoặc luận văn tốt nghiệp mới vào kho lưu trữ DMRS.
        </p>
      </div>

      <form onSubmit={handleSubmitUpload} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Block - General information configurations */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white p-6 rounded-xl border border-outline-variant space-y-5">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-primary" />
                Thông tin chung
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Tên tài liệu *</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Nhập tiêu đề hồ sơ tài liệu học thuật chính..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Lĩnh vực học thuật *</label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none bg-white cursor-pointer"
                      required
                    >
                      <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                      <option value="Kinh tế">Kinh tế</option>
                      <option value="Y dược">Y dược</option>
                      <option value="Khoa học cơ bản">Khoa học cơ bản</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Tác giả biên tập *</label>
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
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Mô tả tóm tắt</label>
                  <textarea 
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm font-semibold focus:ring-2 focus:ring-primary outline-none resize-none"
                    placeholder="Viết một vài mô tả tóm tắt nội dung chính của tài liệu này để tăng độ chính xác trong chỉ mục tìm kiếm..."
                  />
                </div>
              </div>
            </div>

            {/* Upload Zone */}
            <div className="bg-white p-6 rounded-xl border border-outline-variant space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-800">Tệp tin nguồn tài liệu</h3>
                
                <button 
                  type="button" 
                  onClick={simulateQuickFileSelection}
                  className="text-xs text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Mô phỏng chọn tệp tài liệu
                </button>
              </div>

              {uploadedFile ? (
                <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-lg flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-800">{uploadedFile.name}</p>
                      <p className="text-[10px] text-outline font-semibold mt-0.5">Kích thước: {uploadedFile.size} • Sẵn sàng tải lên</p>
                    </div>
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => setUploadedFile(null)}
                    className="text-slate-400 hover:text-red-500 cursor-pointer p-1"
                    title="Hủy tệp"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={simulateQuickFileSelection}
                  className="border-2 border-dashed border-outline-variant hover:border-primary hover:bg-blue-50/10 p-10 text-center rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all"
                >
                  <CloudUpload className="w-10 h-10 text-outline mb-3 text-slate-400" />
                  <p className="text-xs font-bold text-slate-700">Kéo thả tệp nguồn vào đây hoặc <span className="text-primary hover:underline">Chọn tệp tài liệu</span></p>
                  <p className="text-[10px] text-outline mt-1 font-medium">Định dạng hỗ trợ: PDF, DOCX, XLSX, ZIP (Mức dung lượng tối đa 50MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* Right column - properties input selection */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white p-6 rounded-xl border border-outline-variant space-y-5">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Thuộc tính lưu trữ</h3>
              
              <div className="space-y-4">
                {/* Date picker mock */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Ngày thiết lập phát hành</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formData.publishDate}
                      onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                      className="w-full pl-9 pr-4 py-2 border border-outline-variant rounded-lg text-xs font-bold focus:ring-2 focus:ring-primary outline-none"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  </div>
                </div>

                {/* State rules */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase">Chính sách bảo mật</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-750 cursor-pointer">
                      <input 
                        type="radio" 
                        name="upload_status"
                        checked={formData.status === 'Công khai'}
                        onChange={() => setFormData({ ...formData, status: 'Công khai' })}
                        className="text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      Công khai (Học viên tra cứu)
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-750 cursor-pointer">
                      <input 
                        type="radio" 
                        name="upload_status"
                        checked={formData.status === 'Nội bộ'}
                        onChange={() => setFormData({ ...formData, status: 'Nội bộ' })}
                        className="text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      Lưu hành nội bộ Đại học
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-755 cursor-pointer">
                      <input 
                        type="radio" 
                        name="upload_status"
                        checked={formData.status === 'Chờ xử lý'}
                        onChange={() => setFormData({ ...formData, status: 'Chờ xử lý' })}
                        className="text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      Rà soát trước khi xuất bản
                    </label>
                  </div>
                </div>

                {/* Tags builder */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Từ khóa (Index Tags)</label>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-lg min-h-12 max-h-36 overflow-y-auto border border-outline-variant">
                    {tags.map((tg, idx) => (
                      <span key={idx} className="bg-primary/5 text-primary px-2 py-0.5 rounded text-[10px] font-bold border border-primary/10 flex items-center gap-1">
                        {tg}
                        <button type="button" onClick={() => handleRemoveTag(idx)} className="text-outline hover:text-red-500 cursor-pointer">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {tags.length === 0 && <span className="text-[10px] text-outline p-1">Chưa gắn tag từ khóa...</span>}
                  </div>
                  
                  <input 
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full mt-2 px-3 py-1.5 border border-slate-200 focus:border-primary text-xs font-semibold rounded outline-none"
                    placeholder="Nhập tag mới rồi ấn Enter..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action controllers bar */}
        <div className="flex justify-end items-center gap-4 pt-6 border-t border-outline-variant">
          <button 
            type="button" 
            onClick={() => onNavigate(Screen.DOCUMENT_HUB, 'push_back')}
            className="px-6 py-2.5 border border-outline-variant text-slate-750 bg-white hover:bg-slate-50 font-bold text-xs rounded-lg cursor-pointer transition-all active:scale-95 text-center"
          >
            Hủy bỏ
          </button>
          
          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-lg cursor-pointer hover:opacity-95 shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
          >
            <FolderUp className="w-4.5 h-4.5" />
            {saving ? 'Đang xuất bản...' : 'Xuất bản tài liệu'}
          </button>
        </div>
      </form>
    </div>
  );
}
