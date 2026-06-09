import React, { useState } from 'react';
import { 
  Plus, Search, Download, Filter, Edit, MoreVertical, 
  CheckCircle2, XCircle, AlertCircle, Info, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Screen, User } from '../types';

interface UserManagementViewProps {
  users: User[];
  onNavigate: (screen: Screen, transition?: 'slide_up' | 'push_back' | 'none') => void;
  setSelectedUserId: (id: string) => void;
  onDeleteUser: (id: string) => void;
}

export default function UserManagementView({ 
  users, 
  onNavigate, 
  setSelectedUserId,
  onDeleteUser
}: UserManagementViewProps) {
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [showOptionsId, setShowOptionsId] = useState<string | null>(null);

  // Filters
  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesSearch = user.name.toLowerCase().includes(localSearch.toLowerCase()) || 
                          user.email.toLowerCase().includes(localSearch.toLowerCase()) ||
                          user.staffId.toLowerCase().includes(localSearch.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Admin</span>;
      case 'giang-vien':
        return <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Giảng viên</span>;
      case 'sinh-vien':
        return <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Sinh viên</span>;
      default:
        return null;
    }
  };

  const getStatusBadgeAndText = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center justify-center gap-1.5 text-emerald-600 font-semibold text-xs">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Đang hoạt động
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center justify-center gap-1.5 text-amber-500 font-semibold text-xs">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            Chờ xác nhận
          </span>
        );
      case 'locked':
        return (
          <span className="flex items-center justify-center gap-1.5 text-rose-500 font-semibold text-xs">
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            Bị khóa
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Top action block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Quản lý người dùng</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Phân quyền và quản lý tài khoản thành viên trong hệ thống học thuật.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all">
            <Download className="w-4 h-4 text-slate-600" />
            Xuất báo cáo
          </button>
          <button 
            onClick={() => onNavigate(Screen.ADD_USER, 'none')}
            className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-lg flex items-center gap-1.5 hover:opacity-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4.5 h-4.5" />
            Thêm người dùng mới
          </button>
        </div>
      </div>

      {/* User Stats Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-5 rounded-xl border border-outline-variant items-center">
        <div className="md:col-span-2 flex items-center gap-3.5">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-outline font-bold uppercase tracking-wider">Tổng số người dùng</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">1,248 thành viên</h3>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <div className="flex -space-x-3 overflow-hidden">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" alt="user" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="user" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80" alt="user" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80" alt="user" />
            <div className="inline-block h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 ring-2 ring-white">+1k</div>
          </div>
        </div>
      </div>

      {/* Search and Filters panel */}
      <div className="bg-white p-4 rounded-xl border border-outline-variant flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Quick Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-outline-variant rounded-lg text-xs font-semibold focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-slate-50/50"
          />
        </div>

        {/* Roles & Status Select Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-outline font-bold">VAI TRÒ</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-2 py-1.5 bg-white border border-outline-variant rounded-md text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Admin</option>
              <option value="giang-vien">Giảng viên</option>
              <option value="sinh-vien">Sinh viên</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-outline font-bold">TRẠNG THÁI</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 py-1.5 bg-white border border-outline-variant rounded-md text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="locked">Bị khóa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface text-[11px] font-bold text-outline uppercase tracking-wider border-b border-outline-variant">
                <th className="py-3.5 px-6">Người dùng</th>
                <th className="py-3.5 px-6">Email công vụ</th>
                <th className="py-3.5 px-6">Vai trò</th>
                <th className="py-3.5 px-6 text-center">Trạng thái</th>
                <th className="py-3.5 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-medium text-xs">
                    Không tìm thấy thành viên phù hợp với bộ lọc tìm kiếm.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50/60 transition-all text-xs text-slate-800">
                    {/* User profile with avatar and sub-details */}
                    <td className="py-4 px-6 flex items-center gap-3.5 min-w-[240px]">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                        <img 
                          className="w-full h-full object-cover" 
                          src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80'} 
                          alt="avatar" 
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm leading-tight">{user.name}</p>
                        <p className="text-[10px] text-outline font-mono mt-0.5">MS: {user.staffId}</p>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-slate-600">{user.email}</td>
                    
                    <td className="py-4 px-6">{getRoleBadge(user.role)}</td>
                    
                    <td className="py-4 px-6 text-center">{getStatusBadgeAndText(user.status)}</td>
                    
                    {/* Action buttons */}
                    <td className="py-4 px-6 text-right relative">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedUserId(user.id);
                            onNavigate(Screen.EDIT_USER, 'none');
                          }}
                          className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-primary rounded font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Sửa
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc chắn muốn xóa thành viên ${user.name}?`)) {
                              onDeleteUser(user.id);
                            }
                          }}
                          className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination ribbon */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Hiển thị 1 - {filteredUsers.length} của {users.length} người dùng</span>
          
          <div className="flex items-center gap-2">
            <button className="p-1 px-2 rounded hover:bg-slate-200 flex items-center gap-0.5 cursor-pointer border border-slate-200">
              <ChevronLeft className="w-3.5 h-3.5" /> Trước
            </button>
            <span className="bg-primary text-white p-1 px-2.5 rounded text-xs select-none">1</span>
            <span className="p-1 px-2.5 hover:bg-slate-200 rounded cursor-pointer">2</span>
            <span className="p-1 px-2.5 hover:bg-slate-200 rounded cursor-pointer">3</span>
            <button className="p-1 px-2 rounded hover:bg-slate-200 flex items-center gap-0.5 cursor-pointer border border-slate-200">
              Sau <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
