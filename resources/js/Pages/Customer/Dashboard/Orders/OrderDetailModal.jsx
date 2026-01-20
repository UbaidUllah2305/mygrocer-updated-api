// src/Pages/Customer/OrderDetailModal.jsx
import React from "react";
import { X, Check } from "lucide-react";

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  // Mock order items (in real app, this would come from props)
  const orderItems = [
    { name: "1 x Olper's Full Cream Milk 1500ml", price: "Rs. 347.00" },
    { name: "1 x Nescafe Classic 1", price: "Rs. 26.00" },
    { name: "1 x Peri peri sauce", price: "Rs. 172.00" },
    { name: "6 x Large Eggs", price: "Rs. 180.00" },
  ];

  // Helper for step status
  // 1: Confirmed, 2: Processing, 3: Prepared, 4: Dispatched, 5: Out for Delivery, 6: Delivered
  const currentStep = order?.statusStep || 2;

  const steps = [
    { step: 1, label: "Confirmed" },
    { step: 2, label: "Processing" },
    { step: 3, label: "Prepared" },
    { step: 4, label: "Dispatched" },
    { step: 5, label: "Out for Delivery" },
    { step: 6, label: "Delivered" },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 z-20">
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            Order Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-8 flex-1 min-h-0">
          {/* Store Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="w-20 h-20 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center shrink-0">
              <img src={order?.image} alt="Store" className="w-12 h-12 object-contain opacity-80" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#6F9C3D]" style={{ fontFamily: "'Inter', sans-serif" }}>
                {order?.store || "Store Name"}
              </h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-1 mt-2 text-sm text-gray-500">
                <p>Date: <span className="font-medium text-gray-900">{order?.date || "12-09-2025"}</span></p>
                <p>Time: <span className="font-medium text-gray-900">{order?.time || "12:09 pm"}</span></p>
                <p>Order ID: <span className="font-medium text-gray-900">#829102</span></p>
              </div>
            </div>
          </div>

          {/* Progress Tracker (Stepper) */}
          <div className="relative">
            {/* Desktop Stepper */}
            <div className="hidden md:flex justify-between items-start relative z-10 w-full px-4">
              {/* Connecting Line */}
              <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-10 rounded-full">
                <div
                  className="h-full bg-[#6F9C3D] rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>

              {steps.map((s) => (
                <div key={s.step} className="flex flex-col items-center gap-2 group cursor-default">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-4 transition-all duration-300 ${s.step <= currentStep
                      ? "bg-[#6F9C3D] border-white text-white shadow-md scale-110"
                      : "bg-white border-gray-100 text-gray-400"
                      }`}
                  >
                    {s.step < currentStep ? <Check size={16} strokeWidth={3} /> : s.step}
                  </div>
                  <span className={`text-xs font-semibold whitespace-nowrap px-2 py-1 rounded-md transition-colors ${s.step <= currentStep ? "text-[#6F9C3D]" : "text-gray-400"
                    }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile Vertical Stepper */}
            <div className="md:hidden flex flex-col gap-0 pl-4 border-l-2 border-gray-100 ml-4 space-y-6">
              {steps.map((s) => (
                <div key={s.step} className="relative pl-6">
                  <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-4 ${s.step <= currentStep
                    ? "bg-[#6F9C3D] border-white text-white shadow-sm"
                    : "bg-white border-gray-100 text-gray-400"
                    }`}>
                    {s.step < currentStep ? <Check size={14} /> : s.step}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${s.step <= currentStep ? "text-gray-900" : "text-gray-400"}`}>{s.label}</p>
                    {s.step === currentStep && <p className="text-xs text-[#6F9C3D] font-medium mt-0.5 animate-pulse">In Progress</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items & Totals */}
          <div className="grid md:grid-cols-3 gap-8 border-t border-gray-100 pt-8">
            {/* Items List */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-semibold text-gray-900 mb-2">Items</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-start text-sm group">
                    <span className="text-gray-700 font-medium">{item.name}</span>
                    <span className="text-gray-900 font-bold whitespace-nowrap ml-4">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mt-4 px-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. 545</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>Rs. 159</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Service Fee</span>
                  <span>Rs. 8.56</span>
                </div>
                <div className="flex justify-between text-sm text-[#6F9C3D] font-medium">
                  <span>Discount</span>
                  <span>- Rs. 99.05</span>
                </div>
              </div>
            </div>

            {/* Total Card */}
            <div className="md:col-span-1">
              <div className="bg-[#6F9C3D] bg-opacity-10 rounded-2xl p-5 h-full flex flex-col justify-center">
                <p className="text-xs text-[#5a8030] bg-[#6F9C3D] bg-opacity-20 px-2 py-1 rounded inline-block self-start mb-2 font-medium">
                  Paid via Cash
                </p>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-sm text-gray-600 font-medium">Total Amount</span>
                </div>
                <div className="text-3xl font-extrabold text-[#6F9C3D] mt-1">
                  Rs. 638.51
                </div>
                <p className="text-xs text-gray-500 mt-2">Inclusive of all taxes</p>

                {/* <button className="w-full mt-6 py-2.5 bg-[#6F9C3D] text-white rounded-lg font-semibold shadow-lg shadow-green-200 hover:shadow-xl hover:bg-[#5f8634] transition-all text-sm">
                  Download Invoice
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;