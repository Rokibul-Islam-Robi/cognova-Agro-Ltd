// ==============================================================================
// Prome Agro Foods - API Client & Data Adapter
// Seamlessly interacts with Raw PHP backend or local state store
// ==============================================================================

import { PRODUCTS, CATEGORIES, VIDEOS, INITIAL_ORDERS, INITIAL_INQUIRIES } from '../data/initialData.js';

const API_BASE = '/backend/api';

// Local storage keys for offline/standalone demo continuity
const STORAGE_KEYS = {
  PRODUCTS: 'prome_products',
  ORDERS: 'prome_orders',
  INQUIRIES: 'prome_inquiries',
  CART: 'prome_cart',
  AUTH: 'prome_auth'
};

// Initialize localStorage with initial seeds if not present
function getStored(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn('LocalStorage error', e);
  }
}

export const api = {
  // --- Products ---
  async getProducts(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/products?${query}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback to local store
    }
    let list = getStored(STORAGE_KEYS.PRODUCTS, PRODUCTS);
    if (params.category && params.category !== 'all') {
      list = list.filter(p => p.categorySlug === params.category);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return list;
  },

  async addProduct(product) {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback to local store
    }
    const list = getStored(STORAGE_KEYS.PRODUCTS, PRODUCTS);
    const newProduct = {
      ...product,
      id: Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      sku: product.sku || `PRM-${Math.floor(100 + Math.random() * 900)}`
    };
    list.unshift(newProduct);
    setStored(STORAGE_KEYS.PRODUCTS, list);
    return newProduct;
  },

  async deleteProduct(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {}
    let list = getStored(STORAGE_KEYS.PRODUCTS, PRODUCTS);
    list = list.filter(p => p.id !== id);
    setStored(STORAGE_KEYS.PRODUCTS, list);
    return true;
  },

  // --- Categories ---
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}
    return CATEGORIES;
  },

  // --- Orders ---
  async createOrder(orderPayload) {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}
    const orders = getStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    const newOrder = {
      id: Date.now(),
      orderNumber: `PRM-${new Date().getFullYear()}-${orderPayload.order_type === 'wholesale_export' ? 'EXP' : 'RET'}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderPayload.customer_name,
      customerEmail: orderPayload.customer_email,
      phone: orderPayload.customer_phone,
      destinationCountry: orderPayload.destination_country || 'Bangladesh',
      type: orderPayload.order_type || 'retail',
      totalAmount: orderPayload.total_amount,
      paymentStatus: 'paid',
      orderStatus: 'pending',
      items: orderPayload.items || [],
      date: new Date().toISOString().split('T')[0]
    };
    orders.unshift(newOrder);
    setStored(STORAGE_KEYS.ORDERS, orders);
    return newOrder;
  },

  async getOrders() {
    try {
      const res = await fetch(`${API_BASE}/orders`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}
    return getStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },

  async updateOrderStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_status: status })
      });
      if (res.ok) return true;
    } catch {}
    const orders = getStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    const order = orders.find(o => o.id === id);
    if (order) {
      order.orderStatus = status;
      setStored(STORAGE_KEYS.ORDERS, orders);
    }
    return true;
  },

  // --- Inquiries ---
  async submitInquiry(data) {
    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}
    const inqs = getStored(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    const newInq = {
      id: Date.now(),
      ...data,
      status: 'new',
      date: new Date().toISOString().split('T')[0]
    };
    inqs.unshift(newInq);
    setStored(STORAGE_KEYS.INQUIRIES, inqs);
    return newInq;
  },

  async getInquiries() {
    try {
      const res = await fetch(`${API_BASE}/inquiries`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}
    return getStored(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  },

  // --- Videos & Media ---
  async getMedia() {
    try {
      const res = await fetch(`${API_BASE}/media`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}
    return VIDEOS;
  },

  // --- Dashboard Analytics ---
  async getDashboardStats() {
    try {
      const res = await fetch(`${API_BASE}/dashboard/stats`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}
    const orders = getStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    const prods = getStored(STORAGE_KEYS.PRODUCTS, PRODUCTS);
    const inqs = getStored(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    const totalRev = orders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
    return {
      kpis: {
        total_revenue: totalRev,
        total_orders: orders.length,
        total_products: prods.length,
        total_inquiries: inqs.length,
        export_countries: 32,
        cip_awards: 5
      },
      recent_orders: orders.slice(0, 5),
      inquiries: inqs
    };
  }
};
