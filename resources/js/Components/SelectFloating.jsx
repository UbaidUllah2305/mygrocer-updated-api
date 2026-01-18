// src/Components/SelectFloating.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SelectFloating = ({ 
  id, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  isFocused, 
  options = [],
  error,
  placeholder = "Select",
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onBlur) onBlur();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      if (onBlur) onBlur();
    } else {
      if (onFocus) onFocus();
    }
  };

  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
    if (onBlur) onBlur();
  };

  // Get display text
  const selectedOption = options.find(opt => 
    (opt.value || opt) === value
  );
  const displayText = selectedOption 
    ? (selectedOption.label || selectedOption)
    : placeholder;

  const hasValue = value && value.toString().length > 0;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        id={id}
        onClick={handleToggle}
        className={`
          peer w-full px-3 sm:px-4 py-3 sm:py-4 
          text-sm sm:text-base
          rounded-xl border-2 flex items-center justify-between
          ${error ? 'border-red-500' : 'border-[#B9BBBD]'}
          bg-white
          transition-all duration-200
          focus:outline-none focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D]
          text-left cursor-pointer
          ${!hasValue ? 'text-gray-400' : 'text-gray-900'}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        {...props}
      >
        <span>{displayText}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Floating Label */}
      <label
        htmlFor={id}
        className={`
          absolute left-3 sm:left-4 
          px-1 sm:px-2
          text-xs sm:text-sm
          bg-white
          transition-all duration-200
          pointer-events-none
          ${error ? 'text-red-500' : 'text-[#9B9DA2]'}
          ${isFocused || hasValue 
            ? '-top-3 text-xs sm:text-sm lg:text-base text-[#6F9C3D] font-medium' 
            : 'top-4 text-sm sm:text-base lg:text-base text-[#9B9DA2]'
          }
        `}
      >
        {label}
      </label>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-[#B9BBBD] rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => {
            const optionValue = option.value || option;
            const optionLabel = option.label || option;
            return (
              <div
                key={index}
                onClick={() => handleSelect(optionValue)}
                className={`px-4 py-3 text-sm sm:text-base cursor-pointer hover:bg-gray-50 transition ${
                  value === optionValue ? "text-[#6F9C3D] font-medium" : "text-neutral-700"
                }`}
              >
                {optionLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectFloating;