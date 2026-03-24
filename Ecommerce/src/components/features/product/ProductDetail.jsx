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

// ── ImagePanel ────────────────────────────────────────────────
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
        {disc > 0 && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg tracking-wider">
            -{disc}% OFF
          </span>
        )}
        <span className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1.5 rounded-full pointer-events-none">
          {zoomed ? '🔍 Click to zoom out' : '🔍 Click to zoom in'}
        </span>
      </div>

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

// ── DeliveryBlock ─────────────────────────────────────────────
function DeliveryBlock({ price }) {
  const { location } = useApp();

  const getDeliveryDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">

      {/* Deliver to row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
              Deliver to
            </p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              {location.city}
              {location.pin && (
                <span className="text-slate-400 font-medium"> — {location.pin}</span>
              )}
            </p>
          </div>
        </div>
        {/* Change — scrolls to top so user can use navbar location picker */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs font-semibold text-sky-500 hover:text-sky-700 transition-colors"
        >
          Change
        </button>
      </div>

      <div className="border-t border-slate-200" />

      {/* Delivery options */}
      <div className="flex flex-col gap-2.5">

        {/* Free delivery */}
        <div className="flex items-start gap-2.5">
          <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="1" y="3" width="15" height="13" rx="1"/>
            <path d="M16 8h4l3 3v5h-7V8z"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-800">
              Free delivery
              <span className="text-emerald-600 ml-1.5">by {getDeliveryDate()}</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
              {price >= 499
                ? 'Free delivery on this order'
                : `Add ₹${499 - price} more for free delivery`}
            </p>
          </div>
        </div>

        {/* Express delivery */}
        <div className="flex items-start gap-2.5">
          <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-800">
              Express delivery
              <span className="text-slate-500 font-medium ml-1.5">₹49</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">Get it today by 9 PM</p>
          </div>
        </div>

        {/* Cash on delivery */}
        <div className="flex items-start gap-2.5">
          <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="2" y="5" width="20" height="14" rx="2"/>
            <line x1="2" y1="10" x2="22" y2="10"/>
          </svg>
          <p className="text-xs font-bold text-slate-800">
            Cash on delivery
            <span className="text-emerald-600 font-medium ml-1.5">available</span>
          </p>
        </div>

      </div>
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

        
          <p className="text-sm text-slate-600 leading-relaxed pt-5 border-t border-slate-100">
            {p.description}
          </p>

       
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

         
          <DeliveryBlock price={p.price} />

          {/* Qty + Add to Cart + Wishlist */}
          <div className="flex items-center gap-2">
            <QuantityStepper value={qty} onChange={setQty} />
            <button
                onClick={() => inCart ? navigate('cart') : handleAddToCart(p, qty)}
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
                          Go to Cart          
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

          {/* Buy Now */}
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

          {/* Perks */}
          <PerksList />
        </div>
      </div>

      {/* Related products */}
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