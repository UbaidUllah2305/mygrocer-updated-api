import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import {
  MapPin,
  ChevronDown,
  Check,
  Home,
  Heart,
  Plus,
  Briefcase,
  Pencil,
  Trash2,
} from "lucide-react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import LocationEditModal from "@/Components/Customer/LocationEditModal";

// Label Tag Component
const LabelTag = ({ label, Icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 rounded-full border transition text-sm bg-[#6F9C3D4F] text-[#6F9C3D] hover:border-[#6F9C3D]"
  >
    <Icon className="w-5 h-5 text-[#6F9C3D]" />
    {label}
  </button>
);

// Delivery Option Component
const DeliveryOption = ({
  label,
  sublabel,
  price,
  selected,
  onClick,
  expandable,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-4 h-14 rounded-lg border bg-[#FFFFFF] cursor-pointer transition ${
      selected ? "border-[#6F9C3D]" : "border-[#B9BBBD]"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          selected ? "border-[#6F9C3D]" : "border-gray-300"
        }`}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#6F9C3D]" />}
      </div>
      <div>
        <p className="text-sm font-normal text-gray-800">{label}</p>
        {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {price !== undefined && (
        <span className="text-sm font-medium p-1 px-2 bg-[#6F9C3D4F] text-[#6F9C3D] rounded-2xl">
          {price === 0 ? "FREE" : `Rs. ${price}`}
        </span>
      )}
      {expandable && <ChevronDown className="w-5 h-5 text-gray-400" />}
    </div>
  </div>
);

// Payment Option Component
const PaymentOption = ({
  label,
  iconSrc,
  selected,
  onClick,
  price,
  actionLabel,
  isExpanded,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition ${
      selected
        ? "border-[#6F9C3D] bg-[#6F9C3D08]"
        : "border-gray-200 hover:border-gray-300"
    }`}
  >
    <div className="flex items-center gap-3">
      {/* Icon + Label */}
      <div className="flex items-center gap-2">
        {iconSrc ? (
          <img src={iconSrc} alt={label} className="w-6 h-6 object-contain" />
        ) : (
          <span className="text-lg">💳</span>
        )}
        <span className="text-sm font-medium text-gray-800">{label}</span>
      </div>
    </div>

    {/* Price or Action Button */}
    <div className="flex items-center gap-2">
      {price && !isExpanded && (
        <span className="text-sm text-gray-600">Rs.{price}</span>
      )}
      {actionLabel && isExpanded && (
        <button className="px-3 py-1 bg-[#6F9C3D] text-white text-xs rounded-md hover:bg-[#5d8a32] transition">
          {actionLabel}
        </button>
      )}
    </div>
  </div>
);

// Order Summary Item Component
const OrderItem = ({ name, quantity, price }) => (
  <div className="flex justify-between text-sm py-1">
    <span>
      {quantity}× {name}
    </span>
    <span>Rs. {price}</span>
  </div>
);

const Checkout = ({
  cartItems: initialCartItems,
  storeName: initialStoreName,
  auth,
}) => {
  // Mock data if not provided
  const cartItems = initialCartItems || [
    {
      id: 1,
      name: "Opler's Full Cream Milk 1Liter",
      quantity: 1,
      price: 347,
      originalPrice: 370,
    },
    {
      id: 2,
      name: "Nescafe Classic 1",
      quantity: 1,
      price: 26,
      originalPrice: 30,
    },
    {
      id: 3,
      name: "Peri peri sauce",
      quantity: 1,
      price: 172,
      originalPrice: 185,
    },
  ];

  // Mock saved addresses
  const savedAddresses = [
    {
      id: 1,
      type: "work",
      label: "Work",
      address: "365 Link ATI Main Road Lahore",
      note: "none",
      icon: "💼",
    },
    {
      id: 2,
      type: "home",
      label: "Home",
      address: "365 Link ATI Main Road Lahore",
      note: "none",
      icon: "🏠",
    },
  ];

  const storeName = initialStoreName || "Al Fatah - Allama Iqbal Town (LHR)";

  // Form state
  const [address, setAddress] = useState("Work 365 Link ATI Main Road");
  const [suburb, setSuburb] = useState("");
  const [floor, setFloor] = useState("");
  const [noteToRider, setNoteToRider] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("home");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [email, setEmail] = useState("ayeshanadeem456@gmail.com");
  const [firstName, setFirstName] = useState("Ayesha");
  const [lastName, setLastName] = useState("Nadeem");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [saveForNext, setSaveForNext] = useState(false);
  const [isPaymentExpanded, setIsPaymentExpanded] = useState(false);
  const [showSavedAddresses, setShowSavedAddresses] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = deliveryOption === "express" ? 150 : 0;
  const serviceFee = 8.5;
  const packagingFee = 25;
  const discount = 99.05;
  const total = subtotal + deliveryFee + serviceFee + packagingFee - discount;

  const labels = [
    { id: "home", label: "Home", Icon: Home },
    { id: "work", label: "Work", Icon: Briefcase },
    { id: "partner", label: "Partner", Icon: Heart },
    { id: "other", label: "Other", Icon: Plus },
  ];

  const handlePlaceOrder = () => {
    // Navigate to order tracking page
    router.visit("/order-tracking");
  };

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={true}
      showBreadcrumb={true}
    >
      {/* Main Content */}
      <div className="flex justify-between items-start gap-2 lg:gap-4">
        <div className="flex flex-col gap-4">
          {/* Main Title */}
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Review and place your order
          </h1>
          {/* Left Column - Form */}
          <div className="w-full">
            {/* Delivery Address Section */}
            <div className="rounded-xl p-6 mb-6 bg-[#EFEFEF] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Delivery address
                </h2>
                <button
                  onClick={() => setShowSavedAddresses(!showSavedAddresses)}
                  className="text-lg md:text-xl font-normal hover:underline"
                >
                  {showSavedAddresses
                    ? "Hide Saved address"
                    : "View Saved address"}
                </button>
              </div>

              {/* Conditional rendering for saved addresses vs map */}
              {showSavedAddresses ? (
                /* Saved Addresses View */
                <div className="space-y-3">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="radio"
                          checked={address === `${addr.label} ${addr.address}`}
                          onChange={() => {
                            setAddress(`${addr.label} ${addr.address}`);
                            setSuburb("");
                            setFloor("");
                            setNoteToRider(addr.note);
                            setSelectedLabel(addr.type);
                            setShowSavedAddresses(false);
                          }}
                          className="w-5 h-5 text-[#6F9C3D] border-gray-300 focus:ring-[#6F9C3D]"
                        />
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{addr.icon}</span>
                          <div>
                            <p className="text-sm font-medium">{addr.label}</p>
                            <p className="text-sm font-medium">
                              {addr.address}
                            </p>
                            <p className="text-sm">
                              Note to rider: {addr.note}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-[#6F9C3D] hover:text-green-700">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 py-3 border-b">
                    <Plus className="w-5 h-5 text-gray-600" />
                    <button className="text-lg font-medium text-gray-600 hover:text-gray-800">
                      Add address
                    </button>
                  </div>
                </div>
              ) : (
                /* Original Map View */
                <>
                  {/* Map Placeholder */}
                  <div className="relative h-49 bg-[#f0f9ff] rounded-lg mb-4 overflow-hidden border border-[#dbeafe]">
                    {/* Decorative map-like background */}
                    <div className="absolute inset-0 opacity-20">
                      <svg
                        viewBox="0 0 400 200"
                        className="w-full h-full text-[#3b82f6]"
                      >
                        <path
                          d="M20 100 Q 100 20, 200 100 T 380 100"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle cx="200" cy="100" r="8" fill="currentColor" />
                        <circle
                          cx="80"
                          cy="60"
                          r="4"
                          fill="currentColor"
                          opacity="0.7"
                        />
                        <circle
                          cx="320"
                          cy="140"
                          r="4"
                          fill="currentColor"
                          opacity="0.7"
                        />
                        <rect
                          x="150"
                          y="50"
                          width="100"
                          height="20"
                          rx="4"
                          fill="currentColor"
                          opacity="0.3"
                        />
                      </svg>
                    </div>

                    {/* Address Pin */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="bg-white p-2 rounded-full shadow-md border-2 border-[#FF8829]">
                        <MapPin className="w-6 h-6 text-[#FF8829]" />
                      </div>
                    </div>

                    {/* Address Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-xs font-medium line-clamp-1">
                        {address || "Delivery address"}
                      </p>
                      <p className="text-white/80 text-xs">Lahore, Pakistan</p>
                    </div>

                    {/* Open in Maps Button */}
                    {address && (
                      <a
                        href={`https://www.google.com/maps?q=  ${encodeURIComponent(
                          address + ", Lahore"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#FF8829] text-xs px-2 py-1 rounded-full flex items-center gap-1 hover:bg-white transition"
                      >
                        <MapPin className="w-3 h-3" />
                        Open in Maps
                      </a>
                    )}
                  </div>

                  {/* Address Input */}
                  <div className="flex items-center gap-2 mb-4 p-3 border-b">
                    <MapPin className="w-6 h-6 text-gray-400" />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-transparent text-sm font-medium outline-none"
                      />
                      <p className="text-sm">Lahore</p>
                    </div>
                    <button
                      onClick={() => setShowLocationModal(true)}
                      className="text-sm font-medium hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}

              {/* Missing Suburb Notice */}
              <p className="text-lg mt-5 font-medium mb-3">
                We're missing your suburb
              </p>

              {/* Suburb Input */}
              <input
                type="text"
                placeholder="Enter your suburb"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                className="w-full p-3 border border-[#B9BBBD] h-14 text-[#9B9DA2] rounded-lg mb-3 bg-[#FFFFFF] text-lg outline-none focus:border-[#6F9C3D] transition"
              />

              {/* Floor Input */}
              <input
                type="text"
                placeholder="Floor"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full p-3 border border-[#B9BBBD] h-14 text-[#9B9DA2] rounded-lg mb-3 bg-[#FFFFFF] text-lg outline-none focus:border-[#6F9C3D] transition"
              />

              {/* Note to Rider */}
              <input
                type="text"
                placeholder="Note to rider - e.g. building, landmark"
                value={noteToRider}
                onChange={(e) => setNoteToRider(e.target.value)}
                className="w-full p-3 pb-13 border border-[#B9BBBD] h-22 text-[#9B9DA2] rounded-lg mb-3 bg-[#FFFFFF] text-lg outline-none focus:border-[#6F9C3D] transition"
              />

              {/* Label Selection */}
              <p className="text-lg font-medium mb-3">Add a label</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {labels.map((item) => (
                  <LabelTag
                    key={item.id}
                    label={item.label}
                    Icon={item.Icon}
                    active={selectedLabel === item.id}
                    onClick={() => setSelectedLabel(item.id)}
                  />
                ))}
              </div>

              {/* Save and Continue Button */}
              <button className="w-full bg-[#FF8829] hover:bg-[#FF7711] text-white py-3 rounded-lg font-semibold transition">
                Save and continue
              </button>
            </div>

            {/* Delivery Options Section */}
            <div className="rounded-xl p-6 mb-6 bg-[#EFEFEF] shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                Delivery Options
              </h2>
              <div className="space-y-3">
                <DeliveryOption
                  label="Standard 10-25 mins"
                  price={0}
                  selected={deliveryOption === "standard"}
                  onClick={() => setDeliveryOption("standard")}
                />
                <DeliveryOption
                  label="Express Delivery 5-10 mins"
                  price={150}
                  selected={deliveryOption === "express"}
                  onClick={() => setDeliveryOption("express")}
                />
                <DeliveryOption
                  label="Schedule Delivery"
                  selected={deliveryOption === "schedule"}
                  onClick={() => setDeliveryOption("schedule")}
                  expandable
                />
              </div>
            </div>

            {/* Payment Method Section - Collapsible */}
            <div className="bg-[#EFEFEF] rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-900">
                  Payment Method
                </h2>
                <button
                  onClick={() => setIsPaymentExpanded(!isPaymentExpanded)}
                  className="text-xl text-gray-600 font-medium hover:text-gray-800 flex items-center gap-1"
                >
                  {isPaymentExpanded ? "Change" : "Change"}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isPaymentExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {isPaymentExpanded ? (
                // EXPANDED VIEW: Radio buttons on left, outside the card
                <div className="space-y-3">
                  {/* Cash Option */}
                  <div className="flex items-center gap-4">
                    {/* Radio Button - Outside Card */}
                    <div
                      onClick={() => setPaymentMethod("cash")}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        paymentMethod === "cash"
                          ? "border-[#6F9C3D]"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "cash" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#6F9C3D]" />
                      )}
                    </div>

                    {/* Payment Card - Full Width */}
                    <div
                      onClick={() => setPaymentMethod("cash")}
                      className={`flex-1 p-4 bg-[#FFFFFF] rounded-lg border cursor-pointer transition ${
                        paymentMethod === "cash"
                          ? "border-[#6F9C3D] bg-[#6F9C3D08]"
                          : "border-[#B9BBBD] hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src="/assets/Assets/Customer/checkout/cash.svg"
                            alt="Cash"
                            className="w-6 h-6 object-contain"
                          />
                          <span className="text-sm font-medium">Cash</span>
                        </div>
                        <span className="text-sm">Rs.{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Visa Option */}
                  <div className="flex items-center gap-4">
                    {/* Radio Button - Outside Card */}
                    <div
                      onClick={() => setPaymentMethod("visa")}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        paymentMethod === "visa"
                          ? "border-[#6F9C3D]"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "visa" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#6F9C3D]" />
                      )}
                    </div>

                    {/* Payment Card - Full Width */}
                    <div
                      onClick={() => setPaymentMethod("visa")}
                      className={`flex-1 p-4 bg-[#FFFFFF] rounded-lg border cursor-pointer transition ${
                        paymentMethod === "visa"
                          ? "border-[#6F9C3D] bg-[#6F9C3D08]"
                          : "border-[#B9BBBD] hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src="/assets/Assets/Customer/checkout/visa.svg"
                            alt="Visa"
                            className="w-6 h-6 object-contain"
                          />
                          <span className="text-sm font-medium text-gray-800">
                            Visa
                          </span>
                        </div>
                        <button className="px-3 py-1 bg-[#6F9C3D] text-white text-xs rounded-xl hover:bg-[#5d8a32] transition">
                          Add details
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Credit/Debit Card Option */}
                  <div className="flex items-center gap-4">
                    {/* Radio Button - Outside Card */}
                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-[#6F9C3D]"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "card" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#6F9C3D]" />
                      )}
                    </div>

                    {/* Payment Card - Full Width */}
                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`flex-1 p-4 bg-[#FFFFFF] rounded-lg border cursor-pointer transition ${
                        paymentMethod === "card"
                          ? "border-[#6F9C3D] bg-[#6F9C3D08]"
                          : "border-[#B9BBBD] hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src="/assets/Assets/Customer/checkout/card.svg"
                            alt="Card"
                            className="w-6 h-6 object-contain"
                          />
                          <span className="text-sm font-medium text-gray-800">
                            Credit or Debit Card
                          </span>
                        </div>
                        <button className="px-3 py-1 bg-[#6F9C3D] text-white text-xs rounded-xl hover:bg-[#5d8a32] transition">
                          Add details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // COLLAPSED VIEW: Show only selected option, full width, no radio
                <div
                  onClick={() => setIsPaymentExpanded(true)}
                  className="p-4 bg-[#FFFFFF] rounded-lg border border-[#B9BBBD] cursor-pointer hover:border-gray-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        paymentMethod === "cash"
                          ? "/assets/Assets/Customer/checkout/cash.svg"
                          : paymentMethod === "visa"
                          ? "/assets/Assets/Customer/checkout/visa.svg"
                          : "/assets/Assets/Customer/checkout/card.svg"
                      }
                      alt={
                        paymentMethod === "cash"
                          ? "Cash"
                          : paymentMethod === "visa"
                          ? "Visa"
                          : "Card"
                      }
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {paymentMethod === "cash"
                        ? "Cash"
                        : paymentMethod === "visa"
                        ? "Visa"
                        : "Credit or Debit Card"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Rs.{total.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Personal Details Section - Floating Labels */}
            <div className="bg-[#EFEFEF] rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                Personal details
              </h2>

              {/* Email Input */}
              <div className="relative mb-4">
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder={email ? "" : "Enter your email"}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-[#FFFFFF] border rounded-xl outline-none transition focus:border-[#6F9C3D] peer border-[#6F9C3D]"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 top-3 text-base text-[#6F9C3D] rounded-md transition-all pointer-events-none ${
                    email || email === ""
                      ? "-translate-y-full scale-75 text-[#6F9C3D] bg-white px-1"
                      : ""
                  }`}
                >
                  Email
                </label>
              </div>

              {/* Name Row - First & Last Name */}
              <div className="flex gap-4 mb-4">
                {/* First Name */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    placeholder={firstName ? "" : "Enter your first name"}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 bg-[#FFFFFF] border rounded-lg outline-none transition focus:border-[#6F9C3D] peer border-[#6F9C3D]"
                  />
                  <label
                    htmlFor="firstName"
                    className={`absolute left-3 top-3 text-base text-[#6F9C3D] rounded-md transition-all pointer-events-none ${
                      firstName || firstName === ""
                        ? "-translate-y-full scale-75 text-[#6F9C3D] bg-white px-1"
                        : ""
                    }`}
                  >
                    First Name
                  </label>
                </div>

                {/* Last Name */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    placeholder={lastName ? "" : "Enter your last name"}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 bg-[#FFFFFF] border rounded-lg outline-none transition focus:border-[#6F9C3D] peer border-[#6F9C3D]"
                  />
                  <label
                    htmlFor="lastName"
                    className={`absolute left-3 top-3 text-base text-[#6F9C3D] rounded-md transition-all pointer-events-none ${
                      lastName || lastName === ""
                        ? "-translate-y-full scale-75 text-[#6F9C3D] bg-white px-1"
                        : ""
                    }`}
                  >
                    Last Name
                  </label>
                </div>
              </div>

              {/* Phone Number */}
              <div className="relative mb-4">
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder={phoneNumber ? "" : "Enter your phone number"}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#FFFFFF] p-3 border rounded-lg outline-none transition focus:border-[#6F9C3D] peer border-[#6F9C3D]"
                />
                <label
                  htmlFor="phoneNumber"
                  className={`absolute left-3 top-3 text-base text-[#6F9C3D] rounded-md transition-all pointer-events-none ${
                    phoneNumber || phoneNumber === ""
                      ? "-translate-y-full scale-75 text-[#6F9C3D] bg-white px-1"
                      : ""
                  }`}
                >
                  Phone Number
                </label>
              </div>

              {/* Save Button */}
              <button className="w-full bg-[#9B9DA2] hover:bg-[#9B9DA9] text-white py-3 rounded-lg font-medium transition mb-4">
                Save
              </button>
            </div>

            <div className="m-6 ml-0">
              {/* Save for next order checkbox */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveForNext}
                  onChange={(e) => setSaveForNext(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-[#6F9C3D] focus:ring-[#6F9C3D]"
                />
                <span className="text-sm font-medium">
                  Save it for next order
                </span>
              </label>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[#FF8829] hover:bg-[#e67a24] text-white py-4 rounded-lg font-semibold text-lg transition"
            >
              Place Order
            </button>

            {/* Terms */}
            <p className="text-xs mt-3">
              By clicking this, you'll have you agree to our{" "}
              <Link
                href="#"
                className="text-[#6F9C3D] font-medium hover:underline"
              >
                terms and conditions
              </Link>
            </p>
            <p className="text-xs mt-1">
              I agree that placing this order place an obligation to make a
              payment in accordance with the General Terms and Conditions.
            </p>
          </div>
        </div>
        {/* Right Column - Order Summary */}
        <div className="bg-[#6F9C3D29] rounded-xl p-6 shadow-sm sticky top-24 border border-gray-100">
          {/* Receipt Style Header */}
          <div className="pb-4 mb-4">
            <h3 className="text-xl font-semibold mb-1">Your order from</h3>
            <p className="text-sm">{storeName}</p>
          </div>

          {/* Order Items */}
          <div className="border-b pb-4 mb-4">
            {cartItems.map((item) => (
              <OrderItem
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
              />
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-sm pb-4 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard delivery</span>
              <span>Rs. {deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>Rs. {serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Packaging Fee</span>
              <span>Rs. {packagingFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>- Rs. {discount.toFixed(2)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-gray-900">Total</p>
              <p className="text-xs">incl. fees and tax</p>
            </div>
            <p className="text-xl font-bold text-gray-900">
              Rs. {total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Location Edit Modal */}
      <LocationEditModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        currentAddress={address}
        onSubmit={(newAddress) => setAddress(newAddress)}
      />
    </CustomerDashboardLayout>
  );
};

export default Checkout;
