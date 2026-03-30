import React from 'react';
import { CATEGORY_META } from '../../../data/config';

export default function CategoryCards({ active, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Object.entries(CATEGORY_META).map(([cat, meta]) => {
        const isActive = cat === active;

        return (
          <button
            key={cat}
            onClick={() => onSelect(isActive ? 'All' : cat)}
            className={`
              relative overflow-hidden rounded-2xl border-2 transition-all duration-300
              hover:-translate-y-1.5 hover:shadow-card-hover group text-left
              ${
                isActive
                  ? `${meta.activeColor} border-transparent shadow-lg scale-[1.02]`
                  : `bg-white ${meta.color} shadow-card`
              }
            `}
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={meta.image}
                alt={cat}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isActive
                    ? 'bg-black/40'
                    : 'bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/40'
                }`}
              />

              {isActive && (
                <div className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg
                    className="w-4 h-4 text-slate-900"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>

            <div className={`px-4 py-3 ${isActive ? 'bg-transparent' : 'bg-white'}`}>
              <p className={`font-black text-sm tracking-tight ${isActive ? 'text-white' : 'text-slate-900'}`}>
                {cat}
              </p>
              <p className={`text-[11px] mt-0.5 font-medium ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                {meta.count}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}