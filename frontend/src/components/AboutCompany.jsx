import React from 'react';
import { COMPANY_INFO } from '../data/initialData';

export default function AboutCompany() {
  return (
    <section id="about-company" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Showcase & CIP Award Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                alt="Prome Agro Processing Infrastructure"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              {/* Floating Chairman Badge */}
              <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-white/20 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center font-black text-xl shadow-lg shrink-0">
                    🏆
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-amber-400">
                      {COMPANY_INFO.chairman}
                    </h4>
                    <p className="text-xs text-slate-300 font-medium">
                      {COMPANY_INFO.chairmanTitle}
                    </p>
                    <p className="text-[11px] text-emerald-400 font-bold mt-0.5">
                      ★ Honored with CIP (Industry) 5 Consecutive Times
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Experience Stamp */}
            <div className="absolute -top-4 -left-4 bg-emerald-600 text-white p-4 rounded-2xl shadow-xl border-2 border-white dark:border-slate-800 text-center animate-bounce-subtle">
              <span className="text-2xl font-black block">42+</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">Years of Trust</span>
            </div>
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
                Heritage & Leadership
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Building Global Food Security Through Agro Innovation
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Prome Agro Foods Limited</strong> is Bangladesh’s renowned food production and exporting powerhouse. Started its journey in trade since <strong>1982</strong>, under the visionary stewardship of <strong>Mr. Md. Anamul Hasan Khan (CIP)</strong>, the company was officially reincorporated in <strong>2002</strong> and has grown into an international leader.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Equipped with modern European & Japanese robotic packaging and micro-grinding technology, Prome manufactures over <strong>one million tons of agro-food products annually</strong>, upholding rigorous standards under ISO-22000:2005, BSTI, and international Halal certifications.
            </p>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl mb-1">🌿</div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">Pure Origin</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Direct contract farming with 20,000+ local farmers across northern Bengal.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl mb-1">🔬</div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">ISO-22000 Certified</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Automated nitrogen-flushing cleanrooms ensure zero microbial contamination.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl mb-1">🌐</div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">32+ Export Ports</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Trusted by retail chains in the UAE, UK, USA, Saudi Arabia, and Canada.
                </p>
              </div>
            </div>

            {/* Certifications Badge Row */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Recognitions:
              </span>
              {COMPANY_INFO.certifications.map((cert, i) => (
                <span key={i} className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-bold border border-emerald-500/20">
                  ✓ {cert}
                </span>
              ))}
              <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-lg text-xs font-bold border border-amber-500/20">
                🏆 NRB Highest Taxpayer Award
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
