import React from "react";
import { router } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5 sm:gap-2">
            {/* Separator - Don't show before first item */}
            {index > 0 && (
              <ChevronRight 
                className="w-5 h-5 text-gray-500 flex-shrink-0" 
                aria-hidden="true" 
              />
            )}

            {/* Breadcrumb Item */}
            {item.href ? (
              <button
                onClick={() => router.visit(item.href)}
                className="flex items-center gap-1.5 hover:text-[#6f9c3d] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#6f9c3d]/40 rounded px-1"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.icon && (
                  <item.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                )}
                <span className="truncate max-w-[150px] sm:max-w-none">{item.label}</span>
              </button>
            ) : (
              <span 
                className="flex items-center gap-1.5 text-[#6f9c3d] font-semibold"
                aria-current="page"
              >
                {item.icon && (
                  <item.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                )}
                <span className="truncate max-w-[150px] sm:max-w-none">{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
