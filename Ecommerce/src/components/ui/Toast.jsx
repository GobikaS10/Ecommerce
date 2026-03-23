/**
 * components/ui/Toast.jsx
 * Fixed notification overlay.
 */
import React from 'react';

const TYPE_CLASSES = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error:   'bg-red-50   border-red-200   text-red-800',
  info:    'bg-blue-50  border-blue-200  text-blue-800',
};
const DOT_CLASSES = {
  success: 'bg-emerald-500',
  error:   'bg-red-500',
  info:    'bg-blue-500',
};

export default function Toast({ toast }) {
  if (!toast) return null;
  const cls    = TYPE_CLASSES[toast.type] || TYPE_CLASSES.info;
  const dotCls = DOT_CLASSES[toast.type]  || DOT_CLASSES.info;

  return (
    <div className={`
      fixed top-4 right-4 z-[9999] animate-slide-right
      flex items-center gap-3 px-4 py-3
      border rounded-xl shadow-modal text-sm font-semibold
      max-w-xs pointer-events-none ${cls}
    `}>
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotCls}`} />
      {toast.message}
    </div>
  );
}
