import React from 'react';

export default function AuthCard({ icon, title, subtitle, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 px-3 py-3 overflow-hidden">
      <div className="w-full max-w-[430px] h-full max-h-[100dvh] flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-modal overflow-hidden animate-scale-in max-h-[94dvh] flex flex-col">
          <div className="h-1.5 bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600 shrink-0" />

          <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 sm:py-6">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                {icon}
              </div>
            </div>

            <div className="text-center mb-5">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1.5">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">{subtitle}</p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}