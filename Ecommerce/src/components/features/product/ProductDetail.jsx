import React from 'react';
import { useApp } from '../../../store';
import { useRelatedProducts } from '../../../hooks';

import ProductCard from './ProductCard';
import ProductGallery from './ProductGallery';
import ProductInfo from './productInfo';

export default function ProductDetail() {
  const { selectedProduct: p, navigate, setCategory } = useApp();
  const related = useRelatedProducts(p);

  if (!p) {
    navigate('home');
    return null;
  }

  const crumbs = [
    { label: 'Home', onClick: () => navigate('home') },
    {
      label: p.category,
      onClick: () => {
        setCategory(p.category);
        navigate('home');
      },
    },
    { label: p.name, onClick: null },
  ];

  return (
    <div className="flex flex-col gap-10 animate-scale-in">
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        {crumbs.map((c, i) => (
          <span key={c.label} className="flex items-center gap-2">
            {i > 0 && (
              <svg
                className="w-3 h-3 text-slate-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}

            {c.onClick ? (
              <button
                onClick={c.onClick}
                className="font-semibold text-sky-500 hover:text-slate-900 transition-colors"
              >
                {c.label}
              </button>
            ) : (
              <span className="text-slate-500">{c.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-8 md:p-10 grid md:grid-cols-2 gap-10">
        <ProductGallery product={p} />
        <ProductInfo p={p} />
      </div>

      {related.length > 0 && (
        <div>
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-5 tracking-tight">
            You might also like
          </h3>
          <div className="stagger grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}