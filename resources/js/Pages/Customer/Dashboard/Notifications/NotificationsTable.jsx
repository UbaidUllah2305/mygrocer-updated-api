import React from "react";
import { Eye, ShoppingCart } from "lucide-react";

const NotificationsTable = ({ notifications, onView }) => {
  if (notifications.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No notifications found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#E8EFE0] text-neutral-800 text-lg font-medium">
            <th className="p-4 text-left pl-10 rounded-tl-xl rounded-bl-xl">#</th>
            <th className="p-4 text-center">Type</th>
            <th className="p-4 text-center">Title</th>
            <th className="p-4 text-center">Date</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center rounded-tr-xl rounded-br-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="6" className="h-2"></td></tr>
        </tbody>
        <tbody>
          {notifications.map((notif, index) => (
            <tr
              key={notif.id}
              className="text-lg text-neutral-800 bg-[#f7f7f7] border-b border-gray-200 hover:bg-[#f3f3f3]"
            >
              <td className={`p-4 text-left pl-10 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {notif.id}
              </td>
              <td className="p-4 text-center">{notif.type}</td>
              <td className="p-4 text-center">{notif.title}</td>
              <td className="p-4 text-center">{notif.date}</td>
              <td className="p-4 text-center">{notif.status}</td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(notif)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-600 transition"
                    aria-label="View details"
                  >
                    <Eye size={16} />
                  </button>
                  {notif.actions === "view_cart" && (
                    <button
                      className="p-1.5 text-[#6F9C3D] hover:text-[#5a7d31] transition"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsTable;