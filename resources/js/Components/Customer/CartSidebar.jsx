import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { X, Plus, Minus, Trash2 } from "lucide-react";

const CartSidebar = ({
  cartItems,
  deliveryMode,
  setDeliveryMode,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  storeName = "Al Fatah - Allama Iqbal Town (LHR)"
}) => {
  const [usePoints, setUsePoints] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const standardDelivery = cartItems.length > 0 ? 150 : 0;
  const serviceFee = cartItems.length > 0 ? 8.50 : 0;
  const packagingFee = cartItems.length > 0 ? 25 : 0;
  const discount = cartItems.length > 0 ? 99.05 : 0;
  const salesTax = subtotal * 0.05;
  const vat = subtotal * 0.05;
  const total = subtotal + standardDelivery + serviceFee + packagingFee - discount + salesTax + vat;

  // Loyalty points (mock calculation)
  const pointsEarned = Math.floor(subtotal * 5);
  const pointsWorth = (pointsEarned * 0.01).toFixed(1);

  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-[#C8C8C8]">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center z-10"
      >
        <X className="w-4 h-4 text-white" />
      </button>

      {cartItems.length === 0 ? (
        <>
          {/* Empty Cart State */}
          {/* Delivery Mode Toggle */}
          <div className="p-4">
            <div className="flex overflow-hidden gap-2.5">
              <button
                onClick={() => setDeliveryMode("delivery")}
                className={`flex-1 py-2 px-4 text-lg sm:text-xl font-normal h-13 border border-[#C8C8C8] rounded-lg transition ${deliveryMode === "delivery"
                  ? "bg-[#EDEDED] text-[#686868]"
                  : "bg-gray-50 text-[#686868]"
                  }`}
              >
                Delivery
              </button>
              <button
                onClick={() => setDeliveryMode("pickup")}
                className={`flex-1 py-1 px-4 text-lg sm:text-xl font-normal h-13 border border-[#C8C8C8] rounded-lg transition ${deliveryMode === "pickup"
                  ? "bg-[#EDEDED] text-[#686868]"
                  : "bg-gray-50 text-[#686868]"
                  }`}
              >
                Pick-up
                <p className="text-xs text-gray-400 text-center">Not available</p>
              </button>
            </div>
          </div>

          {/* Select from lists */}
          <div className="p-4">
            <select className="w-full h-12 border border-[#C8C8C8] rounded-lg px-3 py-2 text-sm sm:text-base text-[#686868]">
              <option>Select from my lists</option>
              <option>Weekly Shopping</option>
              <option>Favorites</option>
            </select>
          </div>

          {/* Empty State */}
          <div className="p-6 min-h-[200px] flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/assets/Assets/logo.png"
                alt="My Grocer"
                className="h-34 w-36 object-contain"
              />
            </div>
            <p
              className="text-sm sm:text-base text-[#6F9C3D] text-center font-semibold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              You haven't added anything to your cart!
            </p>
          </div>

          {/* Total */}
          <div className="p-4 mt-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-lg sm:text-xl font-bold text-gray-800">Total</span>
              <span className="text-lg sm:text-xl text-gray-400">(incl. fees and tax)</span>
            </div>
            <p className="text-[#686868] text-base sm:text-lg font-bold cursor-pointer hover:underline">
              See summary
            </p>
          </div>

          {/* Checkout Button */}
          <div className="p-4">
            <button className="w-full bg-[#F2F2F2] border-2 border-[#C8C8C8] text-[#686868] py-3 rounded-lg font-bold cursor-not-allowed">
              Review payment and address
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Delivery Time & Store Info */}
          <div className="p-4">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <img
                  src="/assets/Assets/Customer/storepreview/board.svg"
                  alt="delivery"
                  className="w-8 h-6"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 text-center">Standard (10 - 25 mins)</span>
                <span className="text-sm font-bold text-gray-800 mt-1">
                  Your order from {storeName}
                </span>
              </div>
            </div>
          </div>

          {/* Cart Items — FULLY FUNCTIONAL */}
          <div className="p-4">
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-[#F2F2F2] rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-15 object-contain rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.weight}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-[#249B34] mb-1">
                      RS. {item.price}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-xs text-gray-400 line-through mb-1">
                        RS. {item.originalPrice}
                      </span>
                    )}
                    <div className="flex items-center gap-1 bg-[#6F9C3D29] rounded-full px-2 py-1">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            onUpdateQuantity && onUpdateQuantity(item.id, item.quantity - 1);
                          } else {
                            onRemoveItem && onRemoveItem(item.id);
                          }
                        }}
                        className="w-6 h-6 flex items-center justify-center text-[#000000] transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-medium text-[#6F9C3D] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1);
                        }}
                        className="w-6 h-6 flex items-center justify-center text-[#000000] transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items you've bought before section */}
          <div className="px-4 py-2">
            <p className="text-base font-semibold text-[#000000] mb-2">Items you've bought before</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {cartItems.slice(0, 4).map((item, idx) => (
                <div key={idx} className="shrink-0 w-[120px] bg-white rounded-lg p-2 flex flex-col items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain mb-2"
                  />
                  <div className="text-center mb-1">
                    <span className="text-sm font-semibold text-[#6F9C3D]">
                      RS. {item.price}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-xs text-gray-400 line-through block">
                        RS. {item.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-center text-xs text-gray-800 font-medium truncate max-w-full">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {item.weight}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="px-4 py-2">
            <div className="space-y-2 text-sm text-[#000000]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Standard delivery</span>
                <span>Rs. {standardDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>Rs. {serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Packaging Fee</span>
                <span>Rs. {packagingFee}</span>
              </div>
              <div className="flex justify-between text-[#6F9C3D]">
                <span>Discount</span>
                <span>- Rs. {discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax (5%)</span>
                <span>Rs.{salesTax.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (5 %)</span>
                <span>Rs. {vat.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Loyalty Points */}
          <div className="px-4 py-2">
            <p className="text-sm font-medium text-[#6F9C3D] mb-2">Loyalty points</p>
            <div className="space-y-1 text-sm text-[#000000]">
              <div className="flex justify-between">
                <span>Total points added</span>
                <span>{pointsEarned.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Worth</span>
                <span>Rs.{pointsWorth}</span>
              </div>
            </div>
          </div>

          {/* Use Points Checkbox */}
          <div className="px-4 py-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={usePoints}
                onChange={(e) => setUsePoints(e.target.checked)}
                className="w-7 h-7 mt-0.5 rounded border-gray-300 text-[#6F9C3D] focus:ring-[#6F9C3D]"
              />
              <span className="text-sm text-[#000000]">
                Select to redeem points and use wallet amount in this order.
              </span>
            </label>
          </div>

          {/* Total */}
          <div className="px-4 py-2">
            <div className="flex justify-between items-center mb-1 text-base font-bold">
              <span>Total(incl. fees and tax)</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
            <p className="text-[#000000AB] text-base cursor-pointer hover:underline">
              See Summary
            </p>
          </div>

          {/* Checkout Button */}
          <div className="p-4">
            <Link
              href="/customer/checkout"
              className="block w-full bg-[#FF8829] hover:bg-[#e67a24] text-lg text-white py-3 rounded-lg font-semibold transition text-center"
            >
              Go to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;