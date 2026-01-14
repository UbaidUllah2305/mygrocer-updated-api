import React from "react";
import { Link } from "@inertiajs/react";

const OrderSummaryCard = ({ orderData }) => {
  return (
    <div className="bg-[#6F9C3D29] rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left - Order Items */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">Your order from</h3>
          <p className="text-sm mb-3">{orderData.storeName}</p>

          <button className="text-[#6F9C3D] text-sm font-semibold mb-4 hover:underline">
            Order Summary
          </button>

          <div className="space-y-2">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm font-medium">
                <span>
                  {item.quantity} × {item.name}
                </span>
                <span>Rs. {item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Price Breakdown */}
        <div className="lg:w-64">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {orderData.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard delivery Charges</span>
              <span>Rs. {orderData.deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>Rs. {orderData.serviceFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Packaging Fee</span>
              <span>Rs. {orderData.packagingFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>- Rs. {orderData.discount}</span>
            </div>
          </div>

          {/* Total */}
          <div className="mt-4 pt-4 border-t border-gray-300">
            <div className="bg-[#C7D5B8] rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold">Total</p>
                  <p className="text-sm">(incl. fees and tax)</p>
                </div>
                <p className="text-xl font-bold">Rs. {orderData.total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;