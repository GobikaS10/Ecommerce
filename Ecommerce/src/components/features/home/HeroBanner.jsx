import React, { useState } from 'react';
import { BANNERS } from '../../../data/banners';
import { useAutoSlide } from '../../../hooks';
import { useApp } from '../../../store';

function BannerDots({ total, active, onSelect }) {
  return (
    <div className="absolute bottom-6 left-14 flex gap-2 z-10">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            height: '3px',
            width: i === active ? '32px' : '16px',
            borderRadius: '99px',
            background: i === active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.30)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}

function SlideCounter({ current, total }) {
  return (
    <div className="absolute bottom-6 right-6 z-10 text-[11px] font-bold text-white/50 tracking-widest">
      {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </div>
  );
}

export default function HeroBanner() {
  const { navigate } = useApp();
  const { index, goTo, pause, resume } = useAutoSlide(BANNERS.length, 5000);
  const [imgError, setImgError] = useState(false);
  const b = BANNERS[index];

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={resume}
      className="relative overflow-hidden rounded-2xl"
      style={{ minHeight: '440px' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        {b.image && !imgError ? (
          <img
            src={b.image}
            alt=""
            className="w-full h-full object-cover transition-all duration-700"
            style={{ transform: 'scale(1.03)' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-slate-900" />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full" style={{ minHeight: '440px' }}>
        <div className="flex-1 flex flex-col justify-center gap-5 px-14 py-16">

          {/* Tag pill */}
          <div className="w-fit">
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '6px 14px', borderRadius: '99px',
              background: b.tagColor, border: `1px solid ${b.tagBorder}`,
              color: b.tagText,
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: b.tagText, display: 'inline-block' }} />
              {b.tag}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.05,
            whiteSpace: 'pre-line',
            letterSpacing: '-0.03em',
            margin: 0,
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}>
            {b.title}
          </h1>

          {/* Subtitle */}
          <p style={{
            color: 'rgba(255,255,255,0.70)',
            fontSize: '14px',
            maxWidth: '400px',
            lineHeight: 1.75,
            margin: 0,
          }}>
            {b.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-1">
            <button
              onClick={() => navigate('home')}
              style={{
                background: b.accentColor,
                boxShadow: `0 8px 32px ${b.accentShadow}`,
                color: '#0F172A',
                fontWeight: 800,
                fontSize: '13px',
                padding: '14px 32px',
                borderRadius: '14px',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.03em',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${b.accentShadow}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 32px ${b.accentShadow}`; }}
            >
              {b.cta} →
            </button>

            <button
              onClick={() => navigate('home')}
              style={{
                background: 'rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.80)',
                fontWeight: 600,
                fontSize: '13px',
                padding: '14px 24px',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.20)',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = 'rgba(255,255,255,0.80)'; }}
            >
              Browse All
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-3">
            {[
              { value: '50K+', label: 'Products'   },
              { value: '2M+',  label: 'Customers'  },
              { value: '4.8★', label: 'Avg Rating' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', marginTop: '3px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Left vertical slide indicators */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2 pl-4">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: '3px',
              height: i === index ? '40px' : '16px',
              borderRadius: '99px',
              background: i === index ? b.accentColor : 'rgba(255,255,255,0.25)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      <BannerDots total={BANNERS.length} active={index} onSelect={goTo} />
      <SlideCounter current={index} total={BANNERS.length} />
    </div>
  );
}