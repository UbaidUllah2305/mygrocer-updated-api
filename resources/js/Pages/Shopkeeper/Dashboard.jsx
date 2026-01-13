import React from "react";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

// Import all page components
import ShopkeeperDashboard from "./Dashboard/ShopkeeperDashboard";
import InventoryPage from "./Dashboard/Inventory/Inventory";
import AddProducts from "./Dashboard/Inventory/AddProducts";
import Orders from "./Dashboard/OrderReceived/Orders";
import Adjustments from "./Dashboard/Adjustments/Adjustments";
import Analytics from "./Dashboard/Analytics/Analytics";
import Trends from "./Dashboard/Trends/Trends";
import Overheads from "./Dashboard/Overheads/Overheads";
import Accounts from "./Dashboard/Accounts/Accounts";
import Events from "./Dashboard/Events/Events";
import AddEvents from "./Dashboard/Events/AddEvents";
import Offers from "./Dashboard/Offers/Offers";
import CreateOffers from "./Dashboard/Offers/CreateOffers";
import Messages from "./Dashboard/Messages/Messages";
import Subscription from "./Dashboard/Settings/Subscription/Subscription";
import DeliverySettings from "./Dashboard/Settings/DeliverySettings/DeliverySettings";
import Vouchers from "./Dashboard/Settings/Vouchers/Vouchers";
import VendorDashboard from "./Dashboard/Settings/VendorDashboard/VendorDashboard";
import HelpCenter from "./Dashboard/Settings/HelpCenter/HelpCenter";
import ReminderPage from "./Dashboard/Settings/Reminder/ReminderPage";
import Notifications from "./Dashboard/Notifications/Notifications";

export default function Dashboard({ auth, page: pageName }) {
    // Component mapping
    const pageComponents = {
        "Dashboard": ShopkeeperDashboard,
        "Inventory": InventoryPage,
        "AddProducts": AddProducts,
        "EditProducts": AddProducts,
        "Orders": Orders,
        "Adjustments": Adjustments,
        
        // // Analytics & Reports
        "Analytics": Analytics,
        "Trends": Trends,
        
        // // Financial Management
        "Overheads": Overheads,
        "Accounts": Accounts,
        
        // // Marketing & Promotions
        "Events": Events,
        "AddEvents": AddEvents,
        "Offers": Offers,
        "CreateOffers": CreateOffers,
        
        // // Orders & Communication
        "Messages": Messages,
        "Notifications": Notifications,
        
        // // Settings
        "Settings/Subscription": Subscription,
        "Settings/DeliverySettings": DeliverySettings,
        "Settings/Vouchers": Vouchers,
        "Settings/VendorDashboard": VendorDashboard,
        "Settings/HelpCenter": HelpCenter,
        "Settings/Reminder": ReminderPage,

    };

    // Get the current component
    const CurrentComponent = pageComponents[pageName] || ShopkeeperDashboard;

    // Get page title for Head
    const getPageTitle = () => {
        const titleMap = {
            "Dashboard": "Dashboard",
            "Inventory": "Inventory Management",
            "AddProducts": "Add Product",
            "EditProducts": "Edit Product",
            "Orders": "Orders",
            "Adjustments": "Adjustments",
            "Analytics": "Analytics",
            "Trends": "Trends",
            "Overheads": "Overheads",
            "Accounts": "Accounts",
            "Events": "Events",
            "AddEvents": "Add Event",
            "Offers": "Offers",
            "CreateOffers": "Create Offer",
            "Messages": "Messages",
            "Notifications": "Notifications",
            "Settings/Subscription": "Subscription",
            "Settings/DeliverySettings": "Delivery Settings",
            "Settings/Vouchers": "Vouchers",
            "Settings/VendorDashboard": "Vendor Dashboard",
            "Settings/HelpCenter": "Help Center",
            "Settings/Reminder": "Reminder",
        };
        return titleMap[pageName] || "MyGrocer";
    };

    return (
        <DashboardLayout auth={auth}>
            <Head title={getPageTitle()} />
            <CurrentComponent auth={auth} />
        </DashboardLayout>
    );
}
