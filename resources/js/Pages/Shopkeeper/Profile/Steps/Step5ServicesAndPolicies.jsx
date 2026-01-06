import React from 'react';

export default function Step5ServicesAndPolicies({ data, setData, errors }) {
    
    const handleCheckboxChange = (field) => {
        const currentValue = data[field];
        // Toggle between 'yes' and 'no'
        const newValue = currentValue === 'yes' || currentValue === true || currentValue === '1' || currentValue === 1 
            ? 'no' 
            : 'yes';
        setData(field, newValue);
    };

    const isChecked = (field) => {
        return data[field] === 'yes' || data[field] === true || data[field] === '1' || data[field] === 1;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="flex flex-col gap-4 sm:gap-6">
                {/* Home Delivery */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <input
                        type="checkbox"
                        id="home_delivery"
                        checked={isChecked('home_delivery')}
                        onChange={() => handleCheckboxChange('home_delivery')}
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#6F9C3D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#6F9C3D] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                    />
                    <label 
                        htmlFor="home_delivery"
                        className="flex-1 px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-[#B9BBBD] bg-white cursor-pointer transition-colors hover:border-[#6F9C3D]/50"
                    >
                        <span className="text-sm sm:text-base text-gray-600">
                            Home Delivery
                        </span>
                    </label>
                </div>

                {/* Online Payment */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <input
                        type="checkbox"
                        id="online_payment"
                        checked={isChecked('online_payment')}
                        onChange={() => handleCheckboxChange('online_payment')}
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#6F9C3D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#6F9C3D] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                    />
                    <label 
                        htmlFor="online_payment"
                        className="flex-1 px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-[#B9BBBD] bg-white cursor-pointer transition-colors hover:border-[#6F9C3D]/50"
                    >
                        <span className="text-sm sm:text-base text-gray-600">
                            Online Payment
                        </span>
                    </label>
                </div>

                {/* Exchange Policy */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <input
                        type="checkbox"
                        id="exchange_policy"
                        checked={isChecked('exchange_policy')}
                        onChange={() => handleCheckboxChange('exchange_policy')}
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#6F9C3D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#6F9C3D] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                    />
                    <label 
                        htmlFor="exchange_policy"
                        className="flex-1 px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-[#B9BBBD] bg-white cursor-pointer transition-colors hover:border-[#6F9C3D]/50"
                    >
                        <span className="text-sm sm:text-base text-gray-600">
                            Exchange Policy
                        </span>
                    </label>
                </div>

                {/* Mobile POS */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <input
                        type="checkbox"
                        id="mobile_pos"
                        checked={isChecked('mobile_pos')}
                        onChange={() => handleCheckboxChange('mobile_pos')}
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#6F9C3D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#6F9C3D] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                    />
                    <label 
                        htmlFor="mobile_pos"
                        className="flex-1 px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-[#B9BBBD] bg-white cursor-pointer transition-colors hover:border-[#6F9C3D]/50"
                    >
                        <span className="text-sm sm:text-base text-gray-600">
                            Mobile POS
                        </span>
                    </label>
                </div>
            </div>
            
            <div className="flex flex-col gap-4 sm:gap-6">
                {/* Cash on Delivery */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <input
                        type="checkbox"
                        id="cash_on_delivery"
                        checked={isChecked('cash_on_delivery')}
                        onChange={() => handleCheckboxChange('cash_on_delivery')}
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#6F9C3D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#6F9C3D] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                    />
                    <label 
                        htmlFor="cash_on_delivery"
                        className="flex-1 px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-[#B9BBBD] bg-white cursor-pointer transition-colors hover:border-[#6F9C3D]/50"
                    >
                        <span className="text-sm sm:text-base text-gray-600">
                            Cash on Delivery
                        </span>
                    </label>
                </div>

                {/* Return Policy */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <input
                        type="checkbox"
                        id="return_policy"
                        checked={isChecked('return_policy')}
                        onChange={() => handleCheckboxChange('return_policy')}
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#6F9C3D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#6F9C3D] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                    />
                    <label 
                        htmlFor="return_policy"
                        className="flex-1 px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-[#B9BBBD] bg-white cursor-pointer transition-colors hover:border-[#6F9C3D]/50"
                    >
                        <span className="text-sm sm:text-base text-gray-600">
                            Return Policy
                        </span>
                    </label>
                </div>

                {/* Pickup */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <input
                        type="checkbox"
                        id="pickup"
                        checked={isChecked('pickup')}
                        onChange={() => handleCheckboxChange('pickup')}
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#6F9C3D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#6F9C3D] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                    />
                    <label 
                        htmlFor="pickup"
                        className="flex-1 px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-[#B9BBBD] bg-white cursor-pointer transition-colors hover:border-[#6F9C3D]/50"
                    >
                        <span className="text-sm sm:text-base text-gray-600">
                            Pickup
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
}
