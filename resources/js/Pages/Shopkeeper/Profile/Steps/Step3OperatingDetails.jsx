import React, { useState } from "react";
import InputFloating from "@/Components/InputFloating";

export default function Step3OperatingDetails({ data, setData, errors }) {
    const [focusedField, setFocusedField] = useState(null);
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const handleDayToggle = (day) => {
        const currentDays = Array.isArray(data.operating_days)
            ? data.operating_days
            : [];
        const updatedDays = currentDays.includes(day)
            ? currentDays.filter((d) => d !== day)
            : [...currentDays, day];
        setData("operating_days", updatedDays);
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Operating Days */}
            <div className="relative">
                <label className="absolute left-3 sm:left-4 top-0 text-[#6F9C3D] text-xs sm:text-sm font-medium bg-white px-2 -mt-2.5 pointer-events-none z-10">
                    Operating Days
                </label>
                <div className="w-full px-3 sm:px-4 py-3 sm:py-4 flex justify-between rounded-xl border-2 border-[#B9BBBD]">
                    <span className="text-gray-400 text-sm sm:text-base block">
                        Select Days
                    </span>
                    <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-end">
                        {daysOfWeek.map((day) => {
                            const currentDays = Array.isArray(data.operating_days)
                                ? data.operating_days
                                : [];
                            return (
                                <label
                                    key={day}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                        {day}
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={currentDays.includes(day)}
                                        onChange={() => handleDayToggle(day)}
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-[#6F9C3D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#6F9C3D] focus:ring-offset-0 cursor-pointer"
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>
                {errors.operating_days && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.operating_days}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <InputFloating
                            id="opening_time"
                            label="Opening Time"
                            type="time"
                            value={data.opening_time}
                            onChange={(e) => setData("opening_time", e.target.value)}
                            onFocus={() => setFocusedField("opening_time")}
                            onBlur={() => setFocusedField(null)}
                            isFocused={focusedField === "opening_time"}
                        />
                        {errors.opening_time && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.opening_time}
                            </p>
                        )}
                    </div>
                    <div>
                        <InputFloating
                            id="break_start"
                            label="Break Start"
                            type="time"
                            value={data.break_start}
                            onChange={(e) => setData("break_start", e.target.value)}
                            onFocus={() => setFocusedField("break_start")}
                            onBlur={() => setFocusedField(null)}
                            isFocused={focusedField === "break_start"}
                        />
                    </div>
                    <div>
                        <InputFloating
                            id="delivery_fee"
                            label="Delivery Fee"
                            type="number"
                            value={data.delivery_fee}
                            onChange={(e) => setData("delivery_fee", e.target.value)}
                            onFocus={() => setFocusedField("delivery_fee")}
                            onBlur={() => setFocusedField(null)}
                            isFocused={focusedField === "delivery_fee"}
                        />
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <InputFloating
                            id="closing_time"
                            label="Closing Time"
                            type="time"
                            value={data.closing_time}
                            onChange={(e) => setData("closing_time", e.target.value)}
                            onFocus={() => setFocusedField("closing_time")}
                            onBlur={() => setFocusedField(null)}
                            isFocused={focusedField === "closing_time"}
                        />
                        {errors.closing_time && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.closing_time}
                            </p>
                        )}
                    </div>
                    <div>
                        <InputFloating
                            id="break_end"
                            label="Break End"
                            type="time"
                            value={data.break_end}
                            onChange={(e) => setData("break_end", e.target.value)}
                            onFocus={() => setFocusedField("break_end")}
                            onBlur={() => setFocusedField(null)}
                            isFocused={focusedField === "break_end"}
                        />
                    </div>
                    <div>
                        <InputFloating
                            id="free_delivery_price_range"
                            label="Free Delivery Price Range"
                            type="number"
                            value={data.free_delivery_price_range}
                            onChange={(e) => setData("free_delivery_price_range", e.target.value)}
                            onFocus={() => setFocusedField("free_delivery_price_range")}
                            onBlur={() => setFocusedField(null)}
                            isFocused={focusedField === "free_delivery_price_range"}
                        />
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <InputFloating
                            id="average_delivery_time"
                            label="Average Delivery Time"
                            value={data.average_delivery_time}
                            onChange={(e) => setData("average_delivery_time", e.target.value)}
                            onFocus={() => setFocusedField("average_delivery_time")}
                            onBlur={() => setFocusedField(null)}
                            isFocused={focusedField === "average_delivery_time"}
                        />
                    </div>
                    <div>
                        <InputFloating
                            id="minimum_order_value"
                            label="Minimum Order Value"
                            type="number"
                            value={data.minimum_order_value}
                            onChange={(e) => setData("minimum_order_value", e.target.value)}
                            onFocus={() => setFocusedField("minimum_order_value")}
                            onBlur={() => setFocusedField(null)}
                            isFocused={focusedField === "minimum_order_value"}
                        />
                    </div>
                    <div>
                        <InputFloating
                            id="delivery_radius"
                            label="Delivery Radius"
                            type="number"
                            value={data.delivery_radius}
                            onChange={(e) => setData("delivery_radius", e.target.value)}
                            onFocus={() => setFocusedField("delivery_radius")}
                            onBlur={() => setFocusedField(null)}
                            isFocused={focusedField === "delivery_radius"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
