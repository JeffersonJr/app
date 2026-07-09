"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/lib/contexts/OnboardingContext';
import { ONBOARDING_TOURS } from '@/lib/data/onboardingData';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function SpotlightTour() {
  const { activeTour, currentStep, nextStep, prevStep, skipTour } = useOnboarding();
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);

  // Effect to handle auto-clicking an element before searching for the target
  useEffect(() => {
    if (!activeTour) return;
    const tourData = ONBOARDING_TOURS[activeTour];
    const step = tourData[currentStep];
    
    if (step.autoClickElementId) {
      const btn = document.getElementById(step.autoClickElementId);
      if (btn) {
        btn.click();
      }
    }
  }, [activeTour, currentStep]);

  useEffect(() => {
    if (!activeTour) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const tourData = ONBOARDING_TOURS[activeTour];
      const step = tourData[currentStep];
      const element = document.getElementById(step.targetId);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        // Add a small padding around the element
        const padding = 8;
        setTargetRect({
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        });
        
        // Scroll logic removed to prevent jumping during modal animations
      } else {
        // Fallback or retry if element is not immediately available
        setTargetRect(null);
        console.warn(`Tour target #${step.targetId} not found.`);
      }
    };

    updateRect();

    // Re-calculate on resize or scroll
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    // Track for 1.5s to follow animations (e.g. modals sliding up)
    const interval = setInterval(updateRect, 100);
    const timeout = setTimeout(() => clearInterval(interval), 1500);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [activeTour, currentStep]);

  if (!activeTour) return null;

  const tourData = ONBOARDING_TOURS[activeTour];
  const stepInfo = tourData[currentStep];
  const totalSteps = tourData.length;
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (stepInfo.clickOnNext) {
      const btn = document.getElementById(stepInfo.clickOnNext);
      if (btn) btn.click();
    }
    nextStep();
  };

  // Calculate card position
  // Default to center if target is not found yet
  let cardStyle: React.CSSProperties = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 32px)',
    maxWidth: '340px'
  };

  if (targetRect) {
    // Try to position below the target, or above if not enough space
    const spaceBelow = window.innerHeight - (targetRect.top + targetRect.height);
    const cardHeightEstimate = 200;

    if (spaceBelow > cardHeightEstimate) {
      cardStyle = {
        ...cardStyle,
        transform: 'none',
        top: Math.min(targetRect.top + targetRect.height + 16, window.innerHeight - cardHeightEstimate - 16),
        left: Math.max(16, Math.min(targetRect.left, window.innerWidth - 340 - 16)),
      };
    } else {
      cardStyle = {
        ...cardStyle,
        transform: 'none',
        top: 'auto',
        bottom: Math.min(window.innerHeight - targetRect.top + 16, window.innerHeight - cardHeightEstimate - 16),
        left: Math.max(16, Math.min(targetRect.left, window.innerWidth - 340 - 16)),
      };
    }
  }

  return (
    <AnimatePresence>
      {activeTour && (
        <div className="fixed inset-0 z-[9999] pointer-events-auto">
          {/* SVG Overlay for the spotlight effect */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="spotlight-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                {targetRect && (
                  <motion.rect
                    x={targetRect.left}
                    y={targetRect.top}
                    width={targetRect.width}
                    height={targetRect.height}
                    rx="8"
                    fill="black"
                    initial={false}
                    animate={{
                      x: targetRect.left,
                      y: targetRect.top,
                      width: targetRect.width,
                      height: targetRect.height,
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  />
                )}
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.7)"
              mask="url(#spotlight-mask)"
            />
          </svg>

          {/* Transparent click catcher to prevent interactions with elements outside the spotlight (if desired) 
              Actually, allowing clicks ONLY on the spotlight element requires pointer-events-none on the wrapper
              and pointer-events-auto on the cutout. But SVG mask doesn't handle pointer events that way easily.
              Instead, we can use a full-screen div that stops propagation, and the user must use the tour buttons.
          */}
          <div className="absolute inset-0" onClick={(e) => e.stopPropagation()} />

          {/* Dialog Card */}
          <motion.div
            className="absolute z-10 w-[320px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
            style={cardStyle}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
                {activeTour === 'general' ? 'Tour Inicial' : `Tour ${activeTour}`}
              </span>
              <button 
                onClick={skipTour}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Pular tour"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {stepInfo.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {stepInfo.text}
              </p>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-100">
              <div className="text-sm font-medium text-gray-500">
                {currentStep + 1} de {totalSteps}
              </div>
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  {isLastStep ? (
                    <>
                      {stepInfo.finalActionLabel || 'Concluir'}
                      <Check size={16} />
                    </>
                  ) : (
                    <>
                      Próximo
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
