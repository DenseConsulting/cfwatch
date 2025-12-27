import React from 'react';
import { Hero } from '../components/Hero';
import { StatsCounter } from '../components/StatsCounter';
import { MapPreview } from '../components/MapPreview';
import { HowItWorks } from '../components/HowItWorks';
import { TrustIndicators } from '../components/TrustIndicators';
interface HomePageProps {
  onOpenSignUp: () => void;
  onOpenSignIn: () => void;
  userInfo?: {
    firstName: string;
    email: string;
  } | null;
}
export function HomePage({
  onOpenSignUp,
  onOpenSignIn,
  userInfo
}: HomePageProps) {
  return <main>
      <Hero onOpenSignUp={onOpenSignUp} />
      <StatsCounter />
      <MapPreview onOpenSignUp={onOpenSignUp} userInfo={userInfo} />
      <HowItWorks />
      <TrustIndicators />
    </main>;
}