"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TourType, ONBOARDING_TOURS } from '../data/onboardingData';

interface OnboardingContextProps {
  isFirstLogin: boolean;
  hasCompletedGeneralTour: boolean;
  activeTour: TourType | null;
  currentStep: number;
  startTour: (tour: TourType) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  completeGeneralTour: () => void;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [hasCompletedGeneralTour, setHasCompletedGeneralTour] = useState(false);
  const [activeTour, setActiveTour] = useState<TourType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if the user has completed the general tour before
    const completed = localStorage.getItem('hasCompletedGeneralTour');
    if (completed === 'true') {
      setHasCompletedGeneralTour(true);
    } else {
      // If they haven't completed it, we consider it their first login
      setIsFirstLogin(true);
    }
  }, []);

  const startTour = React.useCallback((tour: TourType) => {
    setActiveTour(tour);
    setCurrentStep(0);
  }, []);

  const completeGeneralTour = React.useCallback(() => {
    setHasCompletedGeneralTour(true);
    setIsFirstLogin(false);
    setActiveTour(null);
    setCurrentStep(0);
    localStorage.setItem('hasCompletedGeneralTour', 'true');
  }, []);

  const skipTour = React.useCallback(() => {
    if (activeTour === 'general') {
      completeGeneralTour();
    } else {
      setActiveTour(null);
      setCurrentStep(0);
    }
  }, [activeTour, completeGeneralTour]);

  const nextStep = React.useCallback(() => {
    if (!activeTour) return;
    const tourData = ONBOARDING_TOURS[activeTour];
    if (currentStep < tourData.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Finished the tour
      if (activeTour === 'general') {
        completeGeneralTour();
      } else {
        skipTour(); // Close the tour
      }
    }
  }, [activeTour, currentStep, completeGeneralTour, skipTour]);

  const prevStep = React.useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  return (
    <OnboardingContext.Provider
      value={{
        isFirstLogin,
        hasCompletedGeneralTour,
        activeTour,
        currentStep,
        startTour,
        nextStep,
        prevStep,
        skipTour,
        completeGeneralTour,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
