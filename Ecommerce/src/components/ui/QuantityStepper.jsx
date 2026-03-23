/**
 * components/ui/QuantityStepper.jsx
 */
import React from 'react';

export default function QuantityStepper({ value, onChange, min = 1, max, size = 'md' }) {
  const btnCls = size === 'sm'
    ? 'w-7 h-7 text-sm'
    : 'w-9 h-9 text-base';
  const valCls = size === 'sm'
    ? 'w-8 text-sm'
    : 'w-10 text-base';

  return (
    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden select-none">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`
          ${btnCls} flex items-center justify-center font-bold
          bg-slate-50 hover:bg-slate-100 text-slate-700
          border-r border-slate-200 transition-colors
          disabled:opacity-40 disabled:cursor-not-allowed
        `}
      >
        −
      </button>
      <span className={`${valCls} text-center font-bold text-slate-900 py-1`}>
        {value}
      </span>
      <button
        onClick={() => onChange(max ? Math.min(max, value + 1) : value + 1)}
        disabled={!!max && value >= max}
        className={`
          ${btnCls} flex items-center justify-center font-bold
          bg-slate-50 hover:bg-slate-100 text-slate-700
          border-l border-slate-200 transition-colors
          disabled:opacity-40 disabled:cursor-not-allowed
        `}
      >
        +
      </button>
    </div>
  );
}
