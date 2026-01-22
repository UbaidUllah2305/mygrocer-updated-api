import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';
import Breadcrumb from '@/Components/Breadcrumb';
import { getBreadcrumbs } from '@/Components/Config/breadcrumbs';

export default function DashboardLayout({ children, auth, hideSidebar = false, customBreadcrumbs = null }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [active, setActive] = useState('dashboard');

    // Detect mobile screen
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            
            // Auto-close sidebar on desktop
            if (!mobile) {
                setSidebarOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Determine active menu item based on current URL
    useEffect(() => {
        const path = url.toLowerCase();
        
        const routeMap = {
            '/dashboard': 'dashboard',
            '/inventory': 'inventory',
            '/add-products': 'inventory',
            '/edit-products': 'inventory',
            '/orders-received': 'orders',
            '/analytics': 'analytics',
            '/warehouse': 'warehouse',
            '/adjustments': 'adjustments',
            '/overheads': 'overheads',
            '/trends': 'trends',
            '/offers': 'offers',
            '/events': 'events',
            '/accounts': 'accounts',
            '/list': 'accounts',
            '/income-statement': 'accounts',
            '/balance-sheet': 'accounts',
            '/messages': 'messages',
            '/settings/delivery-settings': 'delivery',
            '/settings/vouchers': 'vouchers',
            '/settings/subscription': 'subscription',
            '/settings/vendor-dashboard': 'vendor-dashboard',
            '/settings/help-center': 'help-center',
            '/settings/reminder': 'reminder'
        };

        // Find matching route
        for (const [route, activeKey] of Object.entries(routeMap)) {
            if (path.includes(route)) {
                setActive(activeKey);
                return;
            }
        }
        
        // Default to settings if on any settings page
        if (path.includes('/settings')) {
            setActive('settings');
        }
    }, [url]);

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleCloseMobile = () => {
        setSidebarOpen(false);
    };

    const handleMenuChange = (menuId) => {
        setActive(menuId);
    };

    // Get breadcrumbs automatically or use custom ones
    const breadcrumbs = customBreadcrumbs || getBreadcrumbs(url);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header
                isMobile={isMobile}
                isSidebarOpen={sidebarOpen}
                onToggleSidebar={handleToggleSidebar}
                auth={auth}
            />

            <div className="flex">
                {/* Sidebar */}
                {!hideSidebar && (
                    <Sidebar
                        active={active}
                        onChange={handleMenuChange}
                        isMobile={isMobile}
                        mobileOpen={sidebarOpen}
                        onCloseMobile={handleCloseMobile}
                    />
                )}

                {/* Main Content */}
                <main 
                    className={`flex-1 transition-all duration-300 ${
                        hideSidebar 
                            ? 'w-full' 
                            : isMobile 
                                ? 'w-full' 
                                : 'lg:ml-64'
                    }`}
                    style={{ 
                        marginTop: '80px',
                        minHeight: 'calc(100vh - 80px)'
                    }}
                >
                    {/* Content Wrapper with Breadcrumb */}
                    <div className="p-4 sm:p-6 lg:p-8">
                        {/* Auto Breadcrumb */}
                        {!hideSidebar && <Breadcrumb items={breadcrumbs} />}
                        
                        {/* Page Content */}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

// Set up persistent layout
DashboardLayout.displayName = 'DashboardLayout';
