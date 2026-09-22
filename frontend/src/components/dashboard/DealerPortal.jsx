import React, { useState } from 'react';
import { PRODUCTS, COMPANY_INFO } from '../../data/initialData';

export default function DealerPortal({ onBackToHome, onOpenCart, onAddToCart }) {
  const [selectedTier, setSelectedTier] = useState('tier2'); // tier1: 10%, tier2: 18%, tier3: 25%
  const [dealerSearch, setDealerSearch] = useState('');

  const discountRate = selectedTier === 'tier1' ? 0.10 : selectedTier === 'tier2' ? 0.18 : 0.25;

  const filtered = PRODUCTS.filter(p => 
    !dealerSearch || p.name.toLowerCase().includes(dealerSearch.toLowerCase()) || p.categoryName.toLowerCase().includes(dealerSearch.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-600 text-white text-xs font-black uppercase">
                B2B Wholesale Portal
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Authorized Dealer & Export Partner Pricing
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
              Wholesale Consignment Booking
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all"
            >
              ← Back to Storefront
            </button>
            <button
              onClick={onOpenCart}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-700/20 transition-all flex items-center gap-1.5"
            >
              <span>🛒 View Bulk Order Cart</span>
            </button>
          </div>
        </div>

        {/* Wholesale Tier Discounts Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          <div 
            onClick={() => setSelectedTier('tier1')}
            className={`p-4 rounded-2xl cursor-pointer border transition-all ${
              selectedTier === 'tier1'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500">Tier 1: Standard Bulk</span>
              <span className="text-xs font-black text-emerald-600">10% OFF</span>
            </div>
            <div className="text-base font-black text-slate-900 dark:text-white mt-1">
              MOQ: 500 Cartons
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Ideal for regional district distributors.</p>
          </div>

          <div 
            onClick={() => setSelectedTier('tier2')}
            className={`p-4 rounded-2xl cursor-pointer border transition-all ${
              selectedTier === 'tier2'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-amber-600">Tier 2: Container Importer</span>
              <span className="text-xs font-black text-amber-600 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded">18% OFF</span>
            </div>
            <div className="text-base font-black text-slate-900 dark:text-white mt-1">
              MOQ: 1x20ft FCL Container
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Full container shipping rates (FOB CTG / CIF).</p>
          </div>

          <div 
            onClick={() => setSelectedTier('tier3')}
            className={`p-4 rounded-2xl cursor-pointer border transition-all ${
              selectedTier === 'tier3'
                ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 shadow-md'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500">Tier 3: Mega Wholesaler</span>
              <span className="text-xs font-black text-indigo-600">25% OFF</span>
            </div>
            <div className="text-base font-black text-slate-900 dark:text-white mt-1">
              MOQ: 3+ Containers / Month
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Maximum volume discount for multinational retail chains.</p>
          </div>

        </div>

        {/* Products Wholesale Price Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                B2B Price List with Tier Discount Applied ({Math.round(discountRate * 100)}% Discount)
              </h3>
              <p className="text-xs text-slate-500">
                All prices are tax-exclusive for certified export & bonded warehouse dealers.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search wholesale items..."
              value={dealerSearch}
              onChange={e => setDealerSearch(e.target.value)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="table table-hover align-middle mb-0 text-xs">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Packaging</th>
                  <th>Standard Wholesale</th>
                  <th>Your Tier Price</th>
                  <th>USD Equivalent</th>
                  <th>Order Bulk</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const tierPrice = p.wholesalePrice * (1 - (discountRate - 0.10));
                  return (
                    <tr key={p.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                            <span className="block text-[10px] text-slate-400">{p.categoryName}</span>
                          </div>
                        </div>
                      </td>
                      <td>{p.weight}</td>
                      <td className="text-slate-400 line-through">৳ {p.price}</td>
                      <td className="font-black text-emerald-600 dark:text-emerald-400">
                        ৳ {tierPrice.toFixed(2)}
                      </td>
                      <td className="font-bold text-amber-500">
                        ${(tierPrice / 115).toFixed(2)}
                      </td>
                      <td>
                        <button
                          onClick={() => onAddToCart({ ...p, price: tierPrice })}
                          className="btn btn-sm btn-outline-success text-[11px] py-0.5 px-3 font-bold"
                        >
                          + Add Cartons
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
