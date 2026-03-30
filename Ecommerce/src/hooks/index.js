/**
 * hooks/index.js
 * All reusable custom hooks.
 */

import { useState, useEffect, useCallback } from 'react';
import { CATEGORIES } from '../data/products';

import { FREE_SHIPPING_THRESHOLD, TAX_RATE, SHIPPING_COST } from '../data/config';
import { useApp } from '../store';

// ── useHover ──────────────────────────────────────────────────
export function useHover() {
  const [hovered, setHovered] = useState(false);
  return [hovered, {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }];
}

// ── useAutoSlide ──────────────────────────────────────────────
export function useAutoSlide(count, ms = 5000) {
  const [index,  setIndex]  = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(() => setIndex(i => (i + 1) % count), ms);
    return () => clearInterval(t);
  }, [count, ms, paused]);

  return {
    index,
    goTo:   useCallback(i => setIndex(i), []),
    pause:  useCallback(() => setPaused(true),  []),
    resume: useCallback(() => setPaused(false), []),
  };
}

// ── useFormField ──────────────────────────────────────────────
export function useFormField(initial = '', validator = null) {
  const [value,   setValue]   = useState(initial);
  const [error,   setError]   = useState('');
  const [touched, setTouched] = useState(false);

  const onChange = useCallback(e => {
    setValue(e.target.value);
    if (touched && validator) setError(validator(e.target.value) || '');
  }, [touched, validator]);

  const onBlur = useCallback(() => {
    setTouched(true);
    if (validator) setError(validator(value) || '');
  }, [value, validator]);

  const validate = useCallback(() => {
    if (!validator) return true;
    const err = validator(value);
    setError(err || '');
    setTouched(true);
    return !err;
  }, [value, validator]);

  const reset = useCallback(() => {
    setValue(initial); setError(''); setTouched(false);
  }, [initial]);

  return { value, error, onChange, onBlur, validate, reset, setValue, setError };
}

// ── useFilteredProducts ───────────────────────────────────────

export function useFilteredProducts(query, category) {
  const { products, sortBy, priceRange, badgeFilter } = useApp();

  let result = products.filter(p => {
    // Category filter
    const matchCat = category === 'All' || p.category === category;

    // Search filter — name, subtitle, tags
    const q = query.toLowerCase().trim();
    const matchQuery = !q
      || p.name.toLowerCase().includes(q)
      || p.subtitle.toLowerCase().includes(q)
      || p.tags.some(t => t.includes(q));

    // Price range filter
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

    // Badge filter (Sale, New chip buttons)
    const matchBadge = !badgeFilter || p.badge === badgeFilter;

    return matchCat && matchQuery && matchPrice && matchBadge;
  });

  // Sort
  switch (sortBy) {
    case 'price_asc':  result = [...result].sort((a, b) => a.price - b.price); break;
    case 'price_desc': result = [...result].sort((a, b) => b.price - a.price); break;
    case 'rating':     result = [...result].sort((a, b) => b.rating - a.rating); break;
    case 'newest':     result = [...result].sort((a, b) => b.reviewCount - a.reviewCount); break;
    default: break;
  }

  return result;
}
// ── useCartActions ────────────────────────────────────────────
export function useCartActions() {
  const { user, addToCart, updateCartQty, navigate, showToast, cart } = useApp();

  const handleAddToCart = useCallback((product, qty = 1) => {
    if (!user) { navigate('login'); return false; }

    const existing = cart.find(i => i.id === product.id);
    if (existing) {
    
      updateCartQty(product.id, existing.qty + qty);
    } else {
    
      addToCart(product);
      if (qty > 1) updateCartQty(product.id, qty);
    }

    showToast(`${product.name} added to cart`, 'success');
    return true;
  }, [user, addToCart, updateCartQty, navigate, showToast, cart]);

  const handleBuyNow = useCallback((product, qty = 1) => {
    if (handleAddToCart(product, qty)) navigate('cart');
  }, [handleAddToCart, navigate]);

  return { handleAddToCart, handleBuyNow };
}

// ── useOrderSummary ───────────────────────────────────────────
export function useOrderSummary(cart) {
  const subtotal              = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping              = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax                   = subtotal * TAX_RATE;
  const total                 = subtotal + shipping + tax;
  const freeShipRemaining     = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  return { subtotal, shipping, tax, total, freeShipRemaining };
}

// ── useRelatedProducts ────────────────────────────────────────
export function useRelatedProducts(product, limit = 4) {
  const { products } = useApp();         
  if (!product) return [];
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}