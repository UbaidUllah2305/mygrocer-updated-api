import React, { useState, useEffect } from "react";
import OrderDetailModal from "../../../../Components/Admin/Orders/OrderDetailModal";
import OrderProcessingModal from "../../../../Components/Admin/Orders/OrderProcessingModal";
import OrderInProgressModal from "../../../../Components/Admin/Orders/OrderInProgressModal";
import OrderReadyModal from "../../../../Components/Admin/Orders/OrderReadyModal";
import OrderDispatchedModal from "../../../../Components/Admin/Orders/OrderDispatchedModal";
import OrderDeliveredModal from "../../../../Components/Admin/Orders/OrderDeliveredModal";
import OrderRejectedModal from "../../../../Components/Admin/Orders/OrderRejectedModal";

const Orders = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [processingOrder, setProcessingOrder] = useState(null);
  const [inProgressOrder, setInProgressOrder] = useState(null);
  const [readyOrder, setReadyOrder] = useState(null);
  const [dispatchedOrder, setDispatchedOrder] = useState(null);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const [rejectedOrder, setRejectedOrder] = useState(null);
  const [acceptedItems, setAcceptedItems] = useState([]);

  // Mock order data
  const orders = [
    {
      id: 1,
      orderNumber: "ORD-07",
      customer: "Noor Fatima",
      phone: "03487654323",
      paymentTerms: "Cash",
      totalAmount: "1,200",
      status: "New",
    },
    {
      id: 2,
      orderNumber: "ORD-06",
      customer: "Noor Fatima",
      phone: "03487654323",
      paymentTerms: "Cash",
      totalAmount: "1,200",
      status: "Pending",
    },
    {
      id: 3,
      orderNumber: "ORD-05",
      customer: "Noor Fatima",
      phone: "03487654323",
      paymentTerms: "Cash",
      totalAmount: "1,200",
      status: "Processing",
    },
    {
      id: 4,
      orderNumber: "ORD-04",
      customer: "Noor Fatima",
      phone: "03487654323",
      paymentTerms: "Cash",
      totalAmount: "1,200",
      status: "Ready",
    },
    {
      id: 5,
      orderNumber: "ORD-03",
      customer: "Noor Fatima",
      phone: "03487654323",
      paymentTerms: "Cash",
      totalAmount: "1,200",
      status: "Dispatched",
    },
    {
      id: 6,
      orderNumber: "ORD-02",
      customer: "Noor Fatima",
      phone: "03487654323",
      paymentTerms: "Cash",
      totalAmount: "1,200",
      status: "Delivered",
    },
    {
      id: 7,
      orderNumber: "ORD-01",
      customer: "Noor Fatima",
      phone: "03487654323",
      paymentTerms: "Cash",
      totalAmount: "1,200",
      status: "Canceled",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredOrders =
    activeFilter === "all"
      ? orders
      : orders.filter((order) => {
          switch (activeFilter) {
            case "new":
              return order.status === "New";
            case "pending":
              return order.status === "Pending";
            case "processing":
              return order.status === "Processing";
            case "ready":
              return order.status === "Ready";
            case "dispatched":
              return order.status === "Dispatched";
            case "delivered":
              return order.status === "Delivered";
            case "canceled":
              return order.status === "Canceled";
            default:
              return false;
          }
        });

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "text-black";
      case "Pending":
        return "text-orange-500";
      case "Processing":
        return "text-purple-500";
      case "Ready":
        return "text-green-500";
      case "Dispatched":
        return "text-blue-500";
      case "Delivered":
        return "text-green-500";
      case "Canceled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-full text-[#161c2b]">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-medium">Order Details</h2>

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

      {/* ✅ Unified Table Logic — Like Adjustments Page */}
      <div className="overflow-x-auto mt-4">
        <div className="min-w-[850px]">
          {/* Table Header */}
          <div className="rounded-xl bg-[#6f9c3d4f] p-1.5 h-14 ">
            <div
              className="grid grid-cols-8 text-lg font-medium text-[#3a3e47]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <div className="text-center py-2 truncate">#</div>
              <div className="text-center py-2 truncate">Order #</div>
              <div className="text-center py-2 truncate">Customer</div>
              <div className="text-center py-2 truncate">Phone #</div>
              <div className="text-center py-2 truncate">Payment Terms</div>
              <div className="text-center py-2 truncate">Total Amount</div>
              <div className="text-center py-2 truncate">Status</div>
              <div className="text-center py-2 truncate">Order Details</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="mt-3 space-y-2">
            {filteredOrders.length === 0 ? (
              <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                No orders found.
              </div>
            ) : (
              filteredOrders.map((order, idx) => (
                <div
                  key={order.id}
                  className="rounded-xl bg-[#f7f7f7] p-1.5 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
                >
                  <div
                    className="grid grid-cols-8 gap-2 items-center text-lg font-normal"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {/* # */}
                    <div className="text-center py-2 truncate">{idx + 1}</div>
                    {/* Order # */}
                    <div className="text-center py-2 truncate">
                      {order.orderNumber}
                    </div>
                    {/* Customer */}
                    <div className="text-center py-2 truncate">
                      {order.customer}
                    </div>
                    {/* Phone # */}
                    <div className="text-center py-2 truncate">
                      {order.phone}
                    </div>
                    {/* Payment Terms */}
                    <div className="text-center py-2 truncate">
                      {order.paymentTerms}
                    </div>
                    {/* Total Amount */}
                    <div className="text-center py-2 truncate">
                      Rs. {order.totalAmount}
                    </div>
                    {/* Status */}
                    <div
                      className={`text-center py-2 truncate font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </div>
                    {/* Order Details (Actions) */}
                    <div className="text-center py-2 flex items-center justify-center gap-1">
                      <button
                        type="button"
                        className="p-1.5 hover:opacity-80 transition"
                        title="View Order"
                        onClick={() => setViewingOrder(order)}
                      >
                        <img
                          src="/assets/Assets/orders/eye.png"
                          alt="View"
                          className="h-[18px] w-[18px] object-contain"
                        />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 hover:opacity-80 transition"
                        title="Call Customer"
                      >
                        <img
                          src="/assets/Assets/orders/phone.png"
                          alt="Call"
                          className="h-[18px] w-[18px] object-contain"
                        />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 hover:opacity-80 transition"
                        title="Print Order"
                      >
                        <img
                          src="/assets/Assets/orders/printer.png"
                          alt="Print"
                          className="h-[18px] w-[18px] object-contain"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
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
              {
                category: "Daily Grocery",
                item: "Olpear's Milk Pack",
                quantity: 2,
                quantityDetail: "(230)",
                unit: "ml",
                loyaltyPoints: "00",
                price: "1,000",
              },
              {
                category: "Fresh Food",
                item: "Apples",
                quantity: 5,
                quantityDetail: "(3)",
                unit: "Kg",
                loyaltyPoints: "00",
                price: "500",
              },
            ],
          }}
          onClose={() => setViewingOrder(null)}
          onAcceptOrder={(order, selectedItems) => {
            setViewingOrder(null);
            setAcceptedItems(selectedItems);
            setProcessingOrder({
              ...order,
              status: "Pending",
              deliveryFee: "150",
              totalAmount: "1650",
            });
          }}
          onRejectOrder={(order) => {
            setViewingOrder(null);
            setRejectedOrder({
              ...order,
              status: "Cancelled",
              rejectionReason: "Items are currently out of stock",
            });
          }}
        />
      )}

      {processingOrder && (
        <OrderProcessingModal
          order={processingOrder}
          selectedItems={acceptedItems}
          onClose={() => {
            setProcessingOrder(null);
            setAcceptedItems([]);
          }}
          onStartProcessing={(order) => {
            setProcessingOrder(null);
            setInProgressOrder({
              ...order,
              status: "Processing",
              deliveryFee: "30",
              totalAmount: "1530",
              scheduledDelivery: "2024-11-27 • 3:00 PM - 6:00 PM",
            });
          }}
        />
      )}

      {inProgressOrder && (
        <OrderInProgressModal
          order={inProgressOrder}
          selectedItems={acceptedItems}
          onClose={() => {
            setInProgressOrder(null);
            setAcceptedItems([]);
          }}
          onMarkAsReady={(order) => {
            setInProgressOrder(null);
            setReadyOrder({
              ...order,
              status: "Ready",
            });
          }}
        />
      )}

      {readyOrder && (
        <OrderReadyModal
          order={readyOrder}
          selectedItems={acceptedItems}
          onClose={() => {
            setReadyOrder(null);
            setAcceptedItems([]);
          }}
          onDispatchOrder={(order) => {
            setReadyOrder(null);
            setDispatchedOrder({
              ...order,
              status: "Dispatched",
              riderName: "Muhammad Ali",
              riderPhone: "0321-1234567",
            });
          }}
        />
      )}

      {dispatchedOrder && (
        <OrderDispatchedModal
          order={dispatchedOrder}
          selectedItems={acceptedItems}
          onClose={() => {
            setDispatchedOrder(null);
            setAcceptedItems([]);
          }}
          onMarkAsDelivered={(order) => {
            setDispatchedOrder(null);
            setDeliveredOrder({
              ...order,
              status: "Delivered",
              deliveredAt: new Date()
                .toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(",", " •"),
            });
          }}
        />
      )}

      {deliveredOrder && (
        <OrderDeliveredModal
          order={deliveredOrder}
          selectedItems={acceptedItems}
          onClose={() => {
            setDeliveredOrder(null);
            setAcceptedItems([]);
          }}
        />
      )}

      {rejectedOrder && (
        <OrderRejectedModal
          order={rejectedOrder}
          onClose={() => {
            setRejectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default Orders;
