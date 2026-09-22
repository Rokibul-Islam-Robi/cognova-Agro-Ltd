import React from 'react';
import { EXPORT_DESTINATIONS, COMPANY_INFO } from '../data/initialData';

export default function GlobalFootprint() {
  return (
    <section id="export-section" className="py-20 bg-slate-100 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
            Export Infrastructure
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Prome Brand in 32+ Global Markets
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            From the bustling supermarkets of London and Dubai to grocery chains across New York, Toronto, and Tokyo.
          </p>
        </div>

        {/* Global Regions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPORT_DESTINATIONS.map((dest, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl font-black mb-4">
                  {idx === 0 ? '🕌' : idx === 1 ? '🏰' : idx === 2 ? '🗽' : '🌏'}
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-2">
                  {dest.region}
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {dest.countries.map((country, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{country}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                <span>Active Consignments</span>
                <span>FCL & LCL</span>
              </div>
            </div>
          ))}
        </div>

        {/* Logistics & Compliance Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center text-2xl shrink-0">
              ⚓
            </div>
            <div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Seaport Logistics</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Direct refrigerated and dry container dispatch via Chittagong Port (CTG).
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-2xl shrink-0">
              📜
            </div>
            <div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Trade Documentation</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Phytosanitary Certificates, Certificate of Origin, Halal, and FDA registrations.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-2xl shrink-0">
              🛡️
            </div>
            <div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">Strict Quality Audit</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Every batch laboratory-tested for zero aflatoxins and pesticide residues.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
