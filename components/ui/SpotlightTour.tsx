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

    let animationFrameId: number;

    const updateRect = () => {
      const tourData = ONBOARDING_TOURS[activeTour];
      const step = tourData[currentStep];
      const element = document.getElementById(step.targetId);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        const padding = 8;
        
        setTargetRect(prev => {
          const next = {
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
          };
          if (!prev || 
              prev.top !== next.top || 
              prev.left !== next.left || 
              prev.width !== next.width || 
              prev.height !== next.height) {
            return next;
          }
          return prev;
        });
      } else {
        setTargetRect(null);
      }
      
      animationFrameId = requestAnimationFrame(updateRect);
    };

    updateRect();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
            className="absolute z-10 w-[340px] bg-card rounded-[2rem] shadow-2xl overflow-hidden border border-border/80 flex flex-col backdrop-blur-md"
            style={cardStyle}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-muted/20">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                {activeTour === 'general' ? 'Tour Inicial' : `Conhecendo ${activeTour}`}
              </span>
              <button 
                onClick={skipTour}
                className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-all active:scale-95"
                aria-label="Pular tour"
              >
                <X size={14} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5 flex-1">
              <h3 className="font-serif text-lg font-bold text-foreground mb-2 leading-tight">
                {stepInfo.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {stepInfo.text}
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-muted/10 flex items-center justify-between border-t border-border/50">
              {/* iOS-style Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentStep 
                        ? 'w-4.5 bg-primary' 
                        : 'w-1.5 bg-border'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all active:scale-95 border border-border"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-md shadow-primary/10 active:scale-98"
                >
                  {isLastStep ? (
                    <>
                      {stepInfo.finalActionLabel || 'Concluir'}
                      <Check size={14} />
                    </>
                  ) : (
                    <>
                      Próximo
                      <ChevronRight size={14} />
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
