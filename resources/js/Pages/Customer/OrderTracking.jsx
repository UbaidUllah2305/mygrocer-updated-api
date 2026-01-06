import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import CustomerHeader from "../../Components/Customer/CustomerHeader";
import { Clock, Phone, MapPin, Check } from "lucide-react";

// Step data
const steps = [
  { id: 1, label: "Order Placed" },
  { id: 2, label: "Confirmed" },
  { id: 3, label: "Processing" },
  { id: 4, label: "Prepared" },
  { id: 5, label: "Out for Delivery" },
  { id: 6, label: "Delivered" },
];

// Stepper Component
const OrderStepper = ({ currentStep }) => (
  <div className="flex items-center justify-between w-full max-w-5xl mx-auto mb-8">
    {steps.map((step, index) => (
      <div key={step.id} className="flex items-center">
        {/* Step Circle */}
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step.id <= currentStep
              ? "bg-[#6F9C3D] text-white"
              : "bg-white border-2 border-gray-300 text-gray-400"
              }`}
          >
            {step.id <= currentStep ? (
              step.id < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                step.id
              )
            ) : (
              step.id
            )}
          </div>
          <span
            className={`mt-2 text-xs text-center max-w-20 ${step.id <= currentStep ? "text-[#6F9C3D] font-medium" : "text-gray-400"
              }`}
          >
            {step.label}
          </span>
        </div>

        {/* Connector Line */}
        {index < steps.length - 1 && (
          <div
            className={`h-0.5 w-12 sm:w-16 md:w-20 mx-1 ${step.id < currentStep ? "bg-[#6F9C3D]" : "bg-gray-300"
              }`}
          />
        )}
      </div>
    ))}
  </div>
);

// Info Card Component
const InfoCard = ({ icon, iconBg, title, children }) => (
  <div className="bg-[#6F9C3D29] rounded-xl p-4 shadow-sm border border-gray-100 flex-1 min-w-[200px] max-w-[432px]">
    <div className="flex items-start gap-3">
      <div className={`w-10 h-10 rounded-full bg-[#6F9C3D] flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base font-medium mb-1">{title}</p>
        {children}
      </div>
    </div>
  </div>
);

const OrderTracking = ({ initialStep = 1 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  // Mock order data
  const orderData = {
    storeName: "Al Fatah - Allama Iqbal Town (LHR)",
    items: [
      { id: 1, name: "Opler's Full Cream Milk 1500ml", quantity: 1, price: 347 },
      { id: 2, name: "Nescafe Classic 1", quantity: 1, price: 26 },
      { id: 3, name: "Peri peri sauce", quantity: 1, price: 172 },
    ],
    subtotal: 545,
    deliveryFee: 150,
    serviceFee: 8.56,
    packagingFee: 25,
    discount: 99.05,
    total: 638.51,
    estimatedDelivery: {
      start: "3:05 PM",
      end: "3:30 PM",
      duration: "25 minutes",
    },
    deliveryPartner: {
      name: "Usman Ali",
      rating: 4.8,
      deliveries: 2545,
    },
    deliveryAddress: {
      street: "House 123, Street 45",
      area: "Gulshan Iqbal, Block 13, Lahore.",
    },
  };

  // Simulate order progression (for demo)
  useEffect(() => {
    if (currentStep < 2) {
      const timer = setTimeout(() => {
        setCurrentStep(2);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const getStatusMessage = () => {
    switch (currentStep) {
      case 1:
        return "Your order has been Placed";
      case 2:
        return "Your order has been confirmed";
      case 3:
        return "Your order is being processed";
      case 4:
        return "Your order has been prepared";
      case 5:
        return "Your order is out for delivery";
      case 6:
        return "Your order has been delivered";
      default:
        return "Your order has been Placed";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <CustomerHeader />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl w-full mx-auto">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-lg font-medium mb-6 mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#6F9C3D] font-normal">
              Go to home
            </Link>
            <span>/</span>
            <Link href="/stores" className="hover:text-[#6F9C3D]">
              Stores List
            </Link>
            <span>/</span>
            <Link href="/store-preview" className="hover:text-[#6F9C3D]">
              Al- Fatah Lahore
            </Link>
            <span>/</span>
            <span className="font-medium underline">Checkout</span>
          </div>

          {/* Title */}
          <h1
            className="text-2xl font-semibold text-gray-900 mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Track your order
          </h1>

          {/* Stepper */}
          <OrderStepper currentStep={currentStep} />

          {/* Order Status Illustration */}
          <div className="mb-6 flex justify-center">
            <img
              src={
                currentStep === 1
                  ? "/assets/Assets/Customer/checkout/placed.svg"
                  : "/assets/Assets/Customer/checkout/confirmed.svg"
              }
              alt={currentStep === 1 ? "Order placed" : "Order confirmed"}
              className="w-full max-w-xs md:max-w-sm"
            />
          </div>

          {/* Status Message */}
          <p className="text-center text-xl font-semibold text-[#6F9C3D] mb-8">
            {getStatusMessage()}
          </p>

          {/* Order Summary Card */}
          <div className="bg-[#6F9C3D29] rounded-xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left - Order Items */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">Your order from</h3>
                <p className="text-sm mb-3">{orderData.storeName}</p>

                <button className="text-[#6F9C3D] text-sm font-semibold mb-4 hover:underline">
                  Order Summary
                </button>

                <div className="space-y-2">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm font-medium">
                      <span>
                        {item.quantity} × {item.name}
                      </span>
                      <span>Rs. {item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Price Breakdown */}
              <div className="lg:w-64">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs. {orderData.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard delivery Charges</span>
                    <span>Rs. {orderData.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>Rs. {orderData.serviceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packaging Fee</span>
                    <span>Rs. {orderData.packagingFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>- Rs. {orderData.discount}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="bg-[#C7D5B8] rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xl font-bold">Total</p>
                        <p className="text-sm ">(incl. fees and tax)</p>
                      </div>
                      <p className="text-xl font-bold">Rs. {orderData.total}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info Cards */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Estimated Delivery Time */}
            <InfoCard
              icon={<Clock className="w-5 h-5 text-white" />}
              iconBg="bg-[#6F9C3D1A]"
              title="Estimated Delivery Time"
            >
              <p className="text-xl font-semibold text-[#6F9C3D]">
                {orderData.estimatedDelivery.start} - {orderData.estimatedDelivery.end}
              </p>
              <p className="text-xs font-medium">
                Your order will arrive in approximately {orderData.estimatedDelivery.duration}
              </p>
            </InfoCard>

            {/* Delivery Partner */}
            <InfoCard
              icon={
                <div className="bg-[#6F9C3D] rounded-full flex items-center justify-center">
                  <img
                    src="/assets/Assets/Customer/storepreview/scooter.svg"
                    alt="scooter"
                    className="w-5 h-5 filter invert"
                  />
                </div>
              }
              iconBg="bg-[#6F9C3D1A]"
              title="Delivery Partner"
            >
              <div className="flex flex-col lg:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-xl font-semibold text-[#6F9C3D]">{orderData.deliveryPartner.name}</p>
                  <p className="text-xs font-medium">
                    {orderData.deliveryPartner.rating} Ratings · {orderData.deliveryPartner.deliveries.toLocaleString()} Deliveries
                  </p>
                </div>
                <button className="bg-[#6F9C3D] hover:bg-[#5d8a32] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition whitespace-nowrap">
                  <Phone className="w-4 h-4" />
                  Call Rider
                </button>
              </div>
            </InfoCard>

            {/* Delivery Address */}
            <InfoCard
              icon={<MapPin className="w-5 h-5 text-white" />}
              iconBg="bg-[#FF88291A]"
              title="Delivery Address"
            >
              <p className="text-lg font-semibold">{orderData.deliveryAddress.street}</p>
              <p className="text-sm font-medium">{orderData.deliveryAddress.area}</p>
            </InfoCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;