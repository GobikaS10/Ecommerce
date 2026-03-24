/**
 * components/ui/EmptyState.jsx
 */
import React from "react";
import Button from "./Button";

export function EmptyState({ icon = "🔍", title, subtitle, action }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card py-20 px-10 text-center animate-scale-in">
      <div className="text-6xl mb-5">{icon}</div>
      <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-slate-500 mb-7 max-w-xs mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}

/**
 * components/ui/SectionHeader.jsx
 */
export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-1.5">{subtitle}</p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-slate-900 transition-colors"
        >
          {action.label} →
        </button>
      )}
    </div>
  );
}

/**
 * components/ui/Divider.jsx
 */
export function Divider({ className = "" }) {
  return <div className={`h-px bg-slate-100 ${className}`} />;
}

/**
 * components/ui/PricingDisplay.jsx
 */
export function PricingDisplay({ price, originalPrice, large = false }) {
  const discount = Math.round((1 - price / originalPrice) * 100);
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className={`font-black text-slate-900 ${large ? "text-4xl" : "text-xl"} leading-none`}
      >
        ₹{price}
      </span>
      <span className="text-sm text-slate-400 line-through">
        ₹{originalPrice}
      </span>
      {discount > 0 && (
        <span className="text-xs font-bold text-emerald-600">
          Save {discount}%
        </span>
      )}
    </div>
  );
}

/**
 * components/ui/StockBadge.jsx
 */
export function StockBadge({ inStock }) {
  return (
    <div
      className={`flex items-center gap-2 text-sm font-semibold ${inStock ? "text-emerald-600" : "text-red-500"}`}
    >
      <span
        className={`w-2 h-2 rounded-full inline-block ${inStock ? "bg-emerald-500" : "bg-red-500"}`}
      />
      {inStock ? "In stock — Free delivery over ₹49" : "Out of stock"}
    </div>
  );
}
