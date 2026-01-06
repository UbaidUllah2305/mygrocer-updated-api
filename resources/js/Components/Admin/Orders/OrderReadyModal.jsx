// resources/js/Components/OrderReadyModal.jsx
import React from 'react';

const OrderReadyModal = ({ order, selectedItems = [], onClose, onDispatchOrder }) => {
  // Use selected items if provided, otherwise use default items
  const items = selectedItems.length > 0 ? selectedItems : (order.items || [
    { category: "Daily Grocery", item: "Olpear's Milk Pack", quantity: "2", loyaltyPoints: "00", price: "500" },
    { category: "Fresh Food", item: "Apples", quantity: "1 kg", loyaltyPoints: "00", price: "1,000" },
  ]);

  // Calculate totals based on selected items
  const subtotal = order.subtotal || "1500";
  const deliveryFee = order.deliveryFee || "30";
  const totalAmount = order.totalAmount || "1530";
  const scheduledDelivery = order.scheduledDelivery || "2024-11-27 • 3:00 PM - 6:00 PM";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="relative bg-white rounded-xl w-full max-w-[95vw] lg:max-w-[1131px] max-h-[95vh] overflow-y-auto shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 sm:top-0 sm:right-0 z-10"
          aria-label="Close"
        >
          <div className="w-[30px] h-[30px] flex items-center justify-center">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#DF3A3A"/>
              <path d="M10 10L20 20M20 10L10 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </button>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-7">
          
          {/* Header Section: Avatar + Order Details + Customer Info */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 pb-3 lg:pb-4 mb-3 lg:mb-4 border-b-2 border-gray-200">
            
            {/* Avatar */}
            <div className="flex justify-center lg:justify-start shrink-0">
              <div className="w-20 h-20 sm:w-[100px] sm:h-[100px] lg:w-[130px] lg:h-[130px] bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>

            {/* Info Container */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12 flex-1">
              
              {/* Order Details */}
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2c323c] mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  Order Details
                </h2>
                <div className="space-y-0.5 text-sm sm:text-base lg:text-xl font-medium text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <p>Order Details : {order.orderNumber || "ORD-02"}</p>
                  <p>Date : {order.date || "12-09-2025"}</p>
                  <p>Time : {order.time || "12:09 pm"}</p>
                  <p>Status : <span className="text-green-500">Ready</span></p>
                </div>
              </div>

              {/* Customer Information */}
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2c323c] mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  Customer Information
                </h2>
                <div className="space-y-0.5 text-sm sm:text-base lg:text-xl font-medium text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <p>Name : {order.customer || "Ahmed"}</p>
                  <p>Phone : {order.phone || "0938437637"}</p>
                  <p>Address : {order.address || "House 78,Garden Town, Lahore"}</p>
                  <p>Payment : {order.paymentTerms || "Cash"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scheduled Delivery Banner */}
          {/* <div className="bg-[rgba(111,156,61,0.34)] border border-[#6f9c3d] rounded-xl py-3 sm:py-4 lg:py-[15px] px-4 sm:px-6 lg:px-[57px] mb-4 lg:mb-6">
            <p className="text-[#3a3e47] font-medium text-sm sm:text-lg lg:text-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              Scheduled Delivery: {scheduledDelivery}
            </p>
          </div> */}

          {/* Order Details Banner */}
          <div className="bg-[rgba(111,156,61,0.31)] rounded-xl py-2 sm:py-3 lg:py-3 mb-3 lg:mb-4">
            <h3 className="text-center text-[#3a3e47] font-semibold text-base sm:text-xl lg:text-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              Order Details
            </h3>
          </div>

          {/* Order Items Table - Simplified (No checkboxes) */}
          <div className="mb-4 lg:mb-6">
            
            {/* === DESKTOP HEADER === */}
            <div className="hidden lg:block bg-[rgba(111,156,61,0.16)] rounded-xl px-7 py-[18px]">
              <div className="grid grid-cols-5 gap-4 text-xl font-medium text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div>Category</div>
                <div>Item</div>
                <div className="text-center">Quantity</div>
                <div className="text-center">Loyalty Points</div>
                <div className="text-right">Price</div>
              </div>
            </div>

            {/* === TABLET HEADER === */}
            <div className="hidden sm:block lg:hidden bg-[rgba(111,156,61,0.16)] rounded-xl px-4 py-3">
              <div className="grid grid-cols-5 gap-2 text-sm font-medium text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div>Category</div>
                <div>Item</div>
                <div className="text-center">Qty</div>
                <div className="text-center">Loyalty</div>
                <div className="text-right">Price</div>
              </div>
            </div>

            {/* === TABLE ROWS === */}
            <div className="space-y-0">
              {items.map((item, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === items.length - 1;
                
                return (
                  <div key={idx}>
                    {/* Mobile View */}
                    <div className={`sm:hidden bg-[rgba(216,216,216,0.23)] p-4 ${
                      isFirst ? 'rounded-t-xl' : ''
                    } ${isLast ? 'rounded-b-xl' : 'border-b border-[#b9bbbd]'}`}>
                      <div className="space-y-2 text-sm" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Category:</span>
                          <span className="text-black">{item.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Item:</span>
                          <span className="text-black">{item.item}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Quantity:</span>
                          <span className="text-black">{item.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Loyalty Points:</span>
                          <span className="text-black">{item.loyaltyPoints}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Price:</span>
                          <span className="text-black font-medium">{item.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tablet View */}
                    <div className={`hidden sm:block lg:hidden bg-[rgba(216,216,216,0.23)] px-4 py-3 ${
                      isFirst ? 'rounded-t-xl' : ''
                    } ${isLast ? 'rounded-b-xl' : 'border-b border-[#b9bbbd]'}`}>
                      <div className="grid grid-cols-5 gap-2 items-center text-sm" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                        <div className="text-black">{item.category}</div>
                        <div className="text-black">{item.item}</div>
                        <div className="text-center text-black">{item.quantity}</div>
                        <div className="text-center text-black">{item.loyaltyPoints}</div>
                        <div className="text-right text-black">{item.price}</div>
                      </div>
                    </div>

                    {/* Desktop View */}
                    <div className={`hidden lg:block bg-[rgba(216,216,216,0.23)] px-7 py-[15px] ${
                      isFirst ? 'rounded-t-xl' : ''
                    } ${isLast ? 'rounded-b-xl' : 'border-b border-[#b9bbbd]'}`}>
                      <div className="grid grid-cols-5 gap-4 items-center text-xl" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                        <div className="text-black">{item.category}</div>
                        <div className="text-black">{item.item}</div>
                        <div className="text-center text-black">{item.quantity}</div>
                        <div className="text-center text-black">{item.loyaltyPoints}</div>
                        <div className="text-right text-black">{item.price}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end mb-6 lg:mb-8">
            <div className="text-right space-y-1">
              <p className="text-base sm:text-lg lg:text-xl font-medium text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                Subtotal : Rs. {subtotal}
              </p>
              <p className="text-base sm:text-lg lg:text-xl font-medium text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                Delivery Fee (Scheduled) : Rs. {deliveryFee}
              </p>
              <div className="bg-[rgba(111,156,61,0.16)] inline-block px-4 sm:px-6 lg:px-7 py-3 lg:py-[18px] rounded-xl mt-2">
                <span className="text-base sm:text-lg lg:text-xl font-medium text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Total Amount : Rs. {totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button - Single Centered Button */}
          <div className="flex justify-center">
            <button
              className="bg-[#6f9c3d] hover:bg-[#5d8a32] text-white px-8 py-3 sm:py-4 lg:py-4 rounded-xl font-medium text-base sm:text-lg lg:text-2xl transition w-full sm:w-auto sm:min-w-[400px] lg:min-w-[665px]"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={() => {
                if (onDispatchOrder) {
                  onDispatchOrder(order);
                } else {
                  alert("Order dispatched!");
                  onClose();
                }
              }}
            >
              Dispatch Order
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderReadyModal;

