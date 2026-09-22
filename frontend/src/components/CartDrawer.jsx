import React, { useState } from 'react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckoutComplete 
}) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'form', 'success'
  const [orderType, setOrderType] = useState('retail'); // 'retail', 'wholesale_export'
  const [formData, setFormData] = useState({
    name: 'Tanvir Ahmed',
    email: 'tanvir@gmail.com',
    phone: '+8801712345678',
    country: 'Bangladesh',
    address: 'House 42, Road 11, Sector 4, Uttara, Dhaka - 1230',
    notes: 'Please ensure airtight delivery packing.'
  });
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = orderType === 'retail' ? (subtotal > 2000 ? 0 : 80) : 5000;
  const grandTotal = subtotal + deliveryCharge;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      order_number: `PRM-${new Date().getFullYear()}-${orderType === 'wholesale_export' ? 'EXP' : 'RET'}-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      shipping_address: formData.address,
      order_type: orderType,
      destination_country: formData.country,
      total_amount: grandTotal,
      items: cartItems.map(item => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.quantity * item.price
      })),
      notes: formData.notes
    };

    setCompletedOrder(newOrder);
    setCheckoutStep('success');
    if (onCheckoutComplete) {
      onCheckoutComplete(newOrder);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {checkoutStep === 'cart' ? 'Your Shopping Bag' : checkoutStep === 'form' ? 'Checkout Details' : 'Order Placed!'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {cartItems.length} items selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar">
            
            {/* STEP 1: CART ITEMS */}
            {checkoutStep === 'cart' && (
              <>
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {/* Order Type Toggle */}
                    <div className="p-2 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center gap-1 text-xs font-bold">
                      <button
                        onClick={() => setOrderType('retail')}
                        className={`flex-1 py-1.5 rounded-lg transition-all ${
                          orderType === 'retail' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        🏠 Domestic Retail
                      </button>
                      <button
                        onClick={() => setOrderType('wholesale_export')}
                        className={`flex-1 py-1.5 rounded-lg transition-all ${
                          orderType === 'wholesale_export' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        🚢 B2B Export / Bulk
                      </button>
                    </div>

                    {cartItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-lg bg-slate-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {item.weight} • ৳ {item.price}
                          </p>

                          {/* Quantity adjustments */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-bold text-slate-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                              >
                                +
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                                ৳ {(item.price * item.quantity).toFixed(2)}
                              </div>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-[10px] text-red-500 hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="text-5xl mb-3">🧺</div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Your bag is empty</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      Explore Prome's spices, aromatic rice, mustard oil and snacks to add to your order.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CHECKOUT FORM */}
            {checkoutStep === 'form' && (
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Customer / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Destination Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Delivery Address / Port Details *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Special Packaging / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Payment Method:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {orderType === 'retail' ? 'bKash / Cash on Delivery' : 'Letter of Credit (LC) / TT'}
                    </span>
                  </div>
                </div>
              </form>
            )}

            {/* STEP 3: SUCCESS INVOICE */}
            {checkoutStep === 'success' && completedOrder && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 text-2xl font-bold mb-3">
                  ✓
                </div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  Order Successfully Placed!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Thank you for choosing Prome Agro Foods Limited.
                </p>

                {/* Receipt Box */}
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-left font-mono text-xs space-y-1.5">
                  <div className="flex justify-between border-b pb-1.5 border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Order ID:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{completedOrder.order_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Client:</span>
                    <span className="text-slate-900 dark:text-white">{completedOrder.customer_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destination:</span>
                    <span className="text-slate-900 dark:text-white">{completedOrder.destination_country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Items:</span>
                    <span className="text-slate-900 dark:text-white">{completedOrder.items.length} Product(s)</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-slate-200 dark:border-slate-700 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    <span>Total Amount:</span>
                    <span>৳ {completedOrder.total_amount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => {
                      setCheckoutStep('cart');
                      onClose();
                    }}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl text-xs font-bold"
                  >
                    🖨️ Print
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer & Checkout Buttons */}
          {cartItems.length > 0 && checkoutStep !== 'success' && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Subtotal:</span>
                  <span>৳ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Shipping & Freight:</span>
                  <span>৳ {deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Grand Total:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">৳ {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('form')}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-700/25 transition-all"
                >
                  Proceed to Checkout ({orderType === 'retail' ? 'Retail' : 'Export/Bulk'})
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="px-4 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-700/25 transition-all"
                  >
                    Confirm & Place Order (৳ {grandTotal.toFixed(2)})
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
