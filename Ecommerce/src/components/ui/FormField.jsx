/**
 * components/ui/FormField.jsx
 */
import React, { useState } from 'react';

export default function FormField({ label, type = 'text', value, onChange, onBlur, placeholder, icon, error }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {label}
        </label>
      )}
      <div className={`
        flex items-center bg-slate-50 border rounded-xl overflow-hidden
        transition-all duration-200
        ${error   ? 'border-red-300 ring-2 ring-red-100' :
          focused ? 'border-sky-400 ring-2 ring-sky-100 bg-white' :
                    'border-slate-200 hover:border-slate-300'}
      `}>
        {icon && (
          <span className={`pl-3.5 flex items-center transition-colors ${focused ? 'text-sky-500' : 'text-slate-400'}`}>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); onBlur?.(e); }}
          className={`
            flex-1 bg-transparent border-none text-sm text-slate-900
            placeholder-slate-400 py-3 outline-none
            ${icon ? 'pl-2.5 pr-3.5' : 'px-3.5'}
          `}
        />
      </div>
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-red-600 font-medium">
          <span>✕</span> {error}
        </p>
      )}
    </div>
  );
}
