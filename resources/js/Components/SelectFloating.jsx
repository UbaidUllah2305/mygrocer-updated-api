import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function SelectFloating({ 
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
}) {
    const hasValue = value && value.toString().length > 0;

    return (
        <div className="relative w-full">
            <select
                id={id}
                value={value || ''}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                style={{
                    backgroundImage: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none'
                }}
                className={`
                    peer w-full px-3 sm:px-4 py-3 sm:py-4 
                    pr-10 sm:pr-12
                    text-sm sm:text-base
                    rounded-xl border-2
                    ${error ? 'border-red-500' : 'border-[#B9BBBD]'}
                    bg-white
                    transition-all duration-200
                    focus:outline-none focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D]
                    cursor-pointer
                    ${!hasValue ? 'text-gray-400' : 'text-gray-900'}
                    [&::-ms-expand]:hidden
                `}
                {...props}
            >
                <option value="" disabled className="text-gray-400">
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option 
                        key={index} 
                        value={option.value || option}
                        className="text-gray-900 py-2 px-4 hover:bg-[#6F9C3D]/10"
                    >
                        {option.label || option}
                    </option>
                ))}
            </select>
            
            {/* Custom Chevron Icon */}
            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            
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
                    peer-focus:-top-2 peer-focus:sm:-top-2.5 
                    peer-focus:text-xs peer-focus:sm:text-sm 
                    peer-focus:text-[#6F9C3D] 
                    peer-focus:font-medium
                `}
            >
                {label}
            </label>
        </div>
    );
}
