import React, { useState, useEffect } from 'react';
import { COMPANY_INFO, CATEGORIES } from '../data/initialData';

export default function FloatingNavbar({ 
  cartCount, 
  onOpenCart, 
  activeView, 
  setActiveView, 
  onSelectCategory,
  onOpenSearch
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view, sectionId = null) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);

    if (view === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-3 inset-x-3 md:top-4 md:inset-x-8 z-50 transition-all duration-300">
      <nav 
        className={`max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 border ${
          isScrolled 
            ? 'bg-slate-900/90 backdrop-blur-xl border-emerald-500/30 shadow-2xl shadow-emerald-950/20 text-white' 
            : 'bg-slate-900/75 backdrop-blur-md border-white/20 shadow-xl text-white'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl sm:text-2xl font-black text-white tracking-wider">P</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  PROME
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  AGRO
                </span>
              </div>
              <p className="text-[10px] text-slate-300 tracking-wider uppercase font-medium hidden sm:block">
                Foods Limited • Est. 1982
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeView === 'home' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25' : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </button>

            {/* Products with Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
              >
                Products
                <svg className={`w-3.5 h-3.5 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {categoryDropdownOpen && (
                <div 
                  className="absolute left-0 mt-3 w-72 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800">
                    Prome Agro Product Lines
                  </div>
                  <div className="max-h-72 overflow-y-auto mt-1 custom-scrollbar">
                    <button
                      onClick={() => {
                        onSelectCategory('all');
                        handleNavClick('home', 'products-section');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-600/30 rounded-lg flex items-center justify-between transition-colors"
                    >
                      <span>🌟 All Agro Products</span>
                      <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-300">Browse All</span>
                    </button>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.slug);
                          handleNavClick('home', 'products-section');
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-emerald-600/20 rounded-lg flex items-center justify-between transition-colors"
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('home', 'about-company')}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all"
            >
              Corporate & CIP
            </button>

            <button
              onClick={() => handleNavClick('home', 'video-gallery')}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Agro Videos
            </button>

            <button
              onClick={() => handleNavClick('home', 'export-section')}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all"
            >
              Global Export
            </button>

            <button
              onClick={() => handleNavClick('home', 'contact-section')}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all"
            >
              Contact
            </button>
          </div>

          {/* Right Controls: Search, View Switchers, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Instant Search Trigger */}
            <button
              onClick={onOpenSearch}
              title="Search Prome Products"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl bg-emerald-600/40 hover:bg-emerald-600 border border-emerald-500/40 text-white transition-all shadow-md hover:scale-105"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-amber-500 text-slate-900 text-xs font-black rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* View Mode Selector: Storefront vs Admin ERP vs Dealer B2B */}
            <div className="hidden sm:flex items-center p-1 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs font-semibold">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeView === 'home' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                Store
              </button>
              <button
                onClick={() => handleNavClick('dealer')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeView === 'dealer' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                B2B Portal
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeView === 'admin' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                Admin ERP
              </button>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 text-slate-200 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800/80 space-y-2 animate-in fade-in duration-200">
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-800 rounded-xl text-center text-xs font-bold mb-3">
              <button
                onClick={() => handleNavClick('home')}
                className={`py-1.5 rounded-lg ${activeView === 'home' ? 'bg-emerald-600 text-white' : 'text-slate-300'}`}
              >
                Store
              </button>
              <button
                onClick={() => handleNavClick('dealer')}
                className={`py-1.5 rounded-lg ${activeView === 'dealer' ? 'bg-amber-600 text-white' : 'text-slate-300'}`}
              >
                B2B Dealer
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className={`py-1.5 rounded-lg ${activeView === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-300'}`}
              >
                Admin ERP
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <button
                onClick={() => handleNavClick('home', 'products-section')}
                className="text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-emerald-600/20 text-slate-200"
              >
                🌾 All Products
              </button>
              <button
                onClick={() => handleNavClick('home', 'about-company')}
                className="text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-emerald-600/20 text-slate-200"
              >
                🏆 Chairman CIP
              </button>
              <button
                onClick={() => handleNavClick('home', 'video-gallery')}
                className="text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-emerald-600/20 text-slate-200"
              >
                🎥 Agro Video
              </button>
              <button
                onClick={() => handleNavClick('home', 'export-section')}
                className="text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-emerald-600/20 text-slate-200"
              >
                🌍 Global Reach
              </button>
            </div>
            
            <div className="pt-2 text-center">
              <button
                onClick={() => handleNavClick('home', 'contact-section')}
                className="w-full py-2 bg-gradient-to-r from-emerald-600 to-amber-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Request Export Quotation / Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
