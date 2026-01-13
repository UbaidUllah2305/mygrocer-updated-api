import React from "react";
import { Link } from "@inertiajs/react";
import { SquarePen } from "lucide-react";

const HelpCard = ({ 
  card, 
  onEdit,
  onClick, // only for Settings card
  isSettings = false 
}) => {
  const getIconPath = (iconName) => `/Images/${iconName}.svg`;

  // For Settings card: use onClick prop (show sub-page)
  if (isSettings) {
    return (
      <div
        className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-200 cursor-pointer"
        onClick={onClick}
      >
        <div className="relative flex items-start gap-3">
          <div className="mt-1">
            <img 
              src={getIconPath(card.icon)} 
              alt={card.title} 
              className="w-6 h-6"
              onError={(e) => e.target.src = "/Images/settings.svg"}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg md:text-xl text-neutral-700">{card.title}</h3>
            <p className="text-sm md:text-base text-neutral-900 mt-1">{card.description}</p>
          </div>
        </div>
      </div>
    );
  }

  // For all other cards: use <Link> to navigate
  return (
    <Link
      href={card.link}
      className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-200"
    >
      <div className="relative flex items-start gap-3">
        <div className="mt-1">
          <img 
            src={getIconPath(card.icon)} 
            alt={card.title} 
            className="w-6 h-6"
            onError={(e) => e.target.src = "/Images/settings.svg"}
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg md:text-xl text-neutral-700">{card.title}</h3>
          <p className="text-sm md:text-base text-neutral-900 mt-1">{card.description}</p>
        </div>
        <div className="absolute right-0 top-1">
          <SquarePen
            className="w-5 h-5 text-[#6F9C3D] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit(card);
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default HelpCard;