import React from "react";
import { Pencil, Eye } from "lucide-react";

const EventsTable = ({ events, onViewEvent, onEditEvent }) => {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-600">
        No events found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#6F9C3D4F] text-[#3A3E47] text-lg md:text-xl font-medium">
            <th className="p-4 text-left rounded-tl-xl rounded-bl-xl">Event Name</th>
            <th className="p-4 text-left">Event Date</th>
            <th className="p-4 text-left">Duration</th>
            <th className="p-4 text-left">Days Remaining</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-right">Products</th>
            <th className="p-4 text-center">Expected Revenue</th>
            <th className="p-4 text-center rounded-tr-xl rounded-br-xl">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr><td colSpan="8" className="h-4"></td></tr>
        </tbody>

        <tbody>
          {events.map((event, index) => (
            <tr
              key={event.id}
              className="text-base md:text-lg bg-[#D8D8D83B] border-b-2"
            >
              <td className={`p-4 ${index === 0 ? "rounded-tl-xl" : ""}`}>{event.name}</td>
              <td className="p-4">{event.date}</td>
              <td className="p-4">{event.duration}</td>
              <td className="p-4">{event.daysRemaining}</td>
              <td className="p-4">{event.status}</td>
              <td className="p-4 text-right">{event.products}</td>
              <td className="p-4 text-center">${event.revenue}</td>
              <td className={`p-4 text-center ${index === 0 ? "rounded-tr-xl" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-100 rounded transition"
                    title="View Event"
                    onClick={() => onViewEvent(event)}
                  >
                    <Eye className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-100 rounded transition"
                    title="Edit Event"
                    onClick={() => onEditEvent(event)}
                  >
                    <Pencil className="w-4 h-4 text-[#6F9C3D]" />
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

export default EventsTable;