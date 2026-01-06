import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setStatus("");

        try {
            const response = await axios.post("/api/v1/shopkeeper/forgot-password", {
                email,
            });

            if (response.data.success) {
                setStatus(response.data.message);
                setEmail("");
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setErrors({ email: [error.response.data.message] });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Navbar */}
            <nav className="w-full px-4 py-4 sm:px-6 lg:px-8 border-b border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link 
                        href="/shopkeeper" 
                        className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:opacity-80"
                    >
                        <img 
                            src="/assets/Assets/logo.png" 
                            alt="My Grocer Logo" 
                            className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 object-contain"
                        />
                        <div className="flex flex-col text-[#6F9C3D]">
                            <span className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">
                                My Grocer
                            </span>
                            <span className="text-xs sm:text-sm lg:text-base leading-tight">
                                Manage your Business
                            </span>
                        </div>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        
                        {/* Left Side - Illustration (Hidden on mobile/tablet) */}
                        <div className="hidden lg:flex lg:items-center lg:justify-center">
                            <div className="w-full max-w-lg xl:max-w-2xl">
                                <img
                                    src="/Images/Shopkeeper/login.png"
                                    alt="Shopkeeper Login Illustration"
                                    className="w-full h-auto object-contain"
                                    loading="lazy"
                                />
                                <p className="mt-6 text-center text-base xl:text-lg font-medium text-[#6F9C3D] px-4">
                                    Manage your products, view orders, and grow your grocery business.
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Login Form */}
                        <div className="w-full flex items-center justify-center">
                            <div className="w-full max-w-md lg:max-w-lg">
                                {/* Form Header */}
                                <div className="mb-6 sm:mb-8">
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-2">
                                        Forgot Password?
                                    </h1>
                                    <p className="text-sm sm:text-base text-gray-600 font-medium">
                                        Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                                    </p>
                                </div>

                                {/* Success Message */}
                                {status && (
                                    <div className="mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-sm text-green-600">{status}</p>
                                    </div>
                                )}

                                {/* Error Messages */}
                                {errors.email && (
                                    <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm text-red-600">{errors.email[0]}</p>
                                    </div>
                                )}

                                {/* Forgot Password Form */}
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                    {/* Email Input */}
                                    <div>
                                        <label htmlFor="email" className="sr-only">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            autoComplete="email"
                                            placeholder="Enter Email Address"
                                            disabled={processing}
                                            className={`w-full px-4 py-3 sm:py-4 text-sm sm:text-base border rounded-lg transition-all duration-200
                                                ${errors.email 
                                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                                    : 'border-gray-300 focus:ring-[#6F9C3D] focus:border-[#6F9C3D] hover:border-gray-400'
                                                } 
                                                focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[#6F9C3D] text-white py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg
                                            hover:bg-[#5d8a32] active:bg-[#4d7a22] 
                                            transition-all duration-200
                                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#6F9C3D]
                                            focus:outline-none focus:ring-2 focus:ring-[#6F9C3D] focus:ring-offset-2
                                            shadow-sm hover:shadow-md"
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
                                                Sending...
                                            </span>
                                        ) : (
                                            "Email Password Reset Link"
                                        )}
                                    </button>
                                </form>

                                {/* Back to Login Link */}
                                <div className="flex items-center justify-center gap-3 sm:gap-4 my-6 sm:my-8">
                                    <div className="flex-1 border-t-2 border-[#6F9C3D]"></div>
                                    <Link
                                        href="/shopkeeper/login"
                                        className="text-base sm:text-lg lg:text-xl text-[#6F9C3D] hover:text-[#5d8a32] hover:underline font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none focus:underline"
                                    >
                                        Back to Login
                                    </Link>
                                    <div className="flex-1 border-t-2 border-[#6F9C3D]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
