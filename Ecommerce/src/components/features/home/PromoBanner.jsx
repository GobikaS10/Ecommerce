import React from 'react';

export default function PromoBanner({
  onClick,
  title = 'Flash Sale — Up to 40% off Electronics!',
  subtitle = 'Limited time · Free shipping on all orders',
  ctaText = 'Shop now',
}) {
  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl cursor-pointer group sm:px-8 py-4 sm:py-5"
      style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>

          <div>
            <p className="text-white font-black text-sm tracking-tight">{title}</p>
            <p className="text-white/50 text-xs mt-0.5">{subtitle}</p>
          </div>
        </div>

        <span className="text-amber-400 text-xs font-bold tracking-wide flex items-center gap-1 shrink-0 group-hover:gap-2 transition-all">
          {ctaText}
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
}