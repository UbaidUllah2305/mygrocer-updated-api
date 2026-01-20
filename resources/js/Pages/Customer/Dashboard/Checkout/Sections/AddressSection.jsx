import React, { useState } from "react";
import { MapPin, Pencil, Trash2 } from "lucide-react";

const LabelTag = ({ label, Icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 rounded-full border transition text-sm bg-[#6F9C3D4F] text-[#6F9C3D] hover:border-[#6F9C3D]"
  >
    <Icon className="w-5 h-5 text-[#6F9C3D]" />
    {label}
  </button>
);

const AddressSection = ({
  savedAddresses,
  address,
  setAddress,
  suburb,
  setSuburb,
  floor,
  setFloor,
  noteToRider,
  setNoteToRider,
  selectedLabel,
  setSelectedLabel,
  showSavedAddresses,
  setShowSavedAddresses,
  showLocationModal,
  setShowLocationModal,
}) => {
  const labels = [
    { id: "home", label: "Home", Icon: () => <span>🏠</span> },
    { id: "work", label: "Work", Icon: () => <span>💼</span> },
    { id: "partner", label: "Partner", Icon: () => <span>❤️</span> },
    { id: "other", label: "Other", Icon: () => <span>➕</span> },
  ];

  return (
    <div className="rounded-xl p-6 mb-6 bg-[#EFEFEF] shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Delivery address
        </h2>
        <button
          onClick={() => setShowSavedAddresses(!showSavedAddresses)}
          className="text-lg md:text-xl font-normal hover:underline"
        >
          {showSavedAddresses ? "Hide Saved address" : "View Saved address"}
        </button>
      </div>

      {showSavedAddresses ? (
        <div className="space-y-3">
          {savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="radio"
                  checked={address === `${addr.label} ${addr.address}`}
                  onChange={() => {
                    setAddress(`${addr.label} ${addr.address}`);
                    setSuburb("");
                    setFloor("");
                    setNoteToRider(addr.note);
                    setSelectedLabel(addr.type);
                    setShowSavedAddresses(false);
                  }}
                  className="w-5 h-5 text-[#6F9C3D] border-gray-300 focus:ring-[#6F9C3D]"
                />
                <div className="flex items-start gap-2">
                  <span className="text-lg">{addr.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{addr.label}</p>
                    <p className="text-sm font-medium">{addr.address}</p>
                    <p className="text-sm">Note to rider: {addr.note}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[#6F9C3D] hover:text-green-700">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 py-3 border-b">
            <span className="text-lg">➕</span>
            <button className="text-lg font-medium text-gray-600 hover:text-gray-800">
              Add address
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Map Placeholder */}
          <div className="relative h-[200px] bg-[#f0f9ff] rounded-lg mb-4 overflow-hidden border border-[#dbeafe]">
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 400 200" className="w-full h-full text-[#3b82f6]">
                <path d="M20 100 Q 100 20, 200 100 T 380 100" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="200" cy="100" r="8" fill="currentColor" />
                <circle cx="80" cy="60" r="4" fill="currentColor" opacity="0.7" />
                <circle cx="320" cy="140" r="4" fill="currentColor" opacity="0.7" />
                <rect x="150" y="50" width="100" height="20" rx="4" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-white p-2 rounded-full shadow-md border-2 border-[#FF8829]">
                <MapPin className="w-6 h-6 text-[#FF8829]" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-3">
              <p className="text-white text-xs font-medium line-clamp-1">
                {address || "Delivery address"}
              </p>
              <p className="text-white/80 text-xs">Lahore, Pakistan</p>
            </div>
            {address && (
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(address + ", Lahore")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#FF8829] text-xs px-2 py-1 rounded-full flex items-center gap-1 hover:bg-white transition"
              >
                <MapPin className="w-3 h-3" />
                Open in Maps
              </a>
            )}
          </div>

          {/* Address Input */}
          <div className="flex items-center gap-2 mb-4 p-3 border-b">
            <MapPin className="w-6 h-6 text-gray-400" />
            <div className="flex-1">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-transparent text-sm font-medium outline-none"
              />
              <p className="text-sm">Lahore</p>
            </div>
            <button
              onClick={() => setShowLocationModal(true)}
              className="text-sm font-medium hover:underline"
            >
              Edit
            </button>
          </div>
        </>
      )}

      {/* Suburb */}
      <p className="text-lg mt-5 font-medium mb-3">We're missing your suburb</p>
      <input
        type="text"
        placeholder="Enter your suburb"
        value={suburb}
        onChange={(e) => setSuburb(e.target.value)}
        className="w-full p-3 border border-[#B9BBBD] h-14 text-[#9B9DA2] rounded-lg mb-3 bg-[#FFFFFF] text-lg outline-none focus:border-[#6F9C3D] transition"
      />

      {/* Floor */}
      <input
        type="text"
        placeholder="Floor"
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        className="w-full p-3 border border-[#B9BBBD] h-14 text-[#9B9DA2] rounded-lg mb-3 bg-[#FFFFFF] text-lg outline-none focus:border-[#6F9C3D] transition"
      />

      {/* Note to Rider */}
      <input
        type="text"
        placeholder="Note to rider - e.g. building, landmark"
        value={noteToRider}
        onChange={(e) => setNoteToRider(e.target.value)}
        className="w-full p-3 pb-12 border border-[#B9BBBD] h-[88px] text-[#9B9DA2] rounded-lg mb-3 bg-[#FFFFFF] text-lg outline-none focus:border-[#6F9C3D] transition"
      />

      {/* Labels */}
      <p className="text-lg font-medium mb-3">Add a label</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {labels.map((item) => (
          <LabelTag
            key={item.id}
            label={item.label}
            Icon={item.Icon}
            onClick={() => setSelectedLabel(item.id)}
          />
        ))}
      </div>

      {/* Save Button */}
      <button className="w-full bg-[#FF8829] hover:bg-[#FF7711] text-white py-3 rounded-lg font-semibold transition">
        Save and continue
      </button>
    </div>
  );
};

export default AddressSection;