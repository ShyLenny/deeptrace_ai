'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Search, BrainCircuit, FileSearch, ShieldCheck } from 'lucide-react';

const steps = [
  { id: 'uploading', label: 'Uploading image...', icon: FileSearch },
  { id: 'preparing', label: 'Preparing analysis...', icon: Search },
  { id: 'analyzing', label: 'Gemma 4 analyzing visual content...', icon: BrainCircuit },
  { id: 'extracting', label: 'Extracting claims...', icon: FileSearch },
  { id: 'retrieving', label: 'Retrieving supporting evidence...', icon: Search },
  { id: 'generating', label: 'Generating investigation report...', icon: ShieldCheck },
];

interface ProcessingStateProps {
  onComplete: () => void;
}

export function ProcessingState({ onComplete }: ProcessingStateProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) {
      // Small delay before completing to let user see the final step checkmark
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }

    // Simulate progress sequence
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 1500 + Math.random() * 1000); // Random duration between 1.5s and 2.5s per step

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto my-12 bg-white border border-slate-200 rounded-xl shadow-sm p-8">
      <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">Analysis in Progress</h3>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isPending = index > currentStep;
          
          const Icon = step.icon;

          return (
            <div key={step.id} className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-300 ${isActive ? 'bg-blue-50/50 border border-blue-100' : 'border border-transparent'}`}>
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : isActive ? (
                  <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                ) : (
                  <Icon className="w-5 h-5 text-slate-300" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${isActive ? 'text-blue-700' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
