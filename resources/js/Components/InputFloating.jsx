import React from 'react';

export default function InputFloating({ 
    id, 
    label, 
    value, 
    onChange, 
    onFocus, 
    onBlur, 
    isFocused, 
    type = 'text',
    error,
    ...props 
}) {
    const hasValue = value && value.toString().length > 0;

    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                value={value || ''}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className={`
                    peer w-full px-3 sm:px-4 py-3 sm:py-4 
                    text-sm sm:text-base
                    rounded-xl border-2
                    ${error ? 'border-red-500' : 'border-[#B9BBBD]'}
                    bg-white
                    transition-all duration-200
                    focus:outline-none focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D]
                    placeholder-transparent
                `}
                placeholder={label}
                {...props}
            />
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
