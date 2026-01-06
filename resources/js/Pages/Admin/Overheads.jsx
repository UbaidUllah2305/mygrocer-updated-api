import React, { useState, useEffect, useRef } from "react";
import Header from "../../Components/Admin/Header";
import Sidebar from "../../Components/Admin/Sidebar";
import { Pencil, ChevronDown } from "lucide-react";
import { router } from "@inertiajs/react";

// Mock data — matches image content with multiple different dates
const fallbackData = [
    {
        exp: "Shop Rent",
        amt: "1,300",
        date: "12/07/2025",
        payment: "Cash",
        status: "Paid",
        fre: "Monthly",
        receipt: "",
    },
    {
        exp: "Electricity Invoice",
        amt: "1,300",
        date: "12/08/2025",
        payment: "Cash",
        status: "Paid",
        fre: "Monthly",
        receipt: "",
    },
    {
        exp: "Water Invoice",
        amt: "1,300",
        date: "12/09/2025",
        payment: "Cash",
        status: "Paid",
        fre: "Monthly",
        receipt: "",
    },
    {
        exp: "Income Tax",
        amt: "1,300",
        date: "12/10/2025",
        payment: "Cash",
        status: "Paid",
        fre: "Monthly",
        receipt: "",
    },
    {
        exp: "Internet Invoice",
        amt: "1,300",
        date: "12/11/2025",
        payment: "Cash",
        status: "Paid",
        fre: "Monthly",
        receipt: "",
    },
    {
        exp: "Mobile Invoice",
        amt: "1,300",
        date: "12/12/2025",
        payment: "Cash",
        status: "Paid",
        fre: "Monthly",
        receipt: "",
    },
];

