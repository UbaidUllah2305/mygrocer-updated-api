import React, { useState, useEffect } from "react";
import OrdersTable from "./OrdersTable";
import OrderDetailModal from "./OrderDetailModal";
import OrderProcessingModal from "./OrderProcessingModal";
import OrderInProgressModal from "./OrderInProgressModal";
import OrderReadyModal from "./OrderReadyModal";
import OrderDispatchedModal from "./OrderDispatchedModal";
import OrderDeliveredModal from "./OrderDeliveredModal";
import OrderRejectedModal from "./OrderRejectedModal";

const Orders = () => {
  const [viewingOrder, setViewingOrder] = useState(null);
  const [processingOrder, setProcessingOrder] = useState(null);
  const [inProgressOrder, setInProgressOrder] = useState(null);
  const [readyOrder, setReadyOrder] = useState(null);
  const [dispatchedOrder, setDispatchedOrder] = useState(null);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const [rejectedOrder, setRejectedOrder] = useState(null);
  const [acceptedItems, setAcceptedItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock order data
  const orders = [
    { id: 1, orderNumber: "ORD-07", customer: "Noor Fatima", phone: "03487654323", paymentTerms: "Cash", totalAmount: "1,200", status: "New" },
    { id: 2, orderNumber: "ORD-06", customer: "Noor Fatima", phone: "03487654323", paymentTerms: "Cash", totalAmount: "1,200", status: "Pending" },
    { id: 3, orderNumber: "ORD-05", customer: "Noor Fatima", phone: "03487654323", paymentTerms: "Cash", totalAmount: "1,200", status: "Processing" },
    { id: 4, orderNumber: "ORD-04", customer: "Noor Fatima", phone: "03487654323", paymentTerms: "Cash", totalAmount: "1,200", status: "Ready" },
    { id: 5, orderNumber: "ORD-03", customer: "Noor Fatima", phone: "03487654323", paymentTerms: "Cash", totalAmount: "1,200", status: "Dispatched" },
    { id: 6, orderNumber: "ORD-02", customer: "Noor Fatima", phone: "03487654323", paymentTerms: "Cash", totalAmount: "1,200", status: "Delivered" },
    { id: 7, orderNumber: "ORD-01", customer: "Noor Fatima", phone: "03487654323", paymentTerms: "Cash", totalAmount: "1,200", status: "Canceled" },
  ];

  const filteredOrders =
    activeFilter === "all"
      ? orders
      : orders.filter((order) => {
          switch (activeFilter) {
            case "new": return order.status === "New";
            case "pending": return order.status === "Pending";
            case "processing": return order.status === "Processing";
            case "ready": return order.status === "Ready";
            case "dispatched": return order.status === "Dispatched";
            case "delivered": return order.status === "Delivered";
            case "canceled": return order.status === "Canceled";
            default: return false;
          }
        });

  const getStatusColor = (status) => {
    switch (status) {
      case "New": return "text-black";
      case "Pending": return "text-[#C33100]";
      case "Processing": return "text-[#E978FF]";
      case "Ready": return "text-[#FF8829]";
      case "Dispatched": return "text-[#2F47FF]";
      case "Delivered": return "text-[#6F9C3D]";
      case "Canceled": return "text-[#FF2121]";
      default: return "text-gray-500";
    }
  };

  const handleCallCustomer = () => {
    // You can implement actual calling logic here
    console.log("Calling customer...");
  };

  const handlePrintOrder = () => {
    console.log("Printing order...");
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Orders</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage and track customer orders</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-[#e1f6d8] rounded-lg p-4 text-center text-xl font-medium">
          <div>Total Orders : 5</div>
        </div>
        <div className="bg-[#e1f6d8] rounded-lg p-4 text-center text-xl font-medium">
          <div>Pending : 1</div>
        </div>
        <div className="bg-[#e1f6d8] rounded-lg p-4 text-center text-xl font-medium">
          <div>Processing : 1</div>
        </div>
        <div className="bg-[#e1f6d8] rounded-lg p-4 text-center text-xl font-medium">
          <div>Delivered : 1</div>
        </div>
        <div className="bg-[#e1f6d8] rounded-lg p-4 text-center text-xl font-medium">
          <div>Canceled : 2</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-medium">Order Details</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center rounded-xl px-2 py-1 space-x-1 border border-gray-300 bg-white shadow-sm">
            {[
              { label: "All", value: "all" },
              { label: "New", value: "new" },
              { label: "Pending", value: "pending" },
              { label: "Processing", value: "processing" },
              { label: "Ready", value: "ready" },
              { label: "Dispatched", value: "dispatched" },
              { label: "Delivered", value: "delivered" },
              { label: "Canceled", value: "canceled" },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={`px-3 py-1.5 rounded-xl text-base transition whitespace-nowrap ${
                  activeFilter === value
                    ? "bg-[#6F9C3D] text-white"
                    : "text-gray-500 hover:bg-white hover:text-[#3a3e47]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Reusable Table */}
      <OrdersTable
        orders={filteredOrders}
        onViewOrder={setViewingOrder}
        onCallCustomer={handleCallCustomer}
        onPrintOrder={handlePrintOrder}
        getStatusColor={getStatusColor}
      />

      {/* Modals (unchanged) */}
      {viewingOrder && (
        <OrderDetailModal
          order={{
            ...viewingOrder,
            date: "12-09-2025",
            time: "12:09 pm",
            customer: "Noor Fatima",
            phone: "0938437637",
            address: "House 78, Garden Town, Lahore",
            paymentTerms: "Cash",
            subtotal: "1,500",
            deliveryFee: "50",
            totalAmount: "1,550",
            items: [
              { category: "Daily Grocery", item: "Olpear's Milk Pack", quantity: 2, quantityDetail: "(230)", unit: "ml", loyaltyPoints: "00", price: "1,000" },
              { category: "Fresh Food", item: "Apples", quantity: 5, quantityDetail: "(3)", unit: "Kg", loyaltyPoints: "00", price: "500" },
            ],
          }}
          onClose={() => setViewingOrder(null)}
          onAcceptOrder={(order, selectedItems) => {
            setViewingOrder(null);
            setAcceptedItems(selectedItems);
            setProcessingOrder({ ...order, status: "Pending", deliveryFee: "150", totalAmount: "1650" });
          }}
          onRejectOrder={(order) => {
            setViewingOrder(null);
            setRejectedOrder({ ...order, status: "Cancelled", rejectionReason: "Items are currently out of stock" });
          }}
        />
      )}

      {processingOrder && (
        <OrderProcessingModal
          order={processingOrder}
          selectedItems={acceptedItems}
          onClose={() => { setProcessingOrder(null); setAcceptedItems([]); }}
          onStartProcessing={(order) => {
            setProcessingOrder(null);
            setInProgressOrder({ ...order, status: "Processing", deliveryFee: "30", totalAmount: "1530", scheduledDelivery: "2024-11-27 • 3:00 PM - 6:00 PM" });
          }}
        />
      )}

      {inProgressOrder && (
        <OrderInProgressModal
          order={inProgressOrder}
          selectedItems={acceptedItems}
          onClose={() => { setInProgressOrder(null); setAcceptedItems([]); }}
          onMarkAsReady={(order) => {
            setInProgressOrder(null);
            setReadyOrder({ ...order, status: "Ready" });
          }}
        />
      )}

      {readyOrder && (
        <OrderReadyModal
          order={readyOrder}
          selectedItems={acceptedItems}
          onClose={() => { setReadyOrder(null); setAcceptedItems([]); }}
          onDispatchOrder={(order) => {
            setReadyOrder(null);
            setDispatchedOrder({ ...order, status: "Dispatched", riderName: "Muhammad Ali", riderPhone: "0321-1234567" });
          }}
        />
      )}

      {dispatchedOrder && (
        <OrderDispatchedModal
          order={dispatchedOrder}
          selectedItems={acceptedItems}
          onClose={() => { setDispatchedOrder(null); setAcceptedItems([]); }}
          onMarkAsDelivered={(order) => {
            setDispatchedOrder(null);
            setDeliveredOrder({
              ...order,
              status: "Delivered",
              deliveredAt: new Date().toLocaleString("en-US", {
                year: "numeric", month: "2-digit", day: "2-digit",
                hour: "numeric", minute: "2-digit", hour12: true
              }).replace(",", " •"),
            });
          }}
        />
      )}

      {deliveredOrder && (
        <OrderDeliveredModal
          order={deliveredOrder}
          selectedItems={acceptedItems}
          onClose={() => { setDeliveredOrder(null); setAcceptedItems([]); }}
        />
      )}

      {rejectedOrder && (
        <OrderRejectedModal
          order={rejectedOrder}
          onClose={() => setRejectedOrder(null)}
        />
      )}
    </>
  );
};

export default Orders;