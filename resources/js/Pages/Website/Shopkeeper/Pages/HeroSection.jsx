import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function HeroSection() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            const response = await axios.post("/api/v1/shopkeeper/register", formData);
            
            if (response.data.success) {
                // Show success message
                alert(response.data.message);
                // Redirect to login page
                router.visit(response.data.redirect);
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setErrors({ general: error.response.data.message });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/Images/Shopkeeper/shopkeeper-hero.png')",
                }}
            ></div>

            {/* Gradient Overlay */}
            <div 
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(90deg, #6F9C3D 0%, #6F9C3D 35%, rgba(111, 156, 61, 0.95) 45%, rgba(111, 156, 61, 0.85) 50%, rgba(111, 156, 61, 0.65) 55%, rgba(111, 156, 61, 0.45) 61%, rgba(111, 156, 61, 0.25) 68%, rgba(111, 156, 61, 0.1) 75%, transparent 85%)',
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10 flex items-center min-h-screen py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-md lg:max-w-lg xl:max-w-2xl">
                        {/* Text Content */}
                        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Register your Business with us!
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed">
                                Sign up easily, showcase your menu, and you can start reaching new customers
                            </p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="w-full relative z-50">
                            <div 
                                className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl space-y-3 sm:space-y-4 w-2/3"
                                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
                            >
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#6F9C3D] mb-1">
                                    Ready to boost your sales?
                                </h2>

                                {/* General Error Message */}
                                {errors.general && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm text-red-600">{errors.general}</p>
                                    </div>
                                )}

                                {/* Form Fields */}
                                <div className="space-y-3 sm:space-y-4">
                                    {/* Name Input */}
                                    <div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter Full Name"
                                            autoComplete="name"
                                            required
                                            disabled={processing}
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border ${
                                                errors.name
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-[#6F9C3D]"
                                            } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.name[0]}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Input */}
                                    <div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter Email"
                                            autoComplete="email"
                                            required
                                            disabled={processing}
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border ${
                                                errors.email
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-[#6F9C3D]"
                                            } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.email[0]}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password Input */}
                                    <div>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter Your Password"
                                                autoComplete="new-password"
                                                required
                                                minLength="8"
                                                disabled={processing}
                                                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 border ${
                                                    errors.password
                                                        ? "border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:ring-[#6F9C3D]"
                                                } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={processing}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#6F9C3D] focus:outline-none transition-colors disabled:opacity-50"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                                ) : (
                                                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.password[0]}
                                            </p>
                                        )}
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                value={formData.password_confirmation}
                                                onChange={handleChange}
                                                placeholder="Confirm Password"
                                                autoComplete="new-password"
                                                required
                                                minLength="8"
                                                disabled={processing}
                                                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 border ${
                                                    errors.password_confirmation
                                                        ? "border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:ring-[#6F9C3D]"
                                                } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                disabled={processing}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#6F9C3D] focus:outline-none transition-colors disabled:opacity-50"
                                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                                ) : (
                                                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password_confirmation && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.password_confirmation[0]}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Terms and Conditions Checkbox */}
                                <div className="pt-1">
                                    <label className="flex items-start gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreeToTerms}
                                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                                            disabled={processing}
                                            className="mt-0.5 w-4 h-4 text-[#6F9C3D] bg-white border-gray-300 rounded transition-colors duration-200
                                                focus:ring-2 focus:ring-[#6F9C3D] focus:ring-offset-0
                                                hover:border-[#6F9C3D] cursor-pointer shrink-0
                                                checked:bg-[#6F9C3D] checked:border-[#6F9C3D]
                                                disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                        <span className="text-xs sm:text-sm text-gray-700 leading-tight group-hover:text-gray-900">
                                            I agree to the{" "}
                                            <Link
                                                href="/terms-of-service"
                                                className="text-[#6F9C3D] hover:text-[#5d8a32] hover:underline transition-colors"
                                            >
                                                terms and conditions
                                            </Link>
                                        </span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!agreeToTerms || processing}
                                    className="w-full bg-[#6F9C3D] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-base sm:text-lg hover:bg-[#5d8a32] transition-colors shadow-md hover:shadow-lg mt-2 sm:mt-3
                                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#6F9C3D]"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle 
                                                    className="opacity-25" 
                                                    cx="12" 
                                                    cy="12" 
                                                    r="10" 
                                                    stroke="currentColor" 
                                                    strokeWidth="4"
                                                    fill="none"
                                                />
                                                <path 
                                                    className="opacity-75" 
                                                    fill="currentColor" 
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Creating account...
                                        </span>
                                    ) : (
                                        "Get Started"
                                    )}
                                </button>

                                {/* Already Registered Link */}
                                <div className="flex justify-center items-center text-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                                    <div className="bg-[#6F9C3D] flex-1 h-[1px]"></div>
                                    <Link
                                        href="/shopkeeper/login"
                                        className="text-xs sm:text-sm text-[#6F9C3D] hover:text-[#5d8a32] font-medium transition-colors whitespace-nowrap"
                                    >
                                        Already Registered?
                                    </Link>
                                    <div className="bg-[#6F9C3D] flex-1 h-[1px]"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
