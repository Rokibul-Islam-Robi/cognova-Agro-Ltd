import React, { useState, useEffect } from 'react';
import FloatingNavbar from './components/FloatingNavbar';
import HeroSection from './components/HeroSection';
import ProductCatalog from './components/ProductCatalog';
import AboutCompany from './components/AboutCompany';
import AgroVideoGallery from './components/AgroVideoGallery';
import GlobalFootprint from './components/GlobalFootprint';
import ExportCalculator from './components/ExportCalculator';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminDashboard from './components/dashboard/AdminDashboard';
import DealerPortal from './components/dashboard/DealerPortal';
import CartDrawer from './components/CartDrawer';
import { api } from './services/api';
import { PRODUCTS, CATEGORIES, VIDEOS, COMPANY_INFO } from './data/initialData';

export default function App() {
  const [activeView, setActiveView] = useState('home'); // 'home', 'admin', 'dealer'
  const [products, setProducts] = useState(PRODUCTS);
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    kpis: {
      total_revenue: 2895000,
      total_orders: 3,
      total_products: 15,
      total_inquiries: 2
    }
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Load initial backend data
  useEffect(() => {
    async function loadData() {
      try {
        const prodData = await api.getProducts();
        if (prodData && prodData.length) setProducts(prodData);

        const orderData = await api.getOrders();
        if (orderData) setOrders(orderData);

        const inqData = await api.getInquiries();
        if (inqData) setInquiries(inqData);

        const statsData = await api.getDashboardStats();
        if (statsData) setDashboardStats(statsData);
      } catch (err) {
        console.warn('Backend load notice', err);
      }
    }
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart operations
  const handleAddToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    showToast(`Added "${product.name}" to cart.`);
  };

  const handleUpdateQuantity = (productId, newQty) => {
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQty } : item
    ));
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleCheckoutComplete = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    showToast(`Order #${newOrder.order_number} confirmed!`);
  };

  // Admin Actions
  const handleAddProduct = async (productData) => {
    const saved = await api.addProduct(productData);
    setProducts(prev => [saved, ...prev]);
    showToast(`Product "${saved.name}" added to catalog.`);
  };

  const handleDeleteProduct = async (productId) => {
    await api.deleteProduct(productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast(`Product deleted successfully.`);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    await api.updateOrderStatus(orderId, newStatus);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
    showToast(`Order status updated to ${newStatus}.`);
  };

  const handleUpdateInquiryStatus = async (inqId, newStatus) => {
    setInquiries(prev => prev.map(i => i.id === inqId ? { ...i, status: newStatus } : i));
    showToast(`Inquiry status updated.`);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased text-slate-100 selection:bg-emerald-500 selection:text-white">
      
      {/* Floating Navbar over Hero & Pages */}
      <FloatingNavbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Content Router */}
      <main>
        {activeView === 'home' && (
          <>
            {/* 1. Hero Section with Agro Video Playing in Background */}
            <HeroSection
              onExploreClick={() => {
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onRequestQuoteClick={() => {
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenVideoModal={(video) => setActiveVideoModal(video)}
            />

            {/* 2. Agro Products Catalog with Category Filtering */}
            <ProductCatalog
              products={products}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
            />

            {/* 3. Corporate Heritage & Chairman CIP Recognition */}
            <AboutCompany />

            {/* 4. Agro Video Gallery (Documentary & Processing lines) */}
            <AgroVideoGallery 
              onOpenVideoModal={(video) => setActiveVideoModal(video)} 
            />

            {/* 5. Global Export Footprint (32+ Countries) */}
            <GlobalFootprint />

            {/* 6. Interactive Container Freight & Cargo Estimator */}
            <ExportCalculator 
              onPreFillInquiry={(summary) => {
                setPrefilledMessage(summary);
              }}
            />

            {/* 7. Contact & Official B2B Inquiry Desk */}
            <ContactSection prefilledMessage={prefilledMessage} />
          </>
        )}

        {/* Admin ERP Dashboard View */}
        {activeView === 'admin' && (
          <AdminDashboard
            stats={dashboardStats}
            products={products}
            orders={orders}
            inquiries={inquiries}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateInquiryStatus={handleUpdateInquiryStatus}
            onBackToHome={() => setActiveView('home')}
          />
        )}

        {/* B2B Dealer Wholesale Portal View */}
        {activeView === 'dealer' && (
          <DealerPortal
            onBackToHome={() => setActiveView('home')}
            onOpenCart={() => setIsCartOpen(true)}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        onSelectCategory={setSelectedCategory}
        onNavigate={(view, sec) => {
          setActiveView(view);
          if (sec) {
            setTimeout(() => {
              const el = document.getElementById(sec);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckoutComplete={handleCheckoutComplete}
      />

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg font-bold p-2"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-xs font-bold uppercase">
                  {quickViewProduct.categoryName}
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {quickViewProduct.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {quickViewProduct.description}
                </p>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Packaging / Weight:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{quickViewProduct.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Product SKU:</span>
                    <span className="font-mono text-slate-900 dark:text-white">{quickViewProduct.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Quality Certified:</span>
                    <span className="text-emerald-500 font-bold">ISO-22000 & Halal</span>
                  </div>
                </div>

                <div className="pt-2 flex items-baseline justify-between">
                  <div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      ৳ {Number(quickViewProduct.price).toFixed(2)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Export Bulk Price: ${(quickViewProduct.wholesalePrice / 115).toFixed(2)} USD
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-700/25"
                  >
                    + Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Video Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
          <div className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative">
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {activeVideoModal.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2 py-1 bg-white/10 rounded-lg"
              >
                ✕ Close Player
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
                src={activeVideoModal.url}
              >
                Your browser does not support video playback.
              </video>
            </div>

            <div className="p-5 bg-slate-900 text-xs text-slate-300">
              <p className="font-semibold text-white mb-1">About This Agro Production Process:</p>
              <p>{activeVideoModal.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Instant Search Overlay Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-4 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-600">
                Quick Search Prome Products
              </h4>
              <button onClick={() => setSearchModalOpen(false)} className="text-slate-400 text-sm">✕</button>
            </div>

            <input
              type="text"
              autoFocus
              placeholder="Search by product name, masala, mustard oil, rice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full mt-3 px-3 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm text-slate-900 dark:text-white"
            />

            <div className="mt-4 max-h-60 overflow-y-auto space-y-1 custom-scrollbar">
              {products
                .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .slice(0, 5)
                .map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setQuickViewProduct(p);
                      setSearchModalOpen(false);
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <img src={p.image} alt={p.name} className="w-8 h-8 rounded object-cover" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{p.name}</div>
                        <div className="text-[10px] text-slate-400">{p.weight}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-500">৳ {p.price}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Global Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-5 py-2.5 rounded-2xl shadow-2xl border border-emerald-500/40 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="text-emerald-400">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
