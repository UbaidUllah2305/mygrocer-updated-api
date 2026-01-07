import React from "react";

const TrendsTable = ({ items, loading }) => {
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block w-8 h-8 border-4 border-[#6F9C3D] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-600 text-sm">Loading trending products...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No trending products found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg md:text-xl font-medium text-center">
            <th className="p-4 truncate rounded-tl-xl">Main Category</th>
            <th className="p-4 truncate">Sub Category</th>
            <th className="p-4">Code</th>
            <th className="p-4 truncate">Product Name</th>
            <th className="p-4">BP</th>
            <th className="p-4">SP</th>
            <th className="p-4">Quantity</th>
            <th className="p-4 truncate">Sold out</th>
            <th className="p-4 truncate">In stock</th>
            <th className="p-4 rounded-tr-xl">Image</th>
          </tr>
        </thead>

        <tbody>
          <tr><td colSpan="10" className="h-4"></td></tr>
        </tbody>

        <tbody>
          {items.map((row, index) => (
            <tr
              key={`${row.code}-${index}`}
              className="text-base md:text-lg bg-[#D8D8D83B] border-b-2 text-center"
            >
              <td className={`p-4 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {row.main}
              </td>
              <td className="p-4">{row.sub}</td>
              <td className="p-4">{row.code}</td>
              <td className="p-4">{row.name}</td>
              <td className="p-4">{row.bp}</td>
              <td className="p-4">{row.sp}</td>
              <td className="p-4">{row.quantity}</td>
              <td className="p-4">{row.soldOut}</td>
              <td className="p-4">{row.inStock}</td>
              <td className={`p-4 ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <img
                  src={row.image}
                  alt={row.name}
                  className="h-6 w-6 rounded-full mx-auto"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrendsTable;