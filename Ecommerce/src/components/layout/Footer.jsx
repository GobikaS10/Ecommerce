import React from 'react';
import {
  FOOTER_COLUMNS,
  LEGAL_LINKS,
  COPYRIGHT,
  SOCIAL_LINKS,
} from '../../data/config';

function FooterLink({ label }) {
  return (
    <li>
      <button className="text-sm text-slate-400 hover:text-white transition">
        {label}
      </button>
    </li>
  );
}

function SocialButton({ item }) {
  return (
    <a
      href={item.href}
      className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700 hover:bg-slate-700 flex items-center justify-center transition"
    >
      {item.emoji}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 w-full bg-[#020617] text-white">
      
      {/* INNER CONTAINER (same as navbar) */}
      <div className="max-w-[1280px] mx-auto px-7 py-16">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-white text-slate-900 rounded-xl flex items-center justify-center">
                ⚡
              </div>
              <span className="text-lg font-bold">ShopX</span>
            </div>

            <p className="text-sm text-slate-400 mb-6 max-w-[240px]">
              Premium destination for electronics, fashion, and lifestyle products.
              Fast delivery. Secure checkout.
            </p>

            <div className="flex gap-3">
              {SOCIAL_LINKS.map((sl) => (
                <SocialButton key={sl.id} item={sl} />
              ))}
            </div>
          </div>

          {/* Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11px] uppercase text-slate-500 mb-5 tracking-widest">
                {col.heading}
              </h4>

              <ul className="space-y-3">
                {col.links.map((l) => (
                  <FooterLink key={l} label={l} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-[1280px] mx-auto px-7 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-xs text-slate-500">{COPYRIGHT}</p>

          <div className="flex gap-6 flex-wrap justify-center">
            {LEGAL_LINKS.map((l) => (
              <button key={l} className="text-xs text-slate-500 hover:text-white">
                {l}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            🔒 Secure Payments
          </div>
        </div>
      </div>
    </footer>
  );
}