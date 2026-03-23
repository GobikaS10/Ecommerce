import React from 'react';
import { useApp } from '../store';
import { useFilteredProducts } from '../hooks';
import { SectionHeader } from '../components/ui/shared.jsx';
import HeroBanner from '../components/features/home/HeroBanner';
import TrustStrip from '../components/features/home/TrustStrip';
import ProductGrid from '../components/features/product/ProductGrid';
import { CATEGORY_META } from '../data/config';

function CategoryCards({ active, onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Object.entries(CATEGORY_META).map(([cat, meta]) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onSelect(isActive ? 'All' : cat)}
            className={`
              relative overflow-hidden rounded-2xl border-2 transition-all duration-300
              hover:-translate-y-1.5 hover:shadow-card-hover group text-left
              ${isActive ? `${meta.activeColor} border-transparent shadow-lg scale-[1.02]` : `bg-white ${meta.color} shadow-card`}
            `}
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={meta.image}
                alt={cat}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 transition-opacity duration-300
                ${isActive
                  ? 'bg-black/40'
                  : 'bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/40'}`}
              />
              {isActive && (
                <div className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
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

function PromoBanner({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-black text-sm tracking-tight">
              Flash Sale — Up to 40% off Electronics!
            </p>
            <p className="text-white/50 text-xs mt-0.5">Limited time · Free shipping on all orders</p>
          </div>
        </div>
        <span className="text-amber-400 text-xs font-bold tracking-wide flex items-center gap-1 shrink-0 group-hover:gap-2 transition-all">
          Shop now
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </div>
  );
}

// ── Filter Bar ─────────────────────────────────────────────────
function FilterBar({ sortBy, setSort, priceRange, setPriceRange, count }) {
  const hasActiveFilter = sortBy !== 'default' || priceRange[0] !== 0 || priceRange[1] !== 2000;

  return (
    <div className="flex items-center gap-3 flex-wrap bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100">

      {/* Sort */}
      <select
        value={sortBy}
        onChange={e => setSort(e.target.value)}
        className="text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-slate-300 transition-colors"
      >
        <option value="default">Sort: Featured</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
        <option value="newest">Most Popular</option>
      </select>

      {/* Divider */}
      <div className="w-px h-5 bg-slate-200" />

      {/* Price range */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="font-medium text-slate-600">Price</span>
        <input
          type="number"
          value={priceRange[0]}
          min={0}
          onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
          className="w-16 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none text-center hover:border-slate-300 focus:border-sky-400 transition-colors"
          placeholder="Min"
        />
        <span className="text-slate-300">—</span>
        <input
          type="number"
          value={priceRange[1]}
          min={0}
          onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-16 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none text-center hover:border-slate-300 focus:border-sky-400 transition-colors"
          placeholder="Max"
        />
      </div>

      {/* Clear filters */}
      {hasActiveFilter && (
        <>
          <div className="w-px h-5 bg-slate-200" />
          <button
            onClick={() => { setSort('default'); setPriceRange([0, 2000]); }}
            className="text-xs text-sky-500 font-medium hover:text-sky-700 transition-colors flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
            Clear
          </button>
        </>
      )}

      {/* Result count — right side */}
      <span className="ml-auto text-xs text-slate-400 font-medium">
        {count} product{count !== 1 ? 's' : ''}
      </span>
    </div>
  );
}

// ── HomePage ───────────────────────────────────────────────────
export default function HomePage() {
  const {
    searchQuery, selectedCategory, setCategory,
    loading, sortBy, setSort, priceRange, setPriceRange,
  } = useApp();

  const products   = useFilteredProducts(searchQuery, selectedCategory);
  const isFiltered = !!searchQuery || selectedCategory !== 'All';

  const sectionTitle = searchQuery
    ? `Results for "${searchQuery}"`
    : selectedCategory !== 'All'
    ? selectedCategory
    : 'Featured Products';

  return (
    <div className="flex flex-col gap-7">

      {/* Hero section — only when not filtering */}
      {!isFiltered && (
        <>
          <HeroBanner />
          <TrustStrip />
          <PromoBanner onClick={() => setCategory('Electronics')} />
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Shop by Category</h2>
              <span className="text-xs text-slate-400 font-medium">Click to filter</span>
            </div>
            <CategoryCards active={selectedCategory} onSelect={setCategory} />
          </div>
        </>
      )}

      {/* Products section */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title={sectionTitle}
          subtitle={`${products.length} product${products.length !== 1 ? 's' : ''} available`}
          action={!isFiltered
            ? { label: 'View all products', onClick: () => {} }
            : { label: '← Back to all', onClick: () => setCategory('All') }}
        />

        {/* Filter bar — always visible above products */}
        <FilterBar
          sortBy={sortBy}
          setSort={setSort}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          count={products.length}
        />

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-100 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <p className="text-slate-500 font-medium text-sm">No products found</p>
            <p className="text-slate-400 text-xs">Try adjusting your filters or search term</p>
            <button
              onClick={() => { setCategory('All'); setSort('default'); setPriceRange([0, 2000]); }}
              className="mt-1 text-xs text-sky-500 font-medium hover:text-sky-700"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>

    </div>
  );
}