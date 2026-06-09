/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenId, UserProfile, SavedAnswer } from './types';
import { INITIAL_PROFILE, DEFAULT_SAVED_ANSWERS } from './data';

import LoginScreen from './components/LoginScreen';
import PassRecoveryScreen from './components/PassRecoveryScreen';
import AiRetrievalScreen from './components/AiRetrievalScreen';
import ClassifyScreen from './components/ClassifyScreen';
import AllDocumentsScreen from './components/AllDocumentsScreen';
import SavedAnswersScreen from './components/SavedAnswersScreen';
import SettingsScreen from './components/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('login');
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward' | 'none'>('forward');
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [savedAnswers, setSavedAnswers] = useState<SavedAnswer[]>(DEFAULT_SAVED_ANSWERS);

  const handleNavigate = (targetScreen: ScreenId, transition?: 'none' | 'push' | 'push_back') => {
    if (transition === 'none') {
      setTransitionDirection('none');
    } else if (transition === 'push_back') {
      setTransitionDirection('backward');
    } else {
      setTransitionDirection('forward');
    }
    setCurrentScreen(targetScreen);
  };

  const handleSaveAnswer = (answer: SavedAnswer) => {
    // Prevent duplicate saves
    if (savedAnswers.some((ans) => ans.id === answer.id)) return;
    setSavedAnswers((prev) => [answer, ...prev]);
  };

  const handleDeleteAnswer = (id: string) => {
    setSavedAnswers((prev) => prev.filter((ans) => ans.id !== id));
  };

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  // Switch renderer returning screen elements
  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onNavigate={handleNavigate} />;
      case 'pass-recovery':
        return <PassRecoveryScreen onNavigate={handleNavigate} />;
      case 'ai-retrieval':
        return (
          <AiRetrievalScreen
            profile={profile}
            savedAnswers={savedAnswers}
            onSaveAnswer={handleSaveAnswer}
            onNavigate={handleNavigate}
          />
        );
      case 'classify':
        return <ClassifyScreen profile={profile} onNavigate={handleNavigate} />;
      case 'all-documents':
        return <AllDocumentsScreen profile={profile} onNavigate={handleNavigate} />;
      case 'saved-answers':
        return (
          <SavedAnswersScreen
            profile={profile}
            savedAnswers={savedAnswers}
            onDeleteAnswer={handleDeleteAnswer}
            onNavigate={handleNavigate}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <LoginScreen onNavigate={handleNavigate} />;
    }
  };

  // Generate CSS animation settings depending on navigate transition requests
  const getVariants = () => {
    if (transitionDirection === 'none') {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      };
    }

    const forwardVariants = {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -60 },
    };

    const backwardVariants = {
      initial: { opacity: 0, x: -60 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 60 },
    };

    return transitionDirection === 'forward' ? forwardVariants : backwardVariants;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fd] text-[#191c1f] font-sans antialiased overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={getVariants()}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="min-h-screen w-full relative"
        >
          {renderActiveScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
