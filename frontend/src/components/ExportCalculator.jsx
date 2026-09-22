import React, { useState } from 'react';

export default function ExportCalculator({ onPreFillInquiry }) {
  const [containerType, setContainerType] = useState('20ft');
  const [destinationPort, setDestinationPort] = useState('Jebel Ali, Dubai (UAE)');
  const [productType, setProductType] = useState('Spices & Seasonings');
  const [palletQty, setPalletQty] = useState(10);

  // Estimator math
  const maxPallets = containerType === '20ft' ? 10 : 22;
  const cartonPerPallet = productType.includes('Oil') ? 50 : 80;
  const totalCartons = palletQty * cartonPerPallet;
  const estimatedWeightTon = (totalCartons * (productType.includes('Rice') ? 20 : 12)) / 1000;
  const estimatedFobUsd = Math.round(totalCartons * (productType.includes('Oil') ? 35 : 22));

  const handleGenerateQuote = () => {
    const summary = `Estimated Order: ${containerType} FCL (${palletQty} Pallets / ~${totalCartons} Cartons) of ${productType} to ${destinationPort}. Estimated Tonnage: ${estimatedWeightTon.toFixed(1)} MT.`;
    if (onPreFillInquiry) {
      onPreFillInquiry(summary, productType, destinationPort);
    }
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Explanation */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/20">
              Interactive B2B Tool
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Container Freight & Cargo Estimator
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Planning a full container load (FCL) or consolidated consignment? Use our instant cargo configuration tool to calculate pallet spaces, carton volume, and payload tonnage before requesting a formal Pro-forma invoice.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>📋 Export Terms Supported:</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                FOB Chittagong Port • CIF Global Ports • CFR • Letter of Credit (LC at Sight) • Wire T/T
              </p>
            </div>
          </div>

          {/* Right Interactive Calculator Box */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/60 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              
              {/* Container Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  1. Container Specification
                </label>
                <select
                  value={containerType}
                  onChange={(e) => {
                    setContainerType(e.target.value);
                    if (e.target.value === '20ft') setPalletQty(Math.min(10, palletQty));
                  }}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="20ft">20ft Standard Dry Container (Max 10-11 Pallets)</option>
                  <option value="40ft">40ft High Cube Container (Max 22 Pallets)</option>
                  <option value="40ft-reefer">40ft Temperature-Controlled Reefer</option>
                </select>
              </div>

              {/* Destination Port */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  2. Destination Seaport
                </label>
                <select
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Jebel Ali, Dubai (UAE)">Jebel Ali Port, Dubai (UAE)</option>
                  <option value="Jeddah Islamic Port (KSA)">Jeddah Islamic Port (Saudi Arabia)</option>
                  <option value="Port of Felixstowe, London (UK)">Port of Felixstowe / London (UK)</option>
                  <option value="Port of New York / New Jersey (USA)">Port of New York / New Jersey (USA)</option>
                  <option value="Port of Montreal (Canada)">Port of Montreal (Canada)</option>
                  <option value="Port Klang (Malaysia)">Port Klang (Malaysia)</option>
                </select>
              </div>

              {/* Product Category Mix */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  3. Primary Agro Cargo
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Spices & Seasonings">Pure Ground Spices & Masala</option>
                  <option value="Pure Mustard Oil">Cold-Pressed Mustard Oil Bottles</option>
                  <option value="Aromatic Rice">Chinigura & Kalijeera Aromatic Rice</option>
                  <option value="Snacks & Bakery">Chanachur, Jhal Muri & Toast Biscuits</option>
                  <option value="Pickles & Jellies">Homestyle Pickles & Lychee Jellies</option>
                </select>
              </div>

              {/* Pallet Quantity Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    4. Pallet Allocation:
                  </label>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {palletQty} / {maxPallets} Pallets
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={maxPallets}
                  value={palletQty}
                  onChange={(e) => setPalletQty(Number(e.target.value))}
                  className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

            </div>

            {/* Output Calculation Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center mb-6">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Est. Cartons</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">{totalCartons.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Net Tonnage</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">~{estimatedWeightTon.toFixed(1)} MT</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Est. Cargo Value</span>
                <span className="text-lg font-black text-amber-500">${estimatedFobUsd.toLocaleString()} USD</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Transit Time</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">14-22 Days</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleGenerateQuote}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-black text-sm rounded-xl shadow-lg transition-transform active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>📩 Transfer Specs & Request Official Pro-forma Quote</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
