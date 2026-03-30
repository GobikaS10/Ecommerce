import React, { useState } from 'react';
import { useApp } from '../../../store';
import { useCartActions } from '../../../hooks';

import BadgePill from '../../ui/BadgePill';
import StarRating from '../../ui/StarRating';
import QuantityStepper from '../../ui/QuantityStepper';
import { StockBadge } from '../../ui/shared.jsx';
import { PRODUCT_PERKS } from '../../../data/config';

export default function ProductInfo({ p }) {
  const { wishlist, cart, navigate, toggleWishlist, location } = useApp();
  const { handleAddToCart, handleBuyNow } = useCartActions();
  const [qty, setQty] = useState(1);

  const inCart = cart.some((i) => i.id === p.id);
  const inWish = wishlist.includes(p.id);
  const disc = Math.round((1 - p.price / p.originalPrice) * 100);

  const getDeliveryDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2.5">
        <BadgePill text={p.badge} />
        <span className={`text-[10px] font-bold uppercase tracking-widest ${p.accentText}`}>
          {p.category}
        </span>
      </div>

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

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
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

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-semibold text-sky-500 hover:text-sky-700 transition-colors"
          >
            Change
          </button>
        </div>

        <div className="border-t border-slate-200" />

        <div className="flex flex-col gap-2.5">
          <div className="flex items-start gap-2.5">
            <svg
              className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <path d="M16 8h4l3 3v5h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>

            <div className="flex-1">
              <p className="text-xs font-bold text-slate-800">
                Free delivery
                <span className="text-emerald-600 ml-1.5">by {getDeliveryDate()}</span>
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                {p.price >= 499
                  ? 'Free delivery on this order'
                  : `Add ₹${499 - p.price} more for free delivery`}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>

            <div className="flex-1">
              <p className="text-xs font-bold text-slate-800">
                Express delivery
                <span className="text-slate-500 font-medium ml-1.5">₹49</span>
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Get it today by 9 PM</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <p className="text-xs font-bold text-slate-800">
              Cash on delivery
              <span className="text-emerald-600 font-medium ml-1.5">available</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <QuantityStepper value={qty} onChange={setQty} />

        <button
          onClick={() => (inCart ? navigate('cart') : handleAddToCart(p, qty))}
          className={`flex-1 py-3.5 rounded-2xl text-sm font-black tracking-wide
            flex items-center justify-center gap-2
            transition-all duration-200 active:scale-95
            ${
              inCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-900 hover:bg-slate-700 text-white shadow-sm hover:shadow-md'
            }`}
        >
          {inCart ? (
            <>
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Go to Cart
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Add to Cart
            </>
          )}
        </button>

        <button
          onClick={() => toggleWishlist(p.id)}
          className={`w-14 py-3.5 rounded-2xl border-2 flex items-center justify-center text-xl shrink-0
            transition-all duration-200 hover:scale-105 active:scale-95
            ${
              inWish
                ? 'border-red-300 bg-red-50'
                : 'border-slate-200 bg-white hover:border-red-300 hover:bg-red-50'
            }`}
        >
          {inWish ? '❤️' : '🤍'}
        </button>
      </div>

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
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        Buy Now — ₹{p.price}
      </button>

      <div className="grid grid-cols-2 gap-2">
        {PRODUCT_PERKS.map((perk) => (
          <div
            key={perk.id}
            className="flex items-center gap-2.5 bg-slate-50 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 font-medium"
          >
            <span className="text-base shrink-0">{perk.icon}</span>
            {perk.label}
          </div>
        ))}
      </div>
    </div>
  );
}