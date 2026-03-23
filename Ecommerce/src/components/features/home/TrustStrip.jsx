import React from 'react';
import { TRUST_ITEMS } from '../../../data/config';

function TrustItem({ item }) {
  return (
    <div className="group bg-white border border-slate-100 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-default">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110
        ${item.id === 'delivery' ? 'bg-sky-50' :
          item.id === 'returns'  ? 'bg-purple-50' :
          item.id === 'secure'   ? 'bg-emerald-50' :
                                   'bg-amber-50'}`}>
        <span className="text-2xl">{item.icon}</span>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900 leading-tight">{item.title}</p>
        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.subtitle}</p>
      </div>
      <svg className="w-3.5 h-3.5 text-slate-300 ml-auto shrink-0 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {TRUST_ITEMS.map(item => <TrustItem key={item.id} item={item} />)}
    </div>
  );
}