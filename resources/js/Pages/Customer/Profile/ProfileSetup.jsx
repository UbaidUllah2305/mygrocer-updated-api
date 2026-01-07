import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { router } from "@inertiajs/react";
import InputFloating from "@/Components/InputFloating";
import SelectFloating from "@/Components/SelectFloating";
import CustomerProfileLayout from "@/Layouts/CustomerProfileLayout";

export default function ProfileSetup({ auth }) {
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const { data, setData, processing, errors, setError, clearErrors } = useForm({
    customer_name: "",
    country_code: "+92",
    phone_number: "",
    email: auth?.user?.email || "",
    country: "",
    city: "",
    zip_code: "",
  });

  // Country codes
  const countryCodes = [
    { value: "+1", label: "+1" },
    { value: "+44", label: "+44" },
    { value: "+91", label: "+91" },
    { value: "+92", label: "+92" },
    { value: "+966", label: "+966" },
    { value: "+971", label: "+971" },
    { value: "+974", label: "+974" },
    { value: "+965", label: "+965" },
    { value: "+973", label: "+973" },
    { value: "+968", label: "+968" },
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

  // Fetch business data on mount
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await axios.get("/api/v1/customer/user");

        if (response.data?.success && response.data?.user?.business) {
          const businessData = response.data.user.business;
          setBusiness(businessData);
          setData({
            customer_name: businessData.customer_name || "",
            country_code: businessData.country_code || "+92",
            phone_number: businessData.phone_number || "",
            email: businessData.email || auth?.user?.email || "",
            country: businessData.country || "",
            city: businessData.city || "",
            zip_code: businessData.zip_code || "",
          });
        }
      } catch (error) {
        console.error("Error fetching business:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    // Validation
    const validationErrors = {};
    if (!data.customer_name?.trim())
      validationErrors.customer_name = "Customer name is required";
    if (!data.country_code?.trim())
      validationErrors.country_code = "Country code is required";
    if (!data.phone_number?.trim())
      validationErrors.phone_number = "Phone number is required";
    if (!data.email?.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach((key) => {
        setError(key, validationErrors[key]);
      });
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post(
        "/api/v1/customer/profile/save-step",
        data
      );

      if (response.data.success) {
        toast.success("Profile completed successfully!");
        // Force a full page reload to the dashboard
        window.location.href = response.data.redirect;
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((key) => {
          setError(key, serverErrors[key][0]);
        });
      }
      toast.error(
        error.response?.data?.message ||
          "Failed to save profile. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <CustomerProfileLayout auth={auth}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">
              Loading...
            </h3>
            <div className="flex items-center justify-center space-x-2">
              <div
                className="w-3 h-3 bg-[#6F9C3D] rounded-full animate-bounce"
                style={{ animationDelay: "0ms", animationDuration: "0.6s" }}
              ></div>
              <div
                className="w-3 h-3 bg-[#6F9C3D] rounded-full animate-bounce"
                style={{ animationDelay: "200ms", animationDuration: "0.6s" }}
              ></div>
              <div
                className="w-3 h-3 bg-[#6F9C3D] rounded-full animate-bounce"
                style={{ animationDelay: "400ms", animationDuration: "0.6s" }}
              ></div>
            </div>
          </div>
        </div>
      </CustomerProfileLayout>
    );
  }

  return (
    <CustomerProfileLayout auth={auth}>
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-10">
        {/* Header */}
        <div className="flex-1 min-w-0 mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Set up Customers Profile
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Add your details to setup your store on MyGrocer.
          </p>
        </div>

        {/* Form Card */}
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <InputFloating
                id="customer_name"
                label="Customer Name"
                value={data.customer_name}
                onChange={(e) => setData("customer_name", e.target.value)}
                onFocus={() => setFocusedField("customer_name")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "customer_name"}
                error={errors.customer_name}
              />
              {errors.customer_name && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.customer_name}
                </p>
              )}
            </div>
            <div>
              <div className="flex gap-2 sm:gap-3">
                <div className="w-20 sm:w-24">
                  <select
                    value={data.country_code || "+92"}
                    onChange={(e) => setData("country_code", e.target.value)}
                    onFocus={() => setFocusedField("country_code")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-2 sm:px-3 py-3 sm:py-4 text-sm sm:text-base rounded-xl border-2 border-[#B9BBBD] bg-white transition-all duration-200 focus:outline-none focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D] cursor-pointer text-gray-900 font-medium text-center custom-select"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      appearance: "none",
                      backgroundImage: "none",
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
                    value={data.phone_number || ""}
                    onChange={(e) => setData("phone_number", e.target.value)}
                    onFocus={() => setFocusedField("phone_number")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter Mobile Number"
                    className={`
                      peer w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl border-2
                      ${ errors.phone_number ? "border-red-500" : "border-[#B9BBBD]" }
                      bg-white transition-all duration-200 focus:outline-none focus:border-[#6F9C3D] focus:ring-1 focus:ring-[#6F9C3D] placeholder-transparent
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
                                    ${
                                      errors.phone_number
                                        ? "text-red-500"
                                        : "text-[#9B9DA2]"
                                    }
                                    ${
                                      focusedField === "phone_number" ||
                                      (data.phone_number &&
                                        data.phone_number.length > 0)
                                        ? "-top-3 text-xs sm:text-sm lg:text-base text-[#6F9C3D] font-medium"
                                        : "top-4 text-sm sm:text-base lg:text-base text-[#9B9DA2]"
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
              <SelectFloating
                id="country"
                label="Country"
                value={data.country}
                onChange={(e) => setData("country", e.target.value)}
                onFocus={() => setFocusedField("country")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "country"}
                options={countries}
              />
            </div>
            <div>
              <SelectFloating
                id="city"
                label="City/State"
                value={data.city}
                onChange={(e) => setData("city", e.target.value)}
                onFocus={() => setFocusedField("city")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "city"}
                options={cities}
              />
            </div>
            <div>
              <InputFloating
                id="zip_code"
                label="Zip Code"
                value={data.zip_code}
                onChange={(e) => setData("zip_code", e.target.value)}
                onFocus={() => setFocusedField("zip_code")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "zip_code"}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={processing}
              onClick={handleSubmit}
              className="w-full sm:w-auto px-8 py-3 bg-[#6F9C3D] text-white rounded-xl font-medium text-base lg:text-lg transition-all hover:bg-[#5d8a32] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {processing ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </CustomerProfileLayout>
  );
}
