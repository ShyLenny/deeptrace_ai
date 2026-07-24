import React from 'react';
import { Clock, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
  const verifications = [
    { id: 1, title: 'Verification #1', status: 'verified', date: '2 hours ago' },
    { id: 2, title: 'Verification #2', status: 'flagged', date: '5 hours ago' },
    { id: 3, title: 'Verification #3', status: 'pending', date: '1 day ago' },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50/50 min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-800 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          Recent Verifications
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {verifications.map((item) => (
          <Link 
            key={item.id} 
            href="#" 
            className="block p-3 rounded-md bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-sm text-slate-700 group-hover:text-slate-900">{item.title}</span>
              {item.status === 'verified' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
              {item.status === 'flagged' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
              {item.status === 'pending' && <Search className="w-4 h-4 text-slate-400" />}
            </div>
            <div className="text-xs text-slate-500">
              {item.date}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
