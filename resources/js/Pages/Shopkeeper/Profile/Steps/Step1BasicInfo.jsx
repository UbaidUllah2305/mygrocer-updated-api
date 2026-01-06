import React, { useState } from "react";
import InputFloating from "@/Components/InputFloating";

export default function Step1BasicInfo({ data, setData, errors }) {
    const [focusedField, setFocusedField] = useState(null);

    // Country codes
    const countryCodes = [
        { value: '+1', label: '+1' },
        { value: '+44', label: '+44' },
        { value: '+91', label: '+91' },
        { value: '+92', label: '+92' },
        { value: '+966', label: '+966' },
        { value: '+971', label: '+971' },
        { value: '+974', label: '+974' },
        { value: '+965', label: '+965' },
        { value: '+973', label: '+973' },
        { value: '+968', label: '+968' },
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <InputFloating
                        id="owner_name"
                        label="Owner Name"
                        value={data.owner_name}
                        onChange={(e) => setData("owner_name", e.target.value)}
                        onFocus={() => setFocusedField("owner_name")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "owner_name"}
                        error={errors.owner_name}
                    />
                    {errors.owner_name && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                            {errors.owner_name}
                        </p>
                    )}
                </div>

                <div>
                    <div className="flex gap-2 sm:gap-3">
                        <div className="w-20 sm:w-24">
                            <select
                                value={data.country_code || '+92'}
                                onChange={(e) => setData('country_code', e.target.value)}
                                onFocus={() => setFocusedField('country_code')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-2 sm:px-3 py-3 sm:py-4 text-sm sm:text-base rounded-xl border-2 border-[#B9BBBD] bg-white transition-all duration-200 focus:outline-none focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D] cursor-pointer text-gray-900 font-medium text-center custom-select"
                                style={{
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none',
                                    appearance: 'none',
                                    backgroundImage: 'none'
                                }}
                            >
                                {countryCodes.map((code) => (
                                    <option key={code.value} value={code.value}>
                                        {code.value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1 relative">
                            <input
                                id="phone_number"
                                type="tel"
                                value={data.phone_number || ''}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                onFocus={() => setFocusedField('phone_number')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Enter Mobile Number"
                                className={`
                                    peer w-full px-3 sm:px-4 py-3 sm:py-4 
                                    text-sm sm:text-base
                                    rounded-xl border-2
                                    ${errors.phone_number ? 'border-red-500' : 'border-[#B9BBBD]'}
                                    bg-white
                                    transition-all duration-200
                                    focus:outline-none focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D]
                                    placeholder-transparent
                                `}
                            />
                            <label
                                htmlFor="phone_number"
                                className={`
                                    absolute left-3 sm:left-4 
                                    px-1 sm:px-2
                                    text-xs sm:text-sm
                                    bg-white
                                    transition-all duration-200
                                    pointer-events-none
                                    ${errors.phone_number ? 'text-red-500' : 'text-[#9B9DA2]'}
                                    ${focusedField === 'phone_number' || (data.phone_number && data.phone_number.length > 0)
                                        ? '-top-3 text-xs sm:text-sm lg:text-base text-[#6F9C3D] font-medium' 
                                        : 'top-4 text-sm sm:text-base lg:text-base text-[#9B9DA2]'
                                    }
                                    peer-focus:-top-2 peer-focus:sm:-top-2.5 
                                    peer-focus:text-xs peer-focus:sm:text-sm 
                                    peer-focus:text-[#6F9C3D] 
                                    peer-focus:font-medium
                                `}
                            >
                                Enter Mobile Number
                            </label>
                        </div>
                    </div>
                    {errors.phone_number && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                            {errors.phone_number}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <InputFloating
                        id="email"
                        label="Email Address"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "email"}
                        error={errors.email}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <InputFloating
                        id="whatsapp_number"
                        label="WhatsApp #"
                        type="tel"
                        value={data.whatsapp_number}
                        onChange={(e) => setData("whatsapp_number", e.target.value)}
                        onFocus={() => setFocusedField("whatsapp_number")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "whatsapp_number"}
                    />
                </div>
            </div>
        </div>
    );
}
