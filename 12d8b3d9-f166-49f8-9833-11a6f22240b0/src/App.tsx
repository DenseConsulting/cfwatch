import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SignUpModal } from './components/SignUpModal';
import { SignInModal } from './components/SignInModal';
import { LoadingSpinner } from './components/LoadingSpinner';
// Lazy load pages for better initial load performance
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({
  default: module.HomePage
})));
const SearchSeizuresPage = lazy(() => import('./pages/SearchSeizuresPage').then(module => ({
  default: module.SearchSeizuresPage
})));
const FindAttorneyPage = lazy(() => import('./pages/FindAttorneyPage').then(module => ({
  default: module.FindAttorneyPage
})));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then(module => ({
  default: module.ResourcesPage
})));
const NoticesIndexPage = lazy(() => import('./pages/NoticesIndexPage').then(module => ({
  default: module.NoticesIndexPage
})));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({
  default: module.AboutPage
})));
// Lazy load non-critical widgets
const AiChatWidget = lazy(() => import('./components/AiChatWidget').then(module => ({
  default: module.AiChatWidget
})));
export function App() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    firstName: string;
    email: string;
  } | null>(null);
  const handleLogout = () => {
    setUserInfo(null);
    console.log('User logged out');
  };
  const handleSignupSuccess = (user: {
    firstName: string;
    email: string;
  }) => {
    setUserInfo(user);
    console.log('Signup successful:', user);
  };
  const handleSignInSuccess = (user: {
    firstName: string;
    email: string;
  }) => {
    setUserInfo(user);
    console.log('Sign in successful:', user);
  };
  return <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header onOpenSignUp={() => setIsSignUpModalOpen(true)} onOpenSignIn={() => setIsSignInModalOpen(true)} userInfo={userInfo} onLogout={handleLogout} />

        <Suspense fallback={<div className="flex-1 flex items-center justify-center min-h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-navy)]"></div>
            </div>}>
          <Routes>
            <Route path="/" element={<HomePage onOpenSignUp={() => setIsSignUpModalOpen(true)} onOpenSignIn={() => setIsSignInModalOpen(true)} userInfo={userInfo} />} />
            <Route path="/notices" element={<NoticesIndexPage userInfo={userInfo} onLogout={handleLogout} onOpenSignUp={() => setIsSignUpModalOpen(true)} onOpenSignIn={() => setIsSignInModalOpen(true)} />} />
            <Route path="/attorneys" element={<FindAttorneyPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>

        <Footer />

        <Suspense fallback={null}>
          <AiChatWidget />
        </Suspense>

        <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} onSignupSuccess={handleSignupSuccess} />
        <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} onSignInSuccess={handleSignInSuccess} onSwitchToSignUp={() => {
        setIsSignInModalOpen(false);
        setIsSignUpModalOpen(true);
      }} />
      </div>
    </BrowserRouter>;
}