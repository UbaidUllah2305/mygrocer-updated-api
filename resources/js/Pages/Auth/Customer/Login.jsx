import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            const response = await axios.post("/api/v1/customer/login", {
                ...formData,
                remember: rememberMe,
            });
            
            if (response.data.success) {
                router.visit(response.data.redirect);
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
                        href="/" 
                        className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:opacity-80"
                    >
                        <img 
                            src="/assets/Assets/logo.png" 
                            alt="My Grocer Logo" 
                            className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 object-contain"
                        />
                        <div className="flex flex-col text-[#FF8829]">
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
                                    src="/Images/customer-login.png"
                                    alt="Customer Login Illustration"
                                    className="w-full h-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Right Side - Login Form */}
                        <div className="w-full flex items-center justify-center">
                            <div className="w-full max-w-md lg:max-w-lg">
                                {/* Form Header */}
                                <div className="mb-6 sm:mb-8">
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-2">
                                        Login
                                    </h1>
                                    <p className="text-sm sm:text-base text-gray-600 font-medium">
                                        Enter your credentials to buy with ease.
                                    </p>
                                </div>

                                {/* Error Messages */}
                                {(errors.email || errors.password) && (
                                    <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                                        {errors.email && (
                                            <p className="text-sm text-red-600 mb-1 last:mb-0">{errors.email[0]}</p>
                                        )}
                                        {errors.password && (
                                            <p className="text-sm text-red-600">{errors.password[0]}</p>
                                        )}
                                    </div>
                                )}

                                {/* Login Form */}
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                    {/* Email Input */}
                                    <div>
                                        <label htmlFor="email" className="sr-only">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            autoComplete="email"
                                            placeholder="Enter Email"
                                            disabled={processing}
                                            className={`w-full px-4 py-3 sm:py-4 text-sm sm:text-base border rounded-lg transition-all duration-200
                                                ${errors.email 
                                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                                    : 'border-gray-300 focus:ring-[#FF8829] focus:border-[#FF8829] hover:border-gray-400'
                                                } 
                                                focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                                        />
                                    </div>

                                    {/* Password Input */}
                                    <div>
                                        <label htmlFor="password" className="sr-only">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                required
                                                autoComplete="current-password"
                                                placeholder="Enter Your Password"
                                                disabled={processing}
                                                className={`w-full px-4 py-3 sm:py-4 pr-12 text-sm sm:text-base border rounded-lg transition-all duration-200
                                                    ${errors.password 
                                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                                        : 'border-gray-300 focus:ring-[#FF8829] focus:border-[#FF8829] hover:border-gray-400'
                                                    } 
                                                    focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={processing}
                                                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF8829] focus:outline-none focus:text-[#FF8829] transition-colors duration-200 disabled:opacity-50"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-5 h-5" />
                                                ) : (
                                                    <Eye className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remember Me Checkbox */}
                                    <div className="flex justify-start items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            disabled={processing}
                                            className="w-4 h-4 text-[#FF8829] bg-white border-gray-300 rounded transition-colors duration-200
                                                focus:ring-2 focus:ring-[#FF8829] focus:ring-offset-0
                                                hover:border-[#FF8829] cursor-pointer shrink-0
                                                checked:bg-[#FF8829] checked:border-[#FF8829]
                                                disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                        <label 
                                            htmlFor="remember" 
                                            className="text-sm sm:text-base text-gray-700 cursor-pointer select-none"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[#FF8829] text-white py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg
                                            hover:bg-[#e67722] active:bg-[#cc6619] 
                                            transition-all duration-200
                                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FF8829]
                                            focus:outline-none focus:ring-2 focus:ring-[#FF8829] focus:ring-offset-2
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
                                                Signing in...
                                            </span>
                                        ) : (
                                            "Login"
                                        )}
                                    </button>
                                </form>

                                {/* Forgot Password Divider */}
                                <div className="flex items-center justify-center gap-3 sm:gap-4 my-6 sm:my-8">
                                    <div className="flex-1 border-t-2 border-[#FF8829]"></div>
                                    <Link
                                        href="/customer/forgot-password"
                                        className="text-sm sm:text-base lg:text-lg font-medium text-[#FF8829] hover:text-[#e67722] hover:underline whitespace-nowrap transition-colors duration-200 focus:outline-none focus:underline"
                                    >
                                        Forgot Password?
                                    </Link>
                                    <div className="flex-1 border-t-2 border-[#FF8829]"></div>
                                </div>

                                {/* Sign Up Link */}
                                <div className="text-center">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Don't have an account?{" "}
                                        <Link
                                            href="/customer/register"
                                            className="text-[#FF8829] hover:text-[#e67722] hover:underline font-medium transition-colors duration-200 focus:outline-none focus:underline"
                                        >
                                            Sign up
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
