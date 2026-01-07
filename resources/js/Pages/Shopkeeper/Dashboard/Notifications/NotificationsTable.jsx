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
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg md:text-xl font-medium text-center">
            <th className="p-4 rounded-tl-xl rounded-bl-xl">#</th>
            <th className="p-4">Type</th>
            <th className="p-4">Title</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4 rounded-tr-xl rounded-br-xl">Actions</th>
          </tr>
        </thead>

        {/* Spacer row */}
        <tbody>
          <tr><td colSpan="6" className="h-1"></td></tr>
        </tbody>

        <tbody>
          {notifications.map((notif, index) => (
            <tr
              key={notif.id}
              className="text-base md:text-lg bg-[#D8D8D83B] border-b-2 text-center"
            >
              <td className={`p-4 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                {notif.id}
              </td>
              <td className="p-4">{notif.type}</td>
              <td className="p-4">{notif.title}</td>
              <td className="p-4">{notif.date}</td>
              <td className="p-4">{notif.status}</td>
              <td className={`p-4 ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(notif)}
                    className="p-1 text-neutral-400 hover:text-neutral-600"
                    aria-label="View details"
                  >
                    <Eye size={18} />
                  </button>
                  {notif.actions === "view_cart" && (
                    <button
                      className="p-1 text-[#6F9C3D] hover:text-[#5A7E2F]"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={18} />
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