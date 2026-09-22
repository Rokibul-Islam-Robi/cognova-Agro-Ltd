import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/initialData';

export default function ProductCatalog({ 
  products, 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  setSearchQuery, 
  onAddToCart, 
  onQuickView 
}) {
  const [sortBy, setSortBy] = useState('featured');

  // Filter products by category and search
  const filteredProducts = products.filter(p => {
    const matchCategory = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <section id="products-section" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
            Our Agro Products
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Certified Fresh & Halal Products
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Processed with state-of-the-art European & Japanese technology preserving organic nutrition and true Bangladeshi heritage taste.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search spices, rice, mustard oil..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

        </div>

        {/* Category Horizontal Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar scroll-smooth">
          <button
            onClick={() => onSelectCategory('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500'
            }`}
          >
            <span>🌟 All Lines</span>
            <span className="text-[10px] opacity-80">({products.length})</span>
          </button>

          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.slug
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="text-4xl mb-3">🌾</div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No products found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
