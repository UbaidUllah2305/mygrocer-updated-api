// src/Components/Admin/OffersKpiCard.jsx
import React from "react";
import { ChevronRight } from "lucide-react";

const OffersKpiCard = ({ title, hint, icon, onClick }) => (
  <button
    onClick={onClick}
    className="w-full h-31 sm:w-auto rounded-xl bg-[#6f9c3d4f] px-8 py-3 flex flex-col justify-between gap-4 text-left hover:bg-[#6f9c3d33] transition cursor-pointer"
  >
    <div className="flex items-center justify-between">
      <img
        src={icon}
        alt=""
        className="w-5 h-5 sm:w-6 sm:h-6"
        onError={(e) => {
          e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIC8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzY5OTQzZCIgLz48L3N2Zz4=";
        }}
      />
      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#161c2b]" />
    </div>
    <div className="flex flex-col gap-1">
      <div className="text-base sm:text-xl font-medium text-[#3a3e47] truncate">{title}</div>
      <div className="text-xs sm:text-base text-gray-700">{hint}</div>
    </div>
  </button>
);

export default OffersKpiCard;