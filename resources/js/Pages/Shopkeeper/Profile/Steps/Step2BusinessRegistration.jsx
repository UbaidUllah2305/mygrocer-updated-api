import React, { useState } from "react";
import InputFloating from "@/Components/InputFloating";
import SelectFloating from "@/Components/SelectFloating";

export default function Step2BusinessRegistration({ data, setData, errors }) {
    const [focusedField, setFocusedField] = useState(null);

    // Sample options - Replace with your actual data
    const businessCategories = [
        "Grocery Store",
        "Supermarket",
        "Convenience Store",
        "Organic Store",
        "Specialty Store",
    ];

    const businessSubCategories = [
        "General Grocery",
        "Fruits & Vegetables",
        "Bakery",
        "Dairy Products",
        "Meat & Seafood",
    ];

    const specialTypes = [
        "Halal",
        "Organic",
        "Vegan",
        "Gluten-Free",
        "Premium",
    ];

    const regions = [
        "North Region",
        "South Region",
        "East Region",
        "West Region",
        "Central Region",
    ];

    const countries = [
        "Saudi Arabia",
        "United Arab Emirates",
        "Qatar",
        "Kuwait",
        "Bahrain",
        "Oman",
    ];

    const cities = ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"];

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <InputFloating
                        id="store_name"
                        label="Store Name"
                        value={data.store_name}
                        onChange={(e) => setData("store_name", e.target.value)}
                        onFocus={() => setFocusedField("store_name")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "store_name"}
                        error={errors.store_name}
                    />
                    {errors.store_name && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                            {errors.store_name}
                        </p>
                    )}
                </div>
                <div>
                    <InputFloating
                        id="branch_name"
                        label="Branch Name"
                        value={data.branch_name}
                        onChange={(e) => setData("branch_name", e.target.value)}
                        onFocus={() => setFocusedField("branch_name")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "branch_name"}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div>
                    <SelectFloating
                        id="business_category"
                        label="Business Category"
                        value={data.business_category}
                        onChange={(e) =>
                            setData("business_category", e.target.value)
                        }
                        onFocus={() => setFocusedField("business_category")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "business_category"}
                        options={businessCategories}
                        error={errors.business_category}
                    />
                    {errors.business_category && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                            {errors.business_category}
                        </p>
                    )}
                </div>
                <div>
                    <SelectFloating
                        id="business_sub_category"
                        label="Business Sub Category"
                        value={data.business_sub_category}
                        onChange={(e) =>
                            setData("business_sub_category", e.target.value)
                        }
                        onFocus={() => setFocusedField("business_sub_category")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "business_sub_category"}
                        options={businessSubCategories}
                    />
                </div>
                <div>
                    <SelectFloating
                        id="special_type"
                        label="Special Type"
                        value={data.special_type}
                        onChange={(e) =>
                            setData("special_type", e.target.value)
                        }
                        onFocus={() => setFocusedField("special_type")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "special_type"}
                        options={specialTypes}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div>
                    <InputFloating
                        id="business_license_number"
                        label="Business License Number"
                        value={data.business_license_number}
                        onChange={(e) =>
                            setData("business_license_number", e.target.value)
                        }
                        onFocus={() =>
                            setFocusedField("business_license_number")
                        }
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "business_license_number"}
                    />
                </div>
                <div>
                    <InputFloating
                        id="tax_id"
                        label="Tax ID/GST/VAT Number"
                        value={data.tax_id}
                        onChange={(e) => setData("tax_id", e.target.value)}
                        onFocus={() => setFocusedField("tax_id")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "tax_id"}
                    />
                </div>
                <div>
                    <InputFloating
                        id="cr_number"
                        label="CR Number"
                        value={data.cr_number}
                        onChange={(e) => setData("cr_number", e.target.value)}
                        onFocus={() => setFocusedField("cr_number")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "cr_number"}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <InputFloating
                        id="bank_name"
                        label="Bank Name"
                        value={data.bank_name}
                        onChange={(e) => setData("bank_name", e.target.value)}
                        onFocus={() => setFocusedField("bank_name")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "bank_name"}
                    />
                </div>
                <div>
                    <InputFloating
                        id="iban"
                        label="IBAN"
                        value={data.iban}
                        onChange={(e) => setData("iban", e.target.value)}
                        onFocus={() => setFocusedField("iban")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "iban"}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
                <div>
                    <SelectFloating
                        id="region"
                        label="Region"
                        value={data.region}
                        onChange={(e) => setData("region", e.target.value)}
                        onFocus={() => setFocusedField("region")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "region"}
                        options={regions}
                    />
                </div>
                <div>
                    <SelectFloating
                        id="shop_country"
                        label="Country"
                        value={data.shop_country}
                        onChange={(e) =>
                            setData("shop_country", e.target.value)
                        }
                        onFocus={() => setFocusedField("shop_country")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "shop_country"}
                        options={countries}
                    />
                </div>
                <div>
                    <SelectFloating
                        id="shop_city"
                        label="City/State"
                        value={data.shop_city}
                        onChange={(e) => setData("shop_city", e.target.value)}
                        onFocus={() => setFocusedField("shop_city")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "shop_city"}
                        options={cities}
                    />
                </div>
                <div>
                    <InputFloating
                        id="location_coordinates"
                        label="Location Coordinates"
                        value={data.location_coordinates}
                        onChange={(e) =>
                            setData("location_coordinates", e.target.value)
                        }
                        onFocus={() => setFocusedField("location_coordinates")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "location_coordinates"}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="md:col-span-2">
                    <InputFloating
                        id="shop_address"
                        label="Shop Address"
                        value={data.shop_address}
                        onChange={(e) =>
                            setData("shop_address", e.target.value)
                        }
                        onFocus={() => setFocusedField("shop_address")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "shop_address"}
                    />
                </div>
                <div>
                    <InputFloating
                        id="store_size"
                        label="Store Size"
                        value={data.store_size}
                        onChange={(e) => setData("store_size", e.target.value)}
                        onFocus={() => setFocusedField("store_size")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "store_size"}
                    />
                </div>
                <div>
                    <InputFloating
                        id="municipality_number"
                        label="Municipality Number"
                        value={data.municipality_number}
                        onChange={(e) =>
                            setData("municipality_number", e.target.value)
                        }
                        onFocus={() => setFocusedField("municipality_number")}
                        onBlur={() => setFocusedField(null)}
                        isFocused={focusedField === "municipality_number"}
                    />
                </div>
            </div>
        </div>
    );
}
