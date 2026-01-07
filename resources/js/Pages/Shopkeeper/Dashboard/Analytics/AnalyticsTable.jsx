import React from "react";

const AnalyticsTable = ({ items, fromDate, toDate, loading }) => {
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block w-8 h-8 border-4 border-[#6F9C3D] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-600 text-sm">Loading sales data...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg md:text-xl font-medium text-center">
            <th className="p-4 rounded-tl-xl rounded-bl-xl">Main Category</th>
            <th className="p-4">Sub Category</th>
            <th className="p-4">Code</th>
            <th className="p-4">Product Name</th>
            <th className="p-4">Sold</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Orders</th>
            <th className="p-4">Discount</th>
            <th className="p-4">Profit</th>
            <th className="p-4 rounded-tr-xl rounded-br-xl">Date Range</th>
          </tr>
        </thead>

        {/* Spacer row (like InventoryTable) */}
        <tbody>
          <tr>
            <td colSpan="10" className="h-4"></td>
          </tr>
        </tbody>

        <tbody>
          {items.length > 0 ? (
            items.map((p, index) => (
              <tr
                key={`${p.code}-${index}`}
                className="text-base md:text-lg bg-[#D8D8D83B] border-b-2 text-center"
              >
                <td className={`p-4 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                  {p.main}
                </td>
                <td className="p-4">{p.sub}</td>
                <td className="p-4">{p.code}</td>
                <td className="p-4">{p.name}</td>
                <td className="p-4">{p.sold}</td>
                <td className="p-4">{p.amount}</td>
                <td className="p-4">{p.orders}</td>
                <td className="p-4">{p.discount}</td>
                <td className="p-4">{p.profit}</td>
                <td className={`p-4 ${index === 0 ? "rounded-tr-xl" : ""}`}>
                  <div className="text-sm">
                    <div>From: {fromDate.split('-').slice(1).join('-')}</div>
                    <div>To: {toDate.split('-').slice(1).join('-')}</div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="p-4 text-center text-[#1B75BB]">
                No sales data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsTable;