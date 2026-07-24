'use client';

import React, { useState } from 'react';
import { UploadArea } from '@/components/verify-content/upload-area';
import { ProcessingState } from '@/components/verify-content/processing-state';
import { ResultsReport } from '@/components/verify-content/results-report';

type PageState = 'upload' | 'processing' | 'results';

export default function VerifyContentPage() {
  const [pageState, setPageState] = useState<PageState>('upload');
  const [analyzedImage, setAnalyzedImage] = useState<File | null>(null);
  const [analysisContext, setAnalysisContext] = useState('');

  const handleAnalyze = (file: File, context: string) => {
    setAnalyzedImage(file);
    setAnalysisContext(context);
    setPageState('processing');
  };

  const handleAnalysisComplete = () => {
    setPageState('results');
  };

  const handleReset = () => {
    setPageState('upload');
    setAnalyzedImage(null);
    setAnalysisContext('');
  };

  return (
    <div className="max-w-5xl mx-auto">
      {pageState === 'upload' && (
        <UploadArea onAnalyze={handleAnalyze} isAnalyzing={false} />
      )}

      {pageState === 'processing' && (
        <ProcessingState onComplete={handleAnalysisComplete} />
      )}

      {pageState === 'results' && (
        <div className="space-y-6">
          <button 
            onClick={handleReset}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors flex items-center gap-1"
          >
            &larr; Verify another image
          </button>
          <ResultsReport imageFile={analyzedImage} context={analysisContext} />
        </div>
      )}
    </div>
  );
}
