import React, { useRef, useState } from "react";
import { Pencil, Trash2, Package } from "lucide-react";

const OverheadsTable = ({ items, loading, onEdit, onDelete, onReceiptSelect }) => {
  const fileInputRef = useRef(null);
  const [selectedItemForReceipt, setSelectedItemForReceipt] = useState(null);

  const handleReceiptClick = (item) => {
    setSelectedItemForReceipt(item);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && selectedItemForReceipt && onReceiptSelect) {
      onReceiptSelect(selectedItemForReceipt, file);
    }
    setSelectedItemForReceipt(null);
    event.target.value = null; // Reset input
  };
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block w-8 h-8 border-4 border-[#6F9C3D] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-600 text-sm">Loading overheads...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-[#1B75BB]">
        No overheads found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg md:text-xl font-medium">
            <th className="p-4 truncate text-left rounded-tl-xl rounded-bl-xl">Expense Name</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-center">Date</th>
            <th className="p-4 truncate text-center">Payment Method</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Frequency</th>
            <th className="p-4 text-center">Receipt</th>
            <th className="p-4 text-center rounded-tr-xl rounded-br-xl">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr><td colSpan="8" className="h-4"></td></tr>
        </tbody>

        <tbody>
          {items.map((item, index) => (
            <tr
              key={`overhead-${index}`}
              className="text-base md:text-lg bg-[#D8D8D83B] border-b-2"
            >
              <td className={`p-4 ${index === 0 ? "rounded-tl-xl" : ""}`}>{item.exp}</td>
              <td className="p-4">{item.amt}</td>
              <td className="p-4 text-center">{item.date}</td>
              <td className="p-4 text-center">{item.payment}</td>
              <td className="p-4 text-center">{item.status}</td>
              <td className="p-4 text-center">{item.fre}</td>
              <td className="p-4 text-center">
                <div className="flex justify-center">
                  <div
                    className="h-10 w-10 rounded-lg border-2 border-gray-300 bg-gray-100 overflow-hidden cursor-pointer hover:border-gray-400 transition-colors"
                    title="Click to select receipt image"
                    onClick={() => handleReceiptClick(item)}
                  >
                    {item.receipt ? (
                      <img
                        src={item.receipt}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>              </td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex justify-center items-center flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="transition-colors group"
                    title="Edit Overhead"
                  >
                    <Pencil className="w-5 h-5 text-[#6F9C3D] group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    className="transition-colors group"
                    title="Delete Overhead"
                  >
                    <Trash2 className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
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

export default OverheadsTable;