import React from 'react';

export default function FilterBar({
  sortBy,
  setSort,
  priceRange,
  setPriceRange,
  badgeFilter,
  setBadge,
  count,
}) {
  const hasActive =
    sortBy !== 'default' ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 2000 ||
    badgeFilter !== '';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
      <div className="flex items-center bg-white border border-slate-200 rounded-[20px] overflow-hidden shadow-card h-[38px]">
        {/* Sort */}
        <div
          className={`flex items-center gap-1.5 px-3.5 h-full border-r border-slate-100 cursor-pointer transition-all duration-150 ${
            sortBy !== 'default' ? 'bg-slate-900' : 'hover:bg-slate-50'
          }`}
        >
          <svg
            className="w-3.5 h-3.5 shrink-0 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="11" y2="6" />
            <line x1="4" y1="12" x2="11" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
            <polyline points="14 9 17 6 20 9" />
            <polyline points="14 15 17 18 20 15" />
          </svg>

          <select
            value={sortBy}
            onChange={(e) => setSort(e.target.value)}
            className={`text-xs font-semibold bg-transparent border-none outline-none cursor-pointer appearance-none ${
              sortBy !== 'default' ? 'text-white' : 'text-slate-600'
            }`}
          >
            <option value="default">Featured</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Most Popular</option>
          </select>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1 px-3 h-full border-r border-slate-100 hover:bg-slate-50 transition-all duration-150">
          <svg
            className="w-3 h-3 text-slate-400 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>

          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-11 text-xs font-semibold text-slate-700 text-center bg-transparent border-none outline-none"
          />
          <span className="text-slate-300 font-bold text-xs">—</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-11 text-xs font-semibold text-slate-700 text-center bg-transparent border-none outline-none"
          />
        </div>

        {/* Sale */}
        <button
          onClick={() => setBadge(badgeFilter === 'Sale' ? '' : 'Sale')}
          className={`flex items-center gap-1.5 px-3.5 h-full border-r border-slate-100 text-xs font-semibold transition-all duration-150 ${
            badgeFilter === 'Sale'
              ? 'bg-red-500 text-white'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <svg
            className="w-3 h-3 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          Sale
        </button>

        {/* New */}
        <button
          onClick={() => setBadge(badgeFilter === 'New' ? '' : 'New')}
          className={`flex items-center gap-1.5 px-3.5 h-full text-xs font-semibold transition-all duration-150 ${
            badgeFilter === 'New'
              ? 'bg-emerald-500 text-white'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <svg
            className="w-3 h-3 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          New
        </button>
      </div>

      {hasActive && (
        <button
          onClick={() => {
            setSort('default');
            setPriceRange([0, 2000]);
            setBadge('');
          }}
          className="flex items-center gap-1.5 h-[38px] px-3.5 bg-white border border-slate-200 rounded-[20px] text-xs font-semibold text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-150 shadow-card"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            viewBox="0 0 24 24"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
          Clear
        </button>
      )}

      <span className="ml-auto h-[38px] flex items-center px-3.5 bg-white border border-slate-200 rounded-[20px] text-xs font-bold text-slate-500 shadow-card whitespace-nowrap">
        {count} product{count !== 1 ? 's' : ''}
      </span>
    </div>
  );
}