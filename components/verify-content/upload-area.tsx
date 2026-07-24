'use client';

import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, X, FileImage, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface UploadAreaProps {
  onAnalyze: (file: File, context: string) => void;
  isAnalyzing: boolean;
}

export function UploadArea({ onAnalyze, isAnalyzing }: UploadAreaProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [context, setContext] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const validateAndSetFile = (file: File) => {
    setError(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10 MB limit.');
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze(selectedFile, context);
    }
  };

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Verify Content</h1>
        <p className="text-slate-500">Upload an image to verify its authenticity and context using Gemma 4.</p>
      </div>

      {!selectedFile ? (
        <div 
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 
            ${dragActive ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
            onChange={handleChange}
          />
          <div className="flex flex-col items-center justify-center space-y-4 cursor-pointer">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-700 font-medium text-lg">Click to upload or drag and drop</p>
              <p className="text-slate-500 text-sm mt-1">JPG, PNG, or WEBP (max 10 MB)</p>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <FileImage className="w-5 h-5 text-blue-500" />
              Image Selected
            </h3>
            <button 
              onClick={removeFile}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
              disabled={isAnalyzing}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/2 aspect-video bg-slate-100 rounded-lg overflow-hidden relative border border-slate-200">
              {previewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="object-contain w-full h-full"
                />
              )}
            </div>
            
            <div className="w-full sm:w-1/2 space-y-4 flex flex-col justify-center">
              <div>
                <p className="text-sm text-slate-500">File Name</p>
                <p className="font-medium text-slate-800 truncate">{selectedFile.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">File Size</p>
                <p className="font-medium text-slate-800">{formatSize(selectedFile.size)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <label htmlFor="context" className="block font-semibold text-slate-800 mb-2">
          Optional Context
        </label>
        <p className="text-sm text-slate-500 mb-4">
          Provide any claims or additional information associated with this image to help Gemma 4 verify them.
        </p>
        <textarea
          id="context"
          rows={3}
          className="w-full border border-slate-300 rounded-lg p-3 text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          placeholder='Example: "This image claims to show a flood in Kolkata today."'
          value={context}
          onChange={(e) => setContext(e.target.value)}
          disabled={isAnalyzing}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || isAnalyzing}
          className={`px-8 py-3 rounded-lg font-medium shadow-sm transition-all flex items-center justify-center gap-2 min-w-[200px]
            ${!selectedFile || isAnalyzing 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
            }`}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Analyze with Gemma 4'
          )}
        </button>
      </div>

      {!selectedFile && !isAnalyzing && (
        <div className="mt-16 text-center text-slate-400 flex flex-col items-center">
          <ImageIcon className="w-24 h-24 mb-4 text-slate-200" />
          <p>Upload an image to begin AI-powered verification.</p>
        </div>
      )}
    </div>
  );
}
