import React from 'react';
import { COMPANY_INFO, CATEGORIES } from '../data/initialData';

export default function Footer({ onSelectCategory, onNavigate }) {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center font-black text-xl text-white shadow-lg">
                P
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                PROME AGRO FOODS
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Renowned food production and exporting company of Bangladesh. Started its trade journey in 1982 under the chairmanship of <strong>Mr. Md. Anamul Hasan Khan (CIP)</strong>. Producing 1M tons of quality agro foods annually.
            </p>
            <div className="text-xs text-emerald-400 font-semibold space-y-1">
              <div>✓ ISO-22000:2005 & BSTI Certified</div>
              <div>✓ 100% Halal Food Standards</div>
              <div>✓ 5x National CIP Award Winner</div>
            </div>
          </div>

          {/* Product Lines Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Product Categories
            </h4>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES.slice(0, 6).map(c => (
                <li key={c.id}>
                  <button 
                    onClick={() => {
                      onSelectCategory(c.slug);
                      onNavigate('home', 'products-section');
                    }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Company & Media
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('home', 'about-company')} className="hover:text-emerald-400 transition-colors">
                  About Chairman CIP
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home', 'video-gallery')} className="hover:text-emerald-400 transition-colors">
                  Agro Video Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home', 'export-section')} className="hover:text-emerald-400 transition-colors">
                  Global Footprint (32+ Countries)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dealer')} className="hover:text-emerald-400 transition-colors text-amber-400 font-bold">
                  B2B Dealer Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-emerald-400 transition-colors text-indigo-400 font-bold">
                  Admin ERP Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Factory & Export Desk
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>{COMPANY_INFO.address}</p>
              <p>Hotline: <span className="text-white font-semibold">{COMPANY_INFO.phone}</span></p>
              <p>Export: <span className="text-emerald-400 font-semibold">{COMPANY_INFO.exportEmail}</span></p>
              <p>Sales: <span className="text-white font-semibold">{COMPANY_INFO.salesHr}</span></p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Prome Agro Foods Limited. All Rights Reserved. Official Portal: <a href="https://prome.com.bd/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">prome.com.bd</a></p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Pure Food, Pure Health</span>
            <span>•</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
