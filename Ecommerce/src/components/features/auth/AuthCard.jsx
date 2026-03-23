import React from 'react';

export function AuthCard({ icon, title, subtitle, children }) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-[460px]">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-modal overflow-hidden animate-scale-in">
          <div className="h-1.5 bg-gradient-to-r from-slate-600 via-slate-900 to-slate-600" />

          <div className="p-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                {icon}
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight mb-2">
                {title}
              </h1>
              <p className="text-sm text-slate-400">{subtitle}</p>
            </div>

            {children}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-5">
          {[
            { icon: '🔒', text: 'SSL Secured' },
            { icon: '🛡️', text: 'Privacy Protected' },
            { icon: '✅', text: 'Verified Store' },
          ].map(t => (
            <div key={t.text} className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
              <span>{t.icon}</span>
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}