const OverheadsPage = () => {
    const [active, setActive] = useState("overheads");
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [items] = useState(fallbackData);

    // Filter State
    const [selectedFilterValue, setSelectedFilterValue] = useState("All");
    const [selectedFrequency, setSelectedFrequency] = useState("Monthly");

    // Dropdown states
    const [isFilter1Open, setIsFilter1Open] = useState(false);
    const [isFilter2Open, setIsFilter2Open] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [currentItem, setCurrentItem] = useState(null);

    // Refs for dropdowns
    const filter1Ref = useRef(null);
    const filter2Ref = useRef(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filter1Ref.current && !filter1Frame.current.contains(e.target)) {
                setIsFilter1Open(false);
            }
            if (filter2Ref.current && !filter2Frame.current.contains(e.target)) {
                setIsFilter2Open(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Sidebar mobile toggle
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            setIsSidebarOpen(!mobile);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        if (isMobile) setIsSidebarOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        if (isMobile) setIsSidebarOpen(false);
    };

    // Modal handlers
    const openAddModal = () => {
        setModalMode("add");
        setCurrentItem({
            exp: "",
            amt: "",
            date: "",
            payment: "Cash",
            status: "Paid",
            fre: "Monthly",
            receipt: "",
        });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setModalMode("edit");
        setCurrentItem({ ...item });
        setIsModalOpen(true);
    };

    const saveItem = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
    };

    const handleSidebarChange = (id) => {
        const paths = {
            dashboard: "/dashboard",
            inventory: "/inventory",
            analytics: "/analytics",
            trends: "/trends",
            adjustments: "/adjustments",
            overheads: "/overheads",
            events: "/events",
            offers: "/offers",
            orders: "/orders",
            messages: "/messages",
            accounts: "/accounts",
            vouchers: "/settings/vouchers",
            delivery: "/settings/deliverysettings",
            subscription: "/settings/subscription",
            "vendor-dashboard": "/settings/vendor-dashboard",
            "help-center": "/settings/help-center",
        };

        if (paths[id]) {
            router.visit(paths[id], {
                preserveScroll: true,
                preserveState: true,
            });
        }

        if (isMobile) {
            closeSidebar();
        }
    };

    const getFirstFilterOptions = () => {
        switch (selectedFrequency) {
            case "Weekly":
                const weeks = ["All"];
                for (let i = 1; i <= 52; i++) {
                    weeks.push(`Week ${i}`);
                }
                return weeks;
            case "Monthly":
                return ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            case "Yearly":
                const currentYear = new Date().getFullYear();
                return ["All", `${currentYear - 1}`, `${currentYear}`, `${currentYear + 1}`, `${currentYear + 2}`];
            default:
                return ["All"];
        }
    };

    const filteredItems = items.filter(item => {
        if (selectedFrequency !== "" && item.fre !== selectedFrequency) {
            return false;
        }

        if (selectedFilterValue !== "All") {
            const itemDate = new Date(item.date.split('/').reverse().join('-'));

            switch (selectedFrequency) {
                case "Weekly":
                    const dayOfYear = Math.floor((itemDate - new Date(itemDate.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
                    const weekNumber = Math.ceil(dayOfYear / 7);
                    return selectedFilterValue === `Week ${weekNumber}`;
                case "Monthly":
                    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][itemDate.getMonth()];
                    return selectedFilterValue === monthName;
                case "Yearly":
                    const itemYear = itemDate.getFullYear().toString();
                    return selectedFilterValue === itemYear;
                default:
                    return true;
            }
        }

        return true;
    });

    return (
        <div className="flex flex-col min-h-screen bg-white text-[#161c2b]">
            {/* Fixed Header */}
            <div className="shrink-0">
                <Header
                    isMobile={isMobile}
                    isSidebarOpen={isSidebarOpen}
                    onToggleSidebar={toggleSidebar}
                />
            </div>

            {/* Sidebar + Main Content */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    active={active}
                    onChange={handleSidebarChange}
                    isMobile={isMobile}
                    mobileOpen={isMobile ? isSidebarOpen : true}
                    onCloseMobile={closeSidebar}
                />

                {/* Main Content */}
                <main
                    className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}
                    style={{ marginTop: "99px" }}
                >
                    {/* Header with Filters & Button */}
                    <div className="mt-2 mb-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h2 className="text-2xl font-medium">Overheads</h2>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                                {/* Filter 1: Dynamic Filter Value */}
                                <div className="relative w-full sm:w-44" ref={filter1Ref}>
                                    <button
                                        type="button"
                                        className="w-full h-12 px-3 py-2.5 pr-10 text-base text-left border-2 border-gray-300 rounded-xl bg-white outline-none"
                                        onClick={() => setIsFilter1Open(!isFilter1Open)}
                                    >
                                        {selectedFilterValue}
                                        <ChevronDown
                                            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-transform ${isFilter1Open ? "rotate-180" : ""}`}
                                            size={18}
                                        />
                                    </button>

                                    {isFilter1Open && (
                                        <div
                                            className="absolute right-0 mt-1 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg z-10 overflow-hidden"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {getFirstFilterOptions().map((option, index, arr) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedFilterValue(option);
                                                        setIsFilter1Open(false);
                                                    }}
                                                    className={`block w-full text-left px-4 py-3 text-base font-normal ${selectedFilterValue === option
                                                        ? "bg-[#f0f7ed] text-[#161c2b]"
                                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                                        } ${index !== arr.length - 1 ? "border-b border-gray-300" : ""}`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Filter 2: Frequency */}
                                <div className="relative w-full sm:w-44" ref={filter2Ref}>
                                    <button
                                        type="button"
                                        className="w-full h-12 px-3 py-2.5 pr-10 text-base text-left border-2 border-gray-300 rounded-xl bg-white outline-none"
                                        onClick={() => setIsFilter2Open(!isFilter2Open)}
                                    >
                                        {selectedFrequency}
                                        <ChevronDown
                                            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-transform ${isFilter2Open ? "rotate-180" : ""}`}
                                            size={18}
                                        />
                                    </button>

                                    {isFilter2Open && (
                                        <div
                                            className="absolute right-0 mt-1 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg z-10 overflow-hidden"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {["Weekly", "Monthly", "Yearly"].map((freq, index, arr) => (
                                                <button
                                                    key={freq}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedFrequency(freq);
                                                        setSelectedFilterValue("All");
                                                        setIsFilter2Open(false);
                                                    }}
                                                    className={`block w-full text-left px-4 py-3 text-base font-normal ${selectedFrequency === freq
                                                        ? "bg-[#f0f7ed] text-[#161c2b]"
                                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                                        } ${index !== arr.length - 1 ? "border-b border-gray-300" : ""}`}
                                                >
                                                    {freq}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Add Button */}
                                <button
                                    type="button"
                                    onClick={openAddModal}
                                    className="h-12 sm:w-auto md:w-52 px-4 py-3 text-base font-medium text-white bg-[#6F9C3D] rounded-lg shadow-sm transition hover:bg-[#5a8232] focus:outline-none focus:ring-2 focus:ring-[#6F9C3D]/30 whitespace-nowrap"
                                >
                                    Add Overheads
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto mt-6">
                        <div className="min-w-[900px]">
                            {/* Table Header */}
                            <div className="rounded-xl bg-[#6f9c3d4f] p-4">
                                <div className="grid grid-cols-8 text-lg font-medium text-[#3a3e47]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    <div className="text-left py-2 truncate pl-4">Expense Name</div>
                                    <div className="text-left py-2 truncate pl-4">Amount</div>
                                    <div className="text-center py-2 truncate">Date</div>
                                    <div className="text-center py-2 truncate">Payment Method</div>
                                    <div className="text-center py-2 truncate">Status</div>
                                    <div className="text-center py-2 truncate">Frequency</div>
                                    <div className="text-center py-2 truncate">Receipt</div>
                                    <div className="text-center py-2 truncate">Actions</div>
                                </div>
                            </div>

                            {/* Table Rows */}
                            <div className="mt-3 space-y-3">
                                {filteredItems.length === 0 ? (
                                    <div className="rounded-xl bg-white p-4 text-center text-sm text-gray-600">
                                        No overheads found.
                                    </div>
                                ) : (
                                    filteredItems.map((row, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-xl bg-[#f7f7f7] p-4 shadow-sm ring-1 ring-black/5 transition-all hover:bg-[#f3f3f3]"
                                        >
                                            <div className="grid grid-cols-8 gap-2 items-center text-lg font-normal" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                                                {/* Expense Name */}
                                                <div className="text-left py-2 truncate pl-4">{row.exp}</div>
                                                {/* Amount */}
                                                <div className="text-left py-2 truncate pl-4">{row.amt}</div>
                                                {/* Date */}
                                                <div className="text-center py-2 truncate">{row.date}</div>
                                                {/* Payment Method */}
                                                <div className="text-center py-2 truncate">{row.payment}</div>
                                                {/* Status */}
                                                <div className="text-center py-2 truncate">{row.status}</div>
                                                {/* Frequency */}
                                                <div className="text-center py-2 truncate">{row.fre}</div>
                                                {/* Receipt */}
                                                <div className="text-center py-2 flex justify-center">
                                                    <div className="h-10 w-10 rounded-full border border-gray-300" />
                                                </div>
                                                {/* Actions */}
                                                <div className="text-center py-2 flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(row)}
                                                        className="p-1.5 hover:bg-gray-100 rounded transition"
                                                        title="Edit Overhead"
                                                    >
                                                        <Pencil className="w-5 h-5 text-[#6F9C3D]" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="overhead-modal-title"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsModalOpen(false);
                    }}
                >
                    <div className="relative w-[95vw] max-w-[1039px] rounded-2xl bg-white shadow-xl ring-1 ring-black/10 transition-transform duration-300">
                        <div className="absolute right-3 top-3 z-10">
                            <button
                                type="button"
                                aria-label="Close"
                                onClick={() => setIsModalOpen(false)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 id="overhead-modal-title" className="text-2xl font-semibold text-[#2c323c] text-center">
                                    {modalMode === "add" ? "Add Overheads" : "Edit Overheads"}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                                    <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                                        Expense Name
                                    </span>
                                    <input
                                        type="text"
                                        value={currentItem?.exp || ""}
                                        onChange={(e) => setCurrentItem(prev => ({ ...prev, exp: e.target.value }))}
                                        className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none"
                                        style={{ fontFamily: 'satoshi' }}
                                    />
                                </label>

                                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                                    <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                                        Amount
                                    </span>
                                    <input
                                        type="text"
                                        value={currentItem?.amt || ""}
                                        onChange={(e) => setCurrentItem(prev => ({ ...prev, amt: e.target.value }))}
                                        className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none"
                                        style={{ fontFamily: 'satoshi' }}
                                    />
                                </label>

                                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                                    <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                                        Date
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        value={currentItem?.date || ""}
                                        onChange={(e) => setCurrentItem(prev => ({ ...prev, date: e.target.value }))}
                                        className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none"
                                        style={{ fontFamily: 'satoshi' }}
                                    />
                                </label>

                                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                                    <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                                        Payment Method
                                    </span>
                                    <div className="relative">
                                        <select
                                            value={currentItem?.payment || ""}
                                            onChange={(e) => setCurrentItem(prev => ({ ...prev, payment: e.target.value }))}
                                            className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none appearance-none pr-8"
                                            style={{ fontFamily: 'satoshi' }}
                                        >
                                            <option value="">Select payment method</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Bank">Bank</option>
                                            <option value="Card">Card</option>
                                            <option value="Online">Online</option>
                                        </select>
                                        <svg
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                            width="16"
                                            height="16"
                                            fill="none"
                                            stroke="#2c323c"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </div>
                                </label>

                                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                                    <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                                        Status
                                    </span>
                                    <div className="relative">
                                        <select
                                            value={currentItem?.status || ""}
                                            onChange={(e) => setCurrentItem(prev => ({ ...prev, status: e.target.value }))}
                                            className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none appearance-none pr-8"
                                            style={{ fontFamily: 'satoshi' }}
                                        >
                                            <option value="">Select status</option>
                                            <option value="Paid">Paid</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Overdue">Overdue</option>
                                            <option value="Active">Active</option>
                                        </select>
                                        <svg
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                            width="16"
                                            height="16"
                                            fill="none"
                                            stroke="#2c323c"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </div>
                                </label>

                                <label className="relative rounded-xl border border-[#6f9c3d] px-4 py-3">
                                    <span className="absolute -top-3 left-4 bg-white px-2 text-[#6f9c3d] text-lg font-medium">
                                        Frequency
                                    </span>
                                    <div className="relative">
                                        <select
                                            value={currentItem?.fre || ""}
                                            onChange={(e) => setCurrentItem(prev => ({ ...prev, fre: e.target.value }))}
                                            className="mt-1 ml-2 w-full bg-transparent text-[#2c323c] text-lg outline-none appearance-none pr-8"
                                            style={{ fontFamily: 'satoshi' }}
                                        >
                                            <option value="">Select frequency</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Yearly">Yearly</option>
                                        </select>
                                        <svg
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                            width="16"
                                            height="16"
                                            fill="none"
                                            stroke="#2c323c"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </div>
                                </label>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <button
                                    type="button"
                                    className="inline-flex min-h-16 w-[696px] items-center justify-center rounded-xl bg-[#6f9c3d] px-6 py-3 text-white shadow font-semibold transition hover:bg-[#5a8232] focus:outline-none focus:ring-2 focus:ring-[#6f9c3D]/40"
                                    onClick={saveItem}
                                >
                                    {modalMode === "add" ? "Create" : "Update"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OverheadsPage;