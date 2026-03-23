/**
 * components/features/product/ProductCard.jsx
 * Grid card: image + badge + name + rating + price + add-to-cart.
 */

import React, { useState } from 'react';
import { useApp } from '../../../store';
import { useCartActions } from '../../../hooks';
import BadgePill from '../../ui/BadgePill';
import StarRating from '../../ui/StarRating';
import { PricingDisplay } from '../../ui/shared';

// ── WishlistButton ────────────────────────────────────────────
function WishlistButton({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full
        bg-white/90 shadow-sm border border-white
        flex items-center justify-center text-sm
        hover:scale-110 transition-transform duration-200
      `}
    >
      {active ? '❤️' : '🤍'}
    </button>
  );
}

// ── DiscountTag ───────────────────────────────────────────────
function DiscountTag({ price, originalPrice }) {
  const pct = Math.round((1 - price / originalPrice) * 100);
  if (pct <= 0) return null;
  return (
    <span className="absolute bottom-2.5 right-2.5 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
      -{pct}%
    </span>
  );
}

// ── ProductCard ───────────────────────────────────────────────
export default function ProductCard({ product }) {
  const { wishlist, cart, navigate, toggleWishlist } = useApp();
  const { handleAddToCart } = useCartActions();
  const [imgHovered, setImgHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const inCart  = cart.some(i => i.id === product.id);
  const inWish  = wishlist.includes(product.id);

  return (
    <div className="card-lift bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-card flex flex-col animate-fade-up">
      {/* Image area */}
      <div className="relative">
        <div
          onClick={() => navigate('product', product)}
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
          className={`
            relative h-48 bg-gradient-to-br ${product.bgFrom} ${product.bgTo}
            flex items-center justify-center cursor-pointer overflow-hidden
          `}
        >
           <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{ transform: imgHovered ? 'scale(1.08)' : 'scale(1)' }}
                    onError={e => {
                      // fallback to a placeholder if image fails
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                  
          {/* Radial accent glow */}
          <div className="absolute inset-0 bg-radial-glow opacity-30" />
          <span
            className="text-[76px] relative z-10 drop-shadow-lg select-none transition-transform duration-300"
            style={{ transform: imgHovered ? 'scale(1.12) rotate(-3deg)' : 'scale(1)' }}
          >
            {product.emoji}
          </span>
          <DiscountTag price={product.price} originalPrice={product.originalPrice} />
        </div>

        {/* Badge top-left */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <BadgePill text={product.badge} />
        </div>

        {/* Wishlist top-right */}
        <WishlistButton
          active={inWish}
          onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
        />
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Category label */}
        <span className={`text-[10px] font-bold uppercase tracking-widest ${product.accentText}`}>
          {product.category}
        </span>

        {/* Name — clickable */}
        <div
          onClick={() => navigate('product', product)}
          className="cursor-pointer group"
        >
          <p className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-sky-600 transition-colors">
            {product.name}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">{product.subtitle}</p>
        </div>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <PricingDisplay price={product.price} originalPrice={product.originalPrice} />

        {/* Add to cart */}
        <div className="mt-auto pt-3">
          <button
            onClick={() => handleAddToCart(product)}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            className={`
              w-full py-2.5 rounded-xl text-xs font-bold tracking-wide
              border transition-all duration-200 flex items-center justify-center gap-1.5
              ${inCart
                ? 'bg-slate-900 text-white border-slate-900'
                : btnHovered
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400'}
            `}
          >
            {inCart ? (
              <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> In Cart</>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
