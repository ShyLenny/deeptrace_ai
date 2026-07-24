'use client';

import React from 'react';
import { ShieldAlert, ShieldCheck, Search, Image as ImageIcon, ExternalLink, Link as LinkIcon, Info } from 'lucide-react';
import Image from 'next/image';

interface ResultsReportProps {
  imageFile: File | null;
  context: string;
}

export function ResultsReport({ imageFile, context }: ResultsReportProps) {
  const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;

  // Placeholder data representing a typical investigation report
  const isLikelyFake = false; // Toggle this for testing different states
  const confidenceScore = 92;

  return (
    <div className="w-full max-w-4xl mx-auto my-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Investigation Report</h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
          <span className="text-sm font-medium text-slate-600">Gemma 4 Verification ID:</span>
          <span className="text-sm font-mono text-slate-500">GV-8472-A9</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Main Verdict Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className={`p-6 border-b ${isLikelyFake ? 'bg-amber-50/50 border-amber-100' : 'bg-emerald-50/50 border-emerald-100'}`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${isLikelyFake ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {isLikelyFake ? <ShieldAlert className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isLikelyFake ? 'text-amber-900' : 'text-emerald-900'}`}>
                    {isLikelyFake ? 'Likely Manipulated or Miscontextualized' : 'Verified Authentic Context'}
                  </h3>
                  <p className={`mt-1 text-sm ${isLikelyFake ? 'text-amber-700' : 'text-emerald-700'}`}>
                    Our analysis indicates a {confidenceScore}% confidence that this image {isLikelyFake ? 'does not match the provided context or contains synthetic alterations' : 'is genuine and accurately represents the claimed event'}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-500" />
              Visual Analysis
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-slate-700 text-sm leading-relaxed">
                  The image exhibits natural lighting consistency across all subjects. Shadow directions align appropriately with the apparent light source. No obvious splicing artifacts, edge halos, or AI-generated anomalies (such as asymmetrical background details or distorted text) were detected.
                </p>
              </div>
              
              <div>
                <h5 className="font-medium text-slate-700 mb-2 text-sm">Detected Elements</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-600">Urban Environment</span>
                  <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-600">Water Accumulation</span>
                  <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-600">Public Transport</span>
                </div>
              </div>
            </div>
          </div>

          {/* Context Verification */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-500" />
              Contextual Verification
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-slate-500 mb-1">User Claim</h5>
                <blockquote className="pl-4 border-l-2 border-slate-300 text-slate-700 italic text-sm">
                  {context || "No context provided by the user."}
                </blockquote>
              </div>
              <div>
                <h5 className="text-sm font-medium text-slate-500 mb-1">Cross-Reference Results</h5>
                <p className="text-slate-700 text-sm leading-relaxed">
                  The visual markers in the image (storefronts, street signs, weather conditions) align with historical meteorological data for the specified region on this date. Reverse image search did not return earlier instances of this exact photo, suggesting it is a recent capture rather than recycled media.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Image Thumbnail */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-slate-500" />
              Analyzed Image
            </h4>
            <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative">
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="Analyzed content" className="w-full h-full object-cover" />
              )}
            </div>
            <p className="text-xs text-slate-500 mt-2 truncate text-center">
              {imageFile?.name}
            </p>
          </div>

          {/* Supporting Evidence Links */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-slate-500" />
              Supporting Evidence
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="group flex items-start gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">Local Weather Report</p>
                    <p className="text-xs text-slate-500">Meteorological Dept. Archive</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-start gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">News Coverage</p>
                    <p className="text-xs text-slate-500">Verified Press Agencies</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
