import React from "react";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

// Import all page components
import ShopkeeperDashboard from "./Dashboard/ShopkeeperDashboard";
import InventoryPage from "./Dashboard/Inventory/Inventory";
import AddProducts from "./Dashboard/Inventory/AddProducts";
import Orders from "./Dashboard/OrderReceived/Orders";
// import Adjustments from "../Admin/Adjustments";
// import Analytics from "../Admin/Analytics";
// import Trends from "../Admin/Trends";
// import Overheads from "../Admin/Overheads";
// import Accounts from "../Admin/Accounts";
// import Events from "../Admin/Events";
// import AddEvents from "../Admin/AddEvents";
// import Offers from "../Admin/Offers";
// import CreateOffers from "../Admin/CreateOffers";
// import Orders from "../Admin/Orders";
// import Messages from "../Admin/Messages";
// import Subscription from "../Admin/Settings/Subscription";
// import DeliverySettings from "../Admin/Settings/DeliverySettings";
// import Vouchers from "../Admin/Settings/Vouchers";
// import VendorDashboard from "../Admin/Settings/VendorDashboard";
// import HelpCenter from "../Admin/Settings/HelpCenter";
// import ReminderPage from "../Admin/Settings/ReminderPage";

export default function Dashboard({ auth, page: pageName }) {
    // Component mapping
    const pageComponents = {
        "Dashboard": ShopkeeperDashboard,
        "Inventory": InventoryPage,
        "AddProducts": AddProducts,
        "EditProducts": AddProducts,
        "Orders": Orders,
        // "Adjustments": Adjustments,
        
        // // Analytics & Reports
        // "Analytics": Analytics,
        // "Trends": Trends,
        
        // // Financial Management
        // "Overheads": Overheads,
        // "Accounts": Accounts,
        
        // // Marketing & Promotions
        // "Events": Events,
        // "AddEvents": AddEvents,
        // "Offers": Offers,
        // "CreateOffers": CreateOffers,
        
        // // Orders & Communication
        // "Messages": Messages,
        
        // // Settings
        // "Settings/Subscription": Subscription,
        // "Settings/DeliverySettings": DeliverySettings,
        // "Settings/Vouchers": Vouchers,
        // "Settings/VendorDashboard": VendorDashboard,
        // "Settings/HelpCenter": HelpCenter,
        // "Settings/Reminder": ReminderPage,
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
            // "Adjustments": "Adjustments",
            // "Analytics": "Analytics",
            // "Trends": "Trends",
            // "Overheads": "Overheads",
            // "Accounts": "Accounts",
            // "Events": "Events",
            // "AddEvents": "Add Event",
            // "Offers": "Offers",
            // "CreateOffers": "Create Offer",
            // "Messages": "Messages",
            // "Settings/Subscription": "Subscription",
            // "Settings/DeliverySettings": "Delivery Settings",
            // "Settings/Vouchers": "Vouchers",
            // "Settings/VendorDashboard": "Vendor Dashboard",
            // "Settings/HelpCenter": "Help Center",
            // "Settings/Reminder": "Reminder",
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
