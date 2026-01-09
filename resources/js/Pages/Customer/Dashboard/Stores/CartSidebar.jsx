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
  storeName = "Al Fatah - Allama Iqbal Town (LHR)",
}) => {
  const [usePoints, setUsePoints] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const standardDelivery = cartItems.length > 0 ? 150 : 0;
  const serviceFee = cartItems.length > 0 ? 8.5 : 0;
  const packagingFee = cartItems.length > 0 ? 25 : 0;
  const discount = cartItems.length > 0 ? 99.05 : 0;
  const salesTax = subtotal * 0.05;
  const vat = subtotal * 0.05;
  const total =
    subtotal +
    standardDelivery +
    serviceFee +
    packagingFee -
    discount +
    salesTax +
    vat;

  // Loyalty points (mock calculation)
  const pointsEarned = Math.floor(subtotal * 5);
  const pointsWorth = (pointsEarned * 0.01).toFixed(1);

  return (
    <div className="relative flex flex-col bg-white rounded-xl border border-[#C8C8C8] shadow-lg">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center z-10 transition-colors shadow-md"
      >
        <X className="w-4 h-4 text-white" />
      </button>

      <div className="flex flex-col">
        {cartItems.length === 0 ? (
          <>
            {/* Empty Cart State */}
            <div className="p-4 sm:p-6">
              {/* Delivery Mode Toggle */}
              <div className="flex overflow-hidden gap-2 mb-4">
                <button
                  onClick={() => setDeliveryMode("delivery")}
                  className={`flex-1 py-2.5 px-4 text-base sm:text-lg font-medium border border-[#C8C8C8] rounded-lg transition-colors ${
                    deliveryMode === "delivery"
                      ? "bg-[#EDEDED] text-[#686868]"
                      : "bg-gray-50 text-[#686868] hover:bg-gray-100"
                  }`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => setDeliveryMode("pickup")}
                  className={`flex-1 py-2.5 px-4 text-base sm:text-lg font-medium border border-[#C8C8C8] rounded-lg transition-colors ${
                    deliveryMode === "pickup"
                      ? "bg-[#EDEDED] text-[#686868]"
                      : "bg-gray-50 text-[#686868] hover:bg-gray-100"
                  }`}
                >
                  Pick-up
                  <p className="text-xs text-gray-400">Not available</p>
                </button>
              </div>

              {/* Select from lists */}
              <select className="w-full border border-[#C8C8C8] rounded-lg px-3 py-3 text-sm sm:text-base text-[#686868] cursor-pointer mb-6 focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D] transition-colors">
                <option>Select from my lists</option>
                <option>Weekly Shopping</option>
                <option>Favorites</option>
              </select>

              {/* Empty State */}
              <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src="/assets/Assets/logo.png"
                    alt="My Grocer"
                    className="h-24 sm:h-32 w-auto object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base text-[#6F9C3D] text-center font-semibold">
                  You haven't added anything to your cart!
                </p>
              </div>

              {/* Total */}
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center text-lg text-[#686868] gap-2">
                  <span className="font-bold">Total</span>
                  <span className="text-sm">(incl. fees and tax)</span>
                </div>
                <div className="text-2xl font-bold text-gray-400">Rs. 0.00</div>
              </div>

              {/* Checkout Button */}
              <div>
                <p className="text-[#686868] text-sm sm:text-base font-medium cursor-pointer hover:underline mb-3">
                  See summary
                </p>
                <button className="w-full bg-[#F2F2F2] border-2 border-[#C8C8C8] text-[#686868] py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold cursor-not-allowed transition-colors">
                  Review payment and address
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Cart with items */}
            <div className="flex-1 overflow-y-auto">
              {/* Delivery Time & Store Info */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#6F9C3D]/10">
                    <img
                      src="/assets/Assets/Customer/storepreview/board.svg"
                      alt="delivery"
                      className="w-8 h-6"
                    />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">
                      Standard (10 - 25 mins)
                    </span>
                    <span className="text-sm font-bold text-gray-800 mt-1 block">
                      Your order from {storeName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="p-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.weight}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-right">
                          <span className="text-sm font-semibold text-[#249B34] block">
                            RS. {(item.price * item.quantity).toFixed(0)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-xs text-gray-400 line-through">
                              RS. {(item.originalPrice * item.quantity).toFixed(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 bg-white border border-[#6F9C3D]/20 rounded-full px-2 py-1">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                onUpdateQuantity &&
                                  onUpdateQuantity(item.id, item.quantity - 1);
                              } else {
                                onRemoveItem && onRemoveItem(item.id);
                              }
                            }}
                            className="w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            {item.quantity > 1 ? (
                              <Minus className="w-3 h-3" />
                            ) : (
                              <Trash2 className="w-3 h-3" />
                            )}
                          </button>
                          <span className="text-sm font-medium text-[#6F9C3D] w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              onUpdateQuantity &&
                                onUpdateQuantity(item.id, item.quantity + 1);
                            }}
                            className="w-6 h-6 flex items-center justify-center text-[#6F9C3D] hover:bg-[#6F9C3D]/10 rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="space-y-2 text-sm text-gray-800">
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
                    <span>Rs. {salesTax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (5%)</span>
                    <span>Rs. {vat.toFixed(0)}</span>
                  </div>
                </div>
              </div>

              {/* Loyalty Points */}
              <div className="px-4 py-3 border-t border-gray-100">
                <p className="text-sm font-medium text-[#6F9C3D] mb-2">
                  Loyalty points
                </p>
                <div className="space-y-1 text-sm text-gray-800">
                  <div className="flex justify-between">
                    <span>Total points added</span>
                    <span>{pointsEarned.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Worth</span>
                    <span>Rs. {pointsWorth}</span>
                  </div>
                </div>
              </div>

              {/* Use Points Checkbox */}
              <div className="px-4 py-3">
                <label className="flex justify-start items-center gap-3">
                  <input
                    type="checkbox"
                    checked={usePoints}
                    onChange={(e) => setUsePoints(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-[#6F9C3D] focus:ring-[#6F9C3D] focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm text-gray-800">
                    Select to redeem points and use wallet amount in this order.
                  </span>
                </label>
              </div>
            </div>

            {/* Bottom section with total and checkout */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              {/* Total */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-base font-bold text-gray-900">Total (incl. fees and tax)</span>
                  <span className="text-lg font-bold text-gray-900">Rs. {total.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline">
                  See Summary
                </p>
              </div>

              {/* Checkout Button */}
              <Link
                href="/customer/checkout"
                className="block w-full bg-[#FF8829] hover:bg-[#e67a24] text-white py-3 sm:py-4 rounded-lg font-semibold transition-colors text-center text-base sm:text-lg shadow-md hover:shadow-lg"
              >
                Go to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
