import React from "react";
import { Eye, PhoneCall, Printer } from "lucide-react";

const OrdersTable = ({ orders, onViewOrder, onCallCustomer, onPrintOrder, getStatusColor }) => {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg md:text-xl font-medium text-center">
            <th className="p-4 rounded-tl-xl">#</th>
            <th className="p-4 truncate">Order #</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Phone #</th>
            <th className="p-4 truncate">Payment Terms</th>
            <th className="p-4 truncate">Total Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4 truncate rounded-tr-xl">Order Details</th>
          </tr>
        </thead>

        <tbody>
          <tr><td colSpan="8" className="h-4"></td></tr>
        </tbody>

        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className="text-base md:text-lg bg-[#D8D8D83B] border-b-2 text-center"
            >
              <td className={`p-4 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {index + 1}
              </td>
              <td className="p-4">{order.orderNumber}</td>
              <td className="p-4">{order.customer}</td>
              <td className="p-4">{order.phone}</td>
              <td className="p-4">{order.paymentTerms}</td>
              <td className="p-4">Rs. {order.totalAmount}</td>
              <td className={`p-4 ${getStatusColor(order.status)}`}>
                {order.status}
              </td>
              <td className={`p-4 ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex justify-center items-center gap-2">
                  <button
                    type="button"
                    className="p-1.5 hover:opacity-80 transition"
                    title="View Order"
                    onClick={() => onViewOrder(order)}
                  >
                    <Eye className="w-4.5 h-4.5 text-neutral-400" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:opacity-80 transition h-7 w-7 rounded-full bg-[#FF8829]"
                    title="Call Customer"
                    onClick={onCallCustomer}
                  >
                    <PhoneCall className="w-4 h-4 text-white" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:opacity-80 transition"
                    title="Print Order"
                    onClick={onPrintOrder}
                  >
                    <Printer className="w-4.5 h-4.5 text-[#6F9C3D]" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;