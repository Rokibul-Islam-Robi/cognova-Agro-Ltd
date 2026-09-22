import React, { useState } from 'react';
import { CATEGORIES } from '../../data/initialData';

export default function AdminDashboard({ 
  stats, 
  products, 
  orders, 
  inquiries, 
  onAddProduct, 
  onDeleteProduct, 
  onUpdateOrderStatus,
  onUpdateInquiryStatus,
  onBackToHome 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'products', 'orders', 'inquiries'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category_id: 1,
    weight_volume: '250g Pack',
    price: 150,
    wholesale_price: 120,
    stock: 1000,
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    description: 'High quality authentic Prome agro-processed food product manufactured under strict hygiene control.',
    ingredients: 'Natural Agro Ingredients'
  });

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const cat = CATEGORIES.find(c => c.id === Number(newProduct.category_id)) || CATEGORIES[0];
    onAddProduct({
      ...newProduct,
      categoryId: cat.id,
      categoryName: cat.name,
      categorySlug: cat.slug,
      image: newProduct.image_url,
      weight: newProduct.weight_volume,
      price: Number(newProduct.price),
      wholesalePrice: Number(newProduct.wholesale_price),
      stock: Number(newProduct.stock),
      isFeatured: true,
      isExportReady: true
    });
    setShowAddModal(false);
    setNewProduct({
      name: '',
      category_id: 1,
      weight_volume: '250g Pack',
      price: 150,
      wholesale_price: 120,
      stock: 1000,
      image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
      description: 'High quality authentic Prome agro-processed food product manufactured under strict hygiene control.',
      ingredients: 'Natural Agro Ingredients'
    });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white text-xs font-black uppercase">
                Admin ERP
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Prome Agro Foods Operations Management
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
              Enterprise Control & Analytics Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>← Back to Storefront</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-700/20 transition-all flex items-center gap-1.5"
            >
              <span>+ Add Agro Product</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Bootstrap styled with Tailwind polish) */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'overview'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            📊 KPI Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'products'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            🌾 Agro Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'orders'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            📦 Orders & Exports ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'inquiries'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            🌐 B2B Inquiries ({inquiries.length})
          </button>
        </div>

        {/* TAB 1: KPI OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* 4 Core KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl font-black shrink-0">
                  ৳
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Total Revenue (Recorded)</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    ৳ {(stats.kpis.total_revenue || 2895000).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">+18.4% vs last quarter</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl font-black shrink-0">
                  🚢
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Active Consignments</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {orders.length} Shipments
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold block mt-0.5">UAE, UK, KSA, Canada</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl font-black shrink-0">
                  🌾
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Agro SKUs Active</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {products.length} Items
                  </span>
                  <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">Across 11 Categories</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center text-2xl font-black shrink-0">
                  📨
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Export Inquiries</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {inquiries.length} Inquiries
                  </span>
                  <span className="text-[10px] text-rose-600 font-bold block mt-0.5">Requires Sales Attention</span>
                </div>
              </div>

            </div>

            {/* Quick Recent Orders Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Recent Commercial & Retail Orders
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-hover align-middle mb-0 text-xs">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Customer / Importer</th>
                      <th>Type</th>
                      <th>Destination</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 4).map(o => (
                      <tr key={o.id}>
                        <td className="font-mono font-bold text-slate-900 dark:text-white">{o.orderNumber}</td>
                        <td className="font-semibold">{o.customerName}</td>
                        <td>
                          <span className={`badge ${o.type === 'wholesale_export' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                            {o.type === 'wholesale_export' ? 'Wholesale Export' : 'Retail Domestic'}
                          </span>
                        </td>
                        <td>{o.destinationCountry}</td>
                        <td className="font-bold text-emerald-600">৳ {Number(o.totalAmount).toLocaleString()}</td>
                        <td>
                          <span className={`badge ${
                            o.orderStatus === 'delivered' ? 'bg-success' :
                            o.orderStatus === 'shipped' ? 'bg-info' :
                            o.orderStatus === 'processing' ? 'bg-primary' : 'bg-secondary'
                          }`}>
                            {o.orderStatus.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCTS CRUD TABLE */}
        {activeTab === 'products' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Agro Products Inventory
                </h3>
                <p className="text-xs text-slate-500">
                  Manage catalogue prices, packaging specs, and stock levels.
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-700"
              >
                + Create New Agro Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-hover align-middle mb-0 text-xs">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Weight / Vol</th>
                    <th>Retail Price</th>
                    <th>Wholesale Price</th>
                    <th>In Stock</th>
                    <th>Export Ready</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{p.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{p.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td>{p.categoryName}</td>
                      <td>{p.weight}</td>
                      <td className="font-bold text-emerald-600">৳ {p.price}</td>
                      <td className="font-bold text-amber-600">৳ {p.wholesalePrice}</td>
                      <td>
                        <span className={`badge ${p.stock > 500 ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">YES (ISO)</span>
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="btn btn-outline-danger btn-sm py-0.5 px-2 text-[10px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
              All Client & Export Orders
            </h3>

            <div className="overflow-x-auto">
              <table className="table table-hover align-middle mb-0 text-xs">
                <thead className="table-light">
                  <tr>
                    <th>Order No</th>
                    <th>Customer Name</th>
                    <th>Destination</th>
                    <th>Type</th>
                    <th>Total</th>
                    <th>Order Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td className="font-mono font-bold">{o.orderNumber}</td>
                      <td>
                        <div className="font-semibold">{o.customerName}</div>
                        <div className="text-[10px] text-slate-400">{o.customerEmail}</div>
                      </td>
                      <td>{o.destinationCountry}</td>
                      <td>
                        <span className={`badge ${o.type === 'wholesale_export' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                          {o.type}
                        </span>
                      </td>
                      <td className="font-bold text-emerald-600">৳ {Number(o.totalAmount).toLocaleString()}</td>
                      <td>
                        <span className={`badge ${
                          o.orderStatus === 'delivered' ? 'bg-success' :
                          o.orderStatus === 'shipped' ? 'bg-info' :
                          o.orderStatus === 'processing' ? 'bg-primary' : 'bg-secondary'
                        }`}>
                          {o.orderStatus}
                        </span>
                      </td>
                      <td>
                        <select
                          value={o.orderStatus}
                          onChange={(e) => onUpdateOrderStatus(o.id, e.target.value)}
                          className="form-select form-select-sm text-[11px] py-0.5 w-auto"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: B2B INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
              International B2B & Export Inquiries
            </h3>

            <div className="overflow-x-auto">
              <table className="table table-hover align-middle mb-0 text-xs">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Buyer / Company</th>
                    <th>Country</th>
                    <th>Product Line</th>
                    <th>Volume</th>
                    <th>Message</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map(inq => (
                    <tr key={inq.id}>
                      <td className="text-slate-500">{inq.date || 'Recent'}</td>
                      <td>
                        <div className="font-bold">{inq.name}</div>
                        <div className="text-[10px] text-slate-400">{inq.company || inq.email}</div>
                      </td>
                      <td>{inq.country}</td>
                      <td><span className="badge bg-secondary">{inq.productInterest || inq.product_interest}</span></td>
                      <td className="font-semibold text-emerald-600">{inq.volume || inq.estimated_volume}</td>
                      <td className="max-w-xs truncate text-[11px] text-slate-500">{inq.message}</td>
                      <td>
                        <select
                          value={inq.status}
                          onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value)}
                          className="form-select form-select-sm text-[11px] py-0.5 w-auto"
                        >
                          <option value="new">New</option>
                          <option value="in_review">In Review</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                Add New Prome Agro Product
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prome Pure Coriander Powder"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="form-control form-control-sm text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category *</label>
                  <select
                    value={newProduct.category_id}
                    onChange={e => setNewProduct({...newProduct, category_id: Number(e.target.value)})}
                    className="form-select form-select-sm text-xs"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Weight / Packaging *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 200g Jar"
                    value={newProduct.weight_volume}
                    onChange={e => setNewProduct({...newProduct, weight_volume: e.target.value})}
                    className="form-control form-control-sm text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">Retail (৳ BDT) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    className="form-control form-control-sm text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Wholesale (৳) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.wholesale_price}
                    onChange={e => setNewProduct({...newProduct, wholesale_price: e.target.value})}
                    className="form-control form-control-sm text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Initial Stock *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                    className="form-control form-control-sm text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProduct.image_url}
                  onChange={e => setNewProduct({...newProduct, image_url: e.target.value})}
                  className="form-control form-control-sm text-xs"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  className="form-control form-control-sm text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success btn-sm font-bold"
                >
                  Save Product to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
