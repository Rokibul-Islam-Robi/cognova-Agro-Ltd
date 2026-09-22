import React from 'react';

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isFeatured && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-md">
              ★ Best Seller
            </span>
          )}
          {product.isExportReady && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500/90 text-slate-950 shadow-sm">
              Global Export
            </span>
          )}
        </div>

        {/* Quick View Floating Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white rounded-xl text-xs font-bold shadow-lg hover:scale-105 transition-transform"
          >
            Quick View
          </button>
        </div>

        {/* Category Pill Tag */}
        <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold text-slate-200 border border-white/10">
          {product.categoryName}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-mono">{product.sku}</span>
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              ★ {product.rating} ({product.reviewsCount})
            </span>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-1 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price & Action Area */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
              ৳ {Number(product.price).toFixed(2)}
            </div>
            <div className="text-[10px] text-slate-400">
              Wholesale: ${(product.wholesalePrice / 115).toFixed(2)} USD
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-700/20 active:scale-95 flex items-center gap-1.5"
            title="Add to Cart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
}
