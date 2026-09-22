import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/initialData';
import { api } from '../services/api';

export default function ContactSection({ prefilledMessage = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: 'Bangladesh',
    product_interest: 'Prome Spices & Seasonings',
    estimated_volume: '1x20ft Container',
    message: prefilledMessage || ''
  });

  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if prefilled changes
  React.useEffect(() => {
    if (prefilledMessage) {
      setFormData(prev => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await api.submitInquiry(formData);
      setStatusMessage({
        type: 'success',
        text: 'Thank you! Your export inquiry has been registered in the Prome Agro database. Our export team will connect with you via email & phone shortly.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        country: 'Bangladesh',
        product_interest: 'Prome Spices & Seasonings',
        estimated_volume: '1x20ft Container',
        message: ''
      });
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Could not send inquiry at this moment. Please email directly to export@promefoods.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
            Contact & Global Dealership
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Connect With Our Agro Export Desk
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Headquartered in Dhaka with international liaison offices across key shipping hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Official Contact Directory */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Factory & Head Office
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {COMPANY_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl shrink-0">
                  📞
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Telephone & Hotlines
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Central PBX: <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-emerald-600">{COMPANY_INFO.phone}</a>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Sales HR: <span className="font-semibold">{COMPANY_INFO.salesHr}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl shrink-0">
                  ✉️
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Official Email Addresses
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    General Inquiries: <a href={`mailto:${COMPANY_INFO.email}`} className="text-emerald-600 font-semibold">{COMPANY_INFO.email}</a>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Head of Export: <a href={`mailto:${COMPANY_INFO.exportEmail}`} className="text-emerald-600 font-semibold">{COMPANY_INFO.exportEmail}</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Export Fact Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-emerald-900 to-slate-900 text-white shadow-xl space-y-2 border border-emerald-500/30">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Global Importers Notice
              </span>
              <h5 className="font-extrabold text-base">
                Private Labeling & OEM Custom Packing
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prome Agro Foods manufactures custom branded products for international retail chains under strict confidential OEM arrangements.
              </p>
            </div>

          </div>

          {/* Right Column: Inquiry Submission Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            
            <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2">
              Send an Export / Distributorship Inquiry
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Fill out your volume requirements and our export division will prepare a tailored quotation.
            </p>

            {statusMessage && (
              <div className={`p-4 rounded-2xl mb-6 text-xs font-bold flex items-center gap-2 ${
                statusMessage.type === 'success' 
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30' 
                  : 'bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-500/30'
              }`}>
                <span>{statusMessage.type === 'success' ? '✅' : '⚠️'}</span>
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Trading / Supermarket Ltd."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UAE, UK, USA"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Product Line of Interest
                  </label>
                  <select
                    value={formData.product_interest}
                    onChange={(e) => setFormData({ ...formData, product_interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-bold"
                  >
                    <option value="Prome Spices & Seasonings">Prome Spices & Masala</option>
                    <option value="Prome Mustard Oil">Prome Pure Mustard Oil</option>
                    <option value="Prome Aromatic Rice">Chinigura / Kalijeera Rice</option>
                    <option value="Prome Snacks & Bakery">Chanachur, Jhal Muri & Toast</option>
                    <option value="Prome Drinks & Juices">Mango Drinks & Soft Powders</option>
                    <option value="Prome Pickles & Jellies">Mango & Olive Pickles / Jellies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Estimated Shipment Size
                  </label>
                  <select
                    value={formData.estimated_volume}
                    onChange={(e) => setFormData({ ...formData, estimated_volume: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 font-bold"
                  >
                    <option value="1x20ft FCL Container">1x20ft FCL Container</option>
                    <option value="1x40ft High Cube Container">1x40ft High Cube Container</option>
                    <option value="LCL Sample Consignment (500 Cartons)">LCL Sample Consignment (500 Cartons)</option>
                    <option value="Multiple Monthly Shipments">Multiple Monthly Regular Consignments</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Message / Specific Inquiries *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your delivery terms, destination seaport, certification requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-emerald-700/25 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting to Export Desk...' : 'Submit Inquiry to Prome Agro Export Desk'}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
