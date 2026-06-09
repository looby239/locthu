import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, User, DocumentItem, QueryLog } from './types';
import { INITIAL_USERS, INITIAL_DOCUMENTS, INITIAL_QUERY_LOGS } from './data';

// Component imports
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import UserManagementView from './components/UserManagementView';
import LoginScreen from './components/LoginScreen';
import PassRecoveryScreen from './components/PassRecoveryScreen';
import DocumentHubView from './components/DocumentHubView';
import EditUserView from './components/EditUserView';
import AddUserView from './components/AddUserView';
import QueryStatsView from './components/QueryStatsView';
import CategoriesView from './components/CategoriesView';
import EditDocumentView from './components/EditDocumentView';
import UploadDocumentView from './components/UploadDocumentView';

export default function App() {
  // Screens navigation routing
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [transitionType, setTransitionType] = useState<'slide_up' | 'push_back' | 'none'>('none');

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');

  // Active resource selection index references
  const [selectedUserId, setSelectedUserId] = useState<string>('1');
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-1');

  // Local storage state initialization
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('dmrs_users_state');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('dmrs_documents_state');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [queryLogs, setQueryLogs] = useState<QueryLog[]>(() => {
    const saved = localStorage.getItem('dmrs_logs_state');
    return saved ? JSON.parse(saved) : INITIAL_QUERY_LOGS;
  });

  // Persist storage updates to prevent loss during testing refreshes
  useEffect(() => {
    localStorage.setItem('dmrs_users_state', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('dmrs_documents_state', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('dmrs_logs_state', JSON.stringify(queryLogs));
  }, [queryLogs]);

  // Unified callback to trigger navigation with transition mapping
  const handleNavigate = (
    screen: Screen, 
    transition: 'slide_up' | 'push_back' | 'none' = 'none'
  ) => {
    setTransitionType(transition);
    setCurrentScreen(screen);
  };

  // CRUD operation callbacks
  const handleAddUser = (newUser: User) => {
    setUsers([newUser, ...users]);
    // Log query logs metadata for transparency
    const newLog: QueryLog = {
      id: 'ql-' + Math.random().toString(),
      queryText: `Thêm nhân viên mới: ${newUser.name} [MS:${newUser.staffId}]`,
      user: 'ttb.admin@univ.edu.vn',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      ipAddress: '192.168.1.2',
      responseTimeMs: 44,
      status: 'success',
      resultCount: 1
    };
    setQueryLogs([newLog, ...queryLogs]);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setQueryLogs([
      {
        id: 'ql-' + Math.random().toString(),
        queryText: `Cập nhật hồ sơ thành viên: ${updatedUser.name}`,
        user: 'ttb.admin@univ.edu.vn',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        ipAddress: '192.168.1.2',
        responseTimeMs: 38,
        status: 'success',
        resultCount: 1
      },
      ...queryLogs
    ]);
  };

  const handleDeleteUser = (id: string) => {
    const deletedUser = users.find(u => u.id === id);
    setUsers(users.filter(u => u.id !== id));
    if (deletedUser) {
      setQueryLogs([
        {
          id: 'ql-' + Math.random().toString(),
          queryText: `Xóa thành viên hệ thống: ${deletedUser.name}`,
          user: 'ttb.admin@univ.edu.vn',
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          ipAddress: '192.168.1.2',
          responseTimeMs: 25,
          status: 'success',
          resultCount: 0
        },
        ...queryLogs
      ]);
    }
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments([newDoc, ...documents]);
    setQueryLogs([
      {
        id: 'ql-' + Math.random().toString(),
        queryText: `Xét duyệt xuất bản tài liệu mới: "${newDoc.title}"`,
        user: 'ttb.admin@univ.edu.vn',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        ipAddress: '192.168.1.102',
        responseTimeMs: 64,
        status: 'success',
        resultCount: 1
      },
      ...queryLogs
    ]);
  };

  const handleUpdateDocument = (updatedDoc: DocumentItem) => {
    setDocuments(documents.map(d => d.id === updatedDoc.id ? updatedDoc : d));
    setQueryLogs([
      {
        id: 'ql-' + Math.random().toString(),
        queryText: `Hiệu chỉnh tài liệu học thuật: "${updatedDoc.title}"`,
        user: 'ttb.admin@univ.edu.vn',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        ipAddress: '192.168.1.102',
        responseTimeMs: 50,
        status: 'success',
        resultCount: 1
      },
      ...queryLogs
    ]);
  };

  const handleDeleteDocument = (id: string) => {
    const deletedDoc = documents.find(d => d.id === id);
    setDocuments(documents.filter(d => d.id !== id));
    if (deletedDoc) {
      setQueryLogs([
        {
          id: 'ql-' + Math.random().toString(),
          queryText: `Gỡ bỏ vĩnh viễn tài liệu: "${deletedDoc.title}"`,
          user: 'ttb.admin@univ.edu.vn',
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          ipAddress: '192.168.1.2',
          responseTimeMs: 31,
          status: 'success',
          resultCount: 0
        },
        ...queryLogs
      ]);
    }
  };

  // Switch animation variants maps to requested specs
  const getMotionVariants = () => {
    if (transitionType === 'slide_up') {
      return {
        initial: { y: '50px', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '50px', opacity: 0 },
        transition: { type: 'spring', damping: 22, stiffness: 150 }
      };
    }
    if (transitionType === 'push_back') {
      return {
        initial: { scale: 0.96, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.04, opacity: 0 },
        transition: { duration: 0.25, ease: 'easeInOut' }
      };
    }
    // standard or fallback 'none' fade-in transition
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 }
    };
  };

  // Rendering screen body block
  const renderScreenContent = () => {
    switch (currentScreen) {
      case Screen.DASHBOARD:
        return (
          <DashboardView 
            documents={documents}
            users={users}
            onNavigate={handleNavigate}
            setSelectedDocId={setSelectedDocId}
          />
        );
      case Screen.USER_MANAGEMENT:
        return (
          <UserManagementView 
            users={users}
            onNavigate={handleNavigate}
            setSelectedUserId={setSelectedUserId}
            onDeleteUser={handleDeleteUser}
          />
        );
      case Screen.DOCUMENT_HUB:
        return (
          <DocumentHubView 
            documents={documents}
            onNavigate={handleNavigate}
            setSelectedDocId={setSelectedDocId}
            onDeleteDocument={handleDeleteDocument}
          />
        );
      case Screen.EDIT_USER:
        return (
          <EditUserView 
            userId={selectedUserId}
            users={users}
            onNavigate={handleNavigate}
            onUpdateUser={handleUpdateUser}
          />
        );
      case Screen.ADD_USER:
        return (
          <AddUserView 
            onNavigate={handleNavigate}
            onAddUser={handleAddUser}
          />
        );
      case Screen.QUERY_STATS:
        return (
          <QueryStatsView 
            queryLogs={queryLogs}
            onNavigate={handleNavigate}
          />
        );
      case Screen.CATEGORIES:
        return (
          <CategoriesView 
            documents={documents}
            onNavigate={handleNavigate}
          />
        );
      case Screen.EDIT_DOCUMENT:
        return (
          <EditDocumentView 
            docId={selectedDocId}
            documents={documents}
            onNavigate={handleNavigate}
            onUpdateDocument={handleUpdateDocument}
          />
        );
      case Screen.UPLOAD_DOCUMENT:
        return (
          <UploadDocumentView 
            onNavigate={handleNavigate}
            onAddDocument={handleAddDocument}
          />
        );
      case Screen.LOGIN:
        return <LoginScreen onNavigate={handleNavigate} />;
      case Screen.PASS_RECOVERY:
        return <PassRecoveryScreen onNavigate={handleNavigate} />;
      default:
        return (
          <DashboardView 
            documents={documents}
            users={users}
            onNavigate={handleNavigate}
            setSelectedDocId={setSelectedDocId}
          />
        );
    }
  };

  const isInitialScreen = currentScreen === Screen.LOGIN || currentScreen === Screen.PASS_RECOVERY;

  // Render Master Scaffold container
  return (
    <div className="min-h-screen bg-surface text-on-surface select-none">
      {isInitialScreen ? (
        <div id="initial_portal_wrapper">
          {renderScreenContent()}
        </div>
      ) : (
        <div className="flex font-sans" id="dmrs_admin_workspace">
          {/* Persistent high-trust left panel */}
          <Sidebar 
            currentScreen={currentScreen} 
            onNavigate={handleNavigate} 
          />

          {/* Fluid content container */}
          <div className="ml-[280px] min-h-screen flex flex-col flex-grow bg-surface">
            {/* Common top bar navigation searches */}
            <Header 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onNavigate={handleNavigate}
              currentScreen={currentScreen}
            />

            {/* Dynamic visual viewport area with requested transitions */}
            <main className="p-8 max-w-[1240px] mx-auto w-full flex-grow pb-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen}
                  {...getMotionVariants()}
                  className="w-full h-full"
                >
                  {renderScreenContent()}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
