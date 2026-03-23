import React, { useState } from 'react';
import { useApp } from '../../../store';
import { useCartActions, useRelatedProducts } from '../../../hooks';
import { PRODUCT_PERKS } from '../../../data/config';
import BadgePill from '../../ui/BadgePill';
import StarRating from '../../ui/StarRating';
import Button from '../../ui/Button';
import QuantityStepper from '../../ui/QuantityStepper';
import { PricingDisplay, StockBadge, Divider } from '../../ui/shared.jsx';
import ProductCard from './ProductCard';

// ── Breadcrumb ────────────────────────────────────────────────
function Breadcrumb({ crumbs }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-slate-400">
      {crumbs.map((c, i) => (
        <span key={c.label} className="flex items-center gap-2">
          {i > 0 && (
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          )}
          {c.onClick ? (
            <button onClick={c.onClick} className="font-semibold text-sky-500 hover:text-slate-900 transition-colors">
              {c.label}
            </button>
          ) : (
            <span className="text-slate-500">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ── ImagePanel — UPDATED with zoom + thumbnails + trust badges ─
function ImagePanel({ product }) {
  const [imgError,  setImgError]  = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed,    setZoomed]    = useState(false);
  const disc = Math.round((1 - product.price / product.originalPrice) * 100);

  const thumbParams = [
    '?w=600&h=600&fit=crop&auto=format',
    '?w=600&h=600&fit=crop&auto=format&crop=top',
    '?w=600&h=600&fit=crop&auto=format&crop=bottom',
    '?w=600&h=600&fit=crop&auto=format&crop=left',
  ];

  const hasImage = product.image && !imgError;
  const baseUrl  = hasImage ? product.image.split('?')[0] : '';

  return (
    <div className="flex flex-col gap-3">

      {/* Main image with zoom */}
      <div
        className="relative rounded-2xl overflow-hidden bg-slate-100 cursor-zoom-in"
        style={{ aspectRatio: '1 / 1' }}
        onClick={() => setZoomed(!zoomed)}
      >
        {hasImage ? (
          <img
            src={`${baseUrl}${thumbParams[activeIdx]}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ transform: zoomed ? 'scale(1.25)' : 'scale(1)' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${product.bgFrom} ${product.bgTo} flex items-center justify-center min-h-[380px]`}>
            <span className="text-[130px] select-none drop-shadow-xl">{product.emoji}</span>
          </div>
        )}

        {/* Discount badge */}
        {disc > 0 && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg tracking-wider">
            -{disc}% OFF
          </span>
        )}

        {/* Zoom hint */}
        <span className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1.5 rounded-full pointer-events-none">
          {zoomed ? '🔍 Click to zoom out' : '🔍 Click to zoom in'}
        </span>
      </div>

      {/* Thumbnails — only shown when real image exists */}
      {hasImage && (
        <div className="grid grid-cols-4 gap-2">
          {thumbParams.map((params, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200
                ${activeIdx === i
                  ? 'border-sky-500 shadow-md shadow-sky-100 scale-[1.03]'
                  : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400'}`}
              style={{ aspectRatio: '1/1' }}
            >
              <img src={`${baseUrl}${params}`} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
              {activeIdx === i && (
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-500" />
              )}
            </button>
          ))}
        </div>
      )}


    </div>
  );
}

// ── PerksList ─────────────────────────────────────────────────
function PerksList() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {PRODUCT_PERKS.map(perk => (
        <div key={perk.id} className="flex items-center gap-2.5 bg-slate-50 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 font-medium">
          <span className="text-base shrink-0">{perk.icon}</span>
          {perk.label}
        </div>
      ))}
    </div>
  );
}

// ── ProductDetail (composed) ──────────────────────────────────
export default function ProductDetail() {
  const { selectedProduct: p, wishlist, cart, navigate, setCategory, toggleWishlist } = useApp();
  const { handleAddToCart, handleBuyNow } = useCartActions();
  const [qty, setQty] = useState(1);
  const related = useRelatedProducts(p);

  if (!p) { navigate('home'); return null; }

  const inCart = cart.some(i => i.id === p.id);
  const inWish = wishlist.includes(p.id);
  const disc   = Math.round((1 - p.price / p.originalPrice) * 100);

  const crumbs = [
    { label: 'Home',      onClick: () => navigate('home') },
    { label: p.category,  onClick: () => { setCategory(p.category); navigate('home'); } },
    { label: p.name,      onClick: null },
  ];

  return (
    <div className="flex flex-col gap-10 animate-scale-in">
      <Breadcrumb crumbs={crumbs} />

      {/* Main panel */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-8 md:p-10 grid md:grid-cols-2 gap-10">

        {/* Left: image */}
        <ImagePanel product={p} />

        {/* Right: info */}
        <div className="flex flex-col gap-5">

          {/* Badge + category */}
          <div className="flex items-center gap-2.5">
            <BadgePill text={p.badge} />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${p.accentText}`}>
              {p.category}
            </span>
          </div>

          {/* Name */}
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-900 leading-tight tracking-tight">
              {p.name}
            </h1>
            <p className="text-sm text-slate-500 mt-1.5">{p.subtitle}</p>
          </div>

          <StarRating rating={p.rating} reviewCount={p.reviewCount} />

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed pt-5 border-t border-slate-100">
            {p.description}
          </p>

          {/* Pricing block */}
          <div className="flex items-end gap-4">
            <span className="text-4xl font-black text-slate-900 leading-none">₹{p.price}</span>
            <div className="pb-0.5">
              <p className="text-sm text-slate-400 line-through">₹{p.originalPrice}</p>
              <p className="text-xs font-bold text-emerald-600">
                You save ₹{p.originalPrice - p.price} ({disc}%)
              </p>
            </div>
          </div>

          <StockBadge inStock={p.inStock} />

          {/* Qty + Add to Cart + Wishlist — UPDATED */}
          <div className="flex items-center gap-2">
            <QuantityStepper value={qty} onChange={setQty} />
            <button
              onClick={() => handleAddToCart(p, qty)}
              className={`flex-1 py-3.5 rounded-2xl text-sm font-black tracking-wide
                flex items-center justify-center gap-2
                transition-all duration-200 active:scale-95
                ${inCart
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-700 text-white shadow-sm hover:shadow-md'}`}
            >
              {inCart ? (
                <>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Added to Cart
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
            <button
              onClick={() => toggleWishlist(p.id)}
              className={`w-14 py-3.5 rounded-2xl border-2 flex items-center justify-center text-xl shrink-0
                transition-all duration-200 hover:scale-105 active:scale-95
                ${inWish
                  ? 'border-red-300 bg-red-50'
                  : 'border-slate-200 bg-white hover:border-red-300 hover:bg-red-50'}`}
            >
              {inWish ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Buy Now — UPDATED */}
          <button
            onClick={() => handleBuyNow(p, qty)}
            className="w-full py-3.5 rounded-2xl text-sm font-black tracking-wide text-white
              bg-gradient-to-r from-sky-500 to-blue-600
              hover:from-sky-400 hover:to-blue-500
              flex items-center justify-center gap-2
              transition-all duration-200 active:scale-95
              shadow-lg shadow-sky-200"
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            Buy Now — ₹{p.price}
          </button>

          {/* Perks — unchanged */}
          <PerksList />
        </div>
      </div>

      {/* Related products — unchanged */}
      {related.length > 0 && (
        <div>
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-5 tracking-tight">
            You might also like
          </h3>
          <div className="stagger grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map(rp => <ProductCard key={rp.id} product={rp} />)}
          </div>
        </div>
      )}
    </div>
  );
}