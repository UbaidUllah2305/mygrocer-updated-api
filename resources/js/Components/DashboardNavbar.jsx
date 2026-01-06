import { Link } from "@inertiajs/react";
import { User } from "lucide-react";

export default function DashboardNavbar({ auth }) {
    const user = auth?.user;

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return "Good Morning";
        } else if (hour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };

    return (
        <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-full mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Left Side - Logo */}
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <img
                            src="/assets/Assets/logo.png"
                            alt="My Grocer Logo"
                            className="h-15 w-15 object-contain"
                        />
                    </Link>

                    {/* Center - Greeting */}
                    <div className="flex-1 flex flex-col items-start justify-center ml-5">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Hi Admin!
                        </h2>
                        <p className="text-sm text-gray-600">{getGreeting()}</p>
                    </div>

                    {/* Right Side - User Profile */}
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-600 fill-gray-600" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
