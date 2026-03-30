import React from 'react';
import { useApp } from '../store';
import { useFilteredProducts } from '../hooks';
import { SectionHeader } from '../components/ui/shared.jsx';
import HeroBanner from '../components/features/home/HeroBanner';
import TrustStrip from '../components/features/home/TrustStrip';
import PromoBanner from '../components/features/home/PromoBanner';
import CategoryCards from '../components/features/home/CategoryCards';
import FilterBar from '../components/features/home/FilterBar';
import ProductGrid from '../components/features/product/ProductGrid';

export default function HomePage() {
  const {
    searchQuery,
    selectedCategory,
    setCategory,
    loading,
    sortBy,
    setSort,
    priceRange,
    setPriceRange,
    badgeFilter,
    setBadge,
  } = useApp();

  const products = useFilteredProducts(searchQuery, selectedCategory);
  const isFiltered = !!searchQuery || selectedCategory !== 'All';

  const sectionTitle = searchQuery
    ? `Results for "${searchQuery}"`
    : selectedCategory !== 'All'
    ? selectedCategory
    : 'Featured Products';

  return (
    <div className="flex flex-col gap-7">
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

      <section className="flex flex-col gap-4">
        <SectionHeader
          title={sectionTitle}
          subtitle={`${products.length} product${products.length !== 1 ? 's' : ''} available`}
          action={
            !isFiltered
              ? { label: 'View all products', onClick: () => {} }
              : { label: '← Back to all', onClick: () => setCategory('All') }
          }
        />

        <FilterBar
          sortBy={sortBy}
          setSort={setSort}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          badgeFilter={badgeFilter}
          setBadge={setBadge}
          count={products.length}
        />

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-100 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg
              className="w-12 h-12 text-slate-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <p className="text-slate-500 font-medium text-sm">No products found</p>
            <p className="text-slate-400 text-xs">Try adjusting your filters or search term</p>

            <button
              onClick={() => {
                setCategory('All');
                setSort('default');
                setPriceRange([0, 2000]);
                setBadge('');
              }}
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