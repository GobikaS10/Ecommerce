/**
 * components/layout/Footer.jsx
 */

import React from 'react';
import { FOOTER_COLUMNS, LEGAL_LINKS, COPYRIGHT, SOCIAL_LINKS } from '../../data/config';

function FooterLink({ label }) {
  return (
    <li>
      <button className="text-sm text-slate-400 hover:text-slate-800 transition-colors text-left">
        {label}
      </button>
    </li>
  );
}

function SocialButton({ item }) {
  return (
    <a
      href={item.href}
      aria-label={item.label}
      className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-sm transition-colors"
    >
      {item.emoji}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-100">
      {/* Main grid */}
      <div className="max-w-[1280px] mx-auto px-7 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-base">⚡</span>
            </div>
            <span className="font-display text-lg font-bold text-slate-900 tracking-tight">ShopX</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-[180px] mb-5">
            Your premium destination for curated products across electronics, fashion, home & more.
          </p>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map(sl => <SocialButton key={sl.id} item={sl} />)}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map(col => (
          <div key={col.heading}>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
              {col.heading}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map(l => <FooterLink key={l} label={l} />)}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal bar */}
      <div className="border-t border-slate-100">
        <div className="max-w-[1280px] mx-auto px-7 py-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-400">{COPYRIGHT}</p>
          <div className="flex gap-5">
            {LEGAL_LINKS.map(l => (
              <button key={l} className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span>💳</span>
            <span>🔒</span>
            <span>🛡️</span>
            <span>Secured & trusted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
