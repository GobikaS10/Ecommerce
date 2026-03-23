/**
 * components/features/product/ProductGrid.jsx
 * Responsive auto-fill grid of ProductCards.
 */

import React from 'react';
import ProductCard from './ProductCard';
import { EmptyState } from '../../ui/shared.jsx';

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <EmptyState
        icon="🔍"
        title="No results found"
        subtitle="Try adjusting your search or browsing a different category."
      />
    );
  }

  return (
    <div className="stagger grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
