import React from 'react';
import { AppProvider, useApp } from './AppContext';
import { LoginScreen } from './components/LoginScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { RepoScreen } from './components/RepoScreen';
import { EditDocScreen } from './components/EditDocScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ChatScreen } from './components/ChatScreen';
import { UploadDocScreen } from './components/UploadDocScreen';
import { motion, AnimatePresence } from 'motion/react';

function NavigationRouter() {
  const { currentScreen, transitionType } = useApp();

  const getTransitionVariants = () => {
    switch (transitionType) {
      case 'slide_up':
        return {
          initial: { opacity: 0, y: '30px' },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: '30px' },
          transition: { duration: 0.35, ease: 'easeOut' },
        };
      case 'push':
        return {
          initial: { opacity: 0, x: '40px' },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: '-40px' },
          transition: { duration: 0.25, ease: 'easeInOut' },
        };
      case 'push_back':
        return {
          initial: { opacity: 0, x: '-40px' },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: '40px' },
          transition: { duration: 0.25, ease: 'easeInOut' },
        };
      case 'none':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.15 },
        };
    }
  };

  const currentVariants = getTransitionVariants();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'forgot_password':
        return <ForgotPasswordScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'repository':
        return <RepoScreen />;
      case 'edit_document':
        return <EditDocScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'chat_ai':
        return <ChatScreen />;
      case 'upload_document':
        return <UploadDocScreen />;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        initial={currentVariants.initial}
        animate={currentVariants.animate}
        exit={currentVariants.exit}
        transition={currentVariants.transition}
        className="w-full min-h-screen"
      >
        {renderActiveScreen()}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationRouter />
    </AppProvider>
  );
}
