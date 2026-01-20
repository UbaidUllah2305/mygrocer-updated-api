import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import AddressSection from "./Sections/AddressSection";
import DeliveryOptionsSection from "./Sections/DeliveryOptionsSection";
import PaymentMethodSection from "./Sections/PaymentMethodSection";
import PersonalDetailsSection from "./Sections/PersonalDetailsSection";
import OrderSummary from "./OrderSummary";
import AddPaymentDetailsModal from "./AddPaymentDetailsModal";
import LocationEditModal from "@/Components/Customer/LocationEditModal";

const Checkout = ({ cartItems: initialCartItems, storeName: initialStoreName, auth }) => {
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
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

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

  const handlePlaceOrder = () => {
    router.visit("/order-tracking");
  };

  const handleAddDetailsClick = () => {
    setShowAddPaymentModal(true);
  };

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={true}
      showBreadcrumb={true}
    >
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
        <div className="w-full lg:flex-1 flex flex-col gap-4">
          {/* Main Title */}
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Review and place your order
          </h1>

          {/* Address Section */}
          <AddressSection
            savedAddresses={savedAddresses}
            address={address}
            setAddress={setAddress}
            suburb={suburb}
            setSuburb={setSuburb}
            floor={floor}
            setFloor={setFloor}
            noteToRider={noteToRider}
            setNoteToRider={setNoteToRider}
            selectedLabel={selectedLabel}
            setSelectedLabel={setSelectedLabel}
            showSavedAddresses={showSavedAddresses}
            setShowSavedAddresses={setShowSavedAddresses}
            showLocationModal={showLocationModal}
            setShowLocationModal={setShowLocationModal}
          />

          {/* Delivery Options */}
          <DeliveryOptionsSection
            deliveryOption={deliveryOption}
            setDeliveryOption={setDeliveryOption}
          />

          {/* Payment Method */}
          <PaymentMethodSection
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            isExpanded={isPaymentExpanded}
            setIsExpanded={setIsPaymentExpanded}
            total={total}
            onAddDetailsClick={handleAddDetailsClick}
          />

          {/* Personal Details */}
          <PersonalDetailsSection
            email={email}
            setEmail={setEmail}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            saveForNext={saveForNext}
            setSaveForNext={setSaveForNext}
          />

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

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0 sticky top-4">
          <OrderSummary
            cartItems={cartItems}
            storeName={storeName}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            serviceFee={serviceFee}
            packagingFee={packagingFee}
            discount={discount}
            total={total}
          />
        </div>
      </div>

      {/* Modals */}
      <AddPaymentDetailsModal
        isOpen={showAddPaymentModal}
        onClose={() => setShowAddPaymentModal(false)}
      />
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