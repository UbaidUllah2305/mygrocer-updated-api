import React from "react";

const OrderSummary = ({ cartItems, storeName, subtotal, deliveryFee, serviceFee, packagingFee, discount, total }) => {
  return (
    <div className="bg-[#6F9C3D29] rounded-xl p-6 shadow-sm border border-gray-100 w-full">
      {/* Header */}
      <div className="pb-4 mb-4">
        <h3 className="text-xl font-semibold mb-1">Your order from</h3>
        <p className="text-sm">{storeName}</p>
      </div>

      {/* Items */}
      <div className="border-b pb-4 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-1">
            <span>{item.quantity}× {item.name}</span>
            <span>Rs. {item.price}</span>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 text-sm pb-4 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. {subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Standard delivery</span>
          <span>Rs. {deliveryFee}</span>
        </div>
        <div className="flex justify-between">
          <span>Service fee</span>
          <span>Rs. {serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Packaging Fee</span>
          <span>Rs. {packagingFee}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>- Rs. {discount.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-bold text-gray-900">Total</p>
          <p className="text-xs">incl. fees and tax</p>
        </div>
        <p className="text-xl font-bold text-gray-900">
          Rs. {total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;