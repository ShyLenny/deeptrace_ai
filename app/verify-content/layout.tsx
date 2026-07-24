import React from 'react';
import { Sidebar } from '@/components/verify-content/sidebar';

export default function VerifyContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Assuming a global header exists. We are just dealing with this page layout. */}
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
