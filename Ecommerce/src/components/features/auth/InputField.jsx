import React, { useState } from 'react';

export default function InputField({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  error,
  rightEl,
  extra,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {extra ? (
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {label}
          </label>
          {extra}
        </div>
      ) : (
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {label}
        </label>
      )}

      <div
        className={`flex items-center bg-slate-50 border rounded-2xl overflow-hidden transition-all duration-200 ${
          error
            ? 'border-red-300 ring-2 ring-red-100'
            : focused
            ? 'border-slate-400 ring-2 ring-slate-100 bg-white'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className="pl-4 text-slate-400 shrink-0">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 py-3.5 pl-3 pr-2 outline-none"
        />
        {rightEl && <span className="pr-3 shrink-0">{rightEl}</span>}
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}