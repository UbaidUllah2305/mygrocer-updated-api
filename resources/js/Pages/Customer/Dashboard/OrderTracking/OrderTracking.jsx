import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Clock, Phone, MapPin } from "lucide-react";
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";
import ProgressStepper from "@/Components/ProgressStepper";
import InfoCard from "./InfoCard";
import OrderSummaryCard from "./OrderSummaryCard";

const steps = [
  { id: 1, label: "Order Placed" },
  { id: 2, label: "Confirmed" },
  { id: 3, label: "Processing" },
  { id: 4, label: "Prepared" },
  { id: 5, label: "Out for Delivery" },
  { id: 6, label: "Delivered" },
];

const OrderTracking = ({ auth, initialStep = 1 }) => {
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

  // Simulate order progression
  useEffect(() => {
    if (currentStep < 6) {
      const timer = setTimeout(() => setCurrentStep((prev) => prev + 1), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const getStatusMessage = () => {
    switch (currentStep) {
      case 1: return "Your order has been Placed";
      case 2: return "Your order has been confirmed";
      case 3: return "Your order is being processed";
      case 4: return "Your order has been prepared";
      case 5: return "Your order is out for delivery";
      case 6: return "Your order has been delivered";
      default: return "Your order has been Placed";
    }
  };

  const getStepImage = () => {
    switch (currentStep) {
      case 1: return "/assets/Assets/Customer/checkout/placed.svg";
      case 2: return "/assets/Assets/Customer/checkout/confirmed.svg";
      case 3: return "/assets/Assets/Customer/checkout/process.svg";
      case 4: return "/assets/Assets/Customer/checkout/prepared.svg";
      case 5: return "/assets/Assets/Customer/checkout/delivery.svg";
      case 6: return "/assets/Assets/Customer/checkout/delivered.svg";
      default: return "/assets/Assets/Customer/checkout/placed.svg";
    }
  };

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      <div>
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
          Track your order
        </h1>

        {/* Stepper */}
        <div className="w-full max-w-5xl mx-auto">
          <ProgressStepper currentStep={currentStep} steps={steps.map(s => s.label)} />
        </div>

        {/* Order Status Illustration */}
        <div className="mb-6 flex justify-center">
          <img
            src={getStepImage()}
            alt={getStatusMessage()}
            className="w-full max-w-xs md:max-w-sm"
          />
        </div>

        {/* Status Message */}
        <p className="text-center text-xl font-semibold text-[#6F9C3D] mb-8">
          {getStatusMessage()}
        </p>

        {/* Order Summary */}
        <OrderSummaryCard orderData={orderData} />

        {/* Bottom Info Cards */}
        <div className="flex flex-col sm:flex-row gap-4">
          <InfoCard
            icon={<Clock className="w-5 h-5 text-white" />}
            title="Estimated Delivery Time"
          >
            <p className="text-xl font-semibold text-[#6F9C3D]">
              {orderData.estimatedDelivery.start} - {orderData.estimatedDelivery.end}
            </p>
            <p className="text-xs font-medium">
              Your order will arrive in approximately {orderData.estimatedDelivery.duration}
            </p>
          </InfoCard>

          <InfoCard
            icon={
              <div className="bg-[#6F9C3D] rounded-full flex items-center justify-center p-1">
                <img
                  src="/assets/Assets/Customer/storepreview/scooter.svg"
                  alt="scooter"
                  className="w-4 h-4 filter invert"
                />
              </div>
            }
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

          <InfoCard
            icon={<MapPin className="w-5 h-5 text-white" />}
            title="Delivery Address"
          >
            <p className="text-lg font-semibold">{orderData.deliveryAddress.street}</p>
            <p className="text-sm font-medium">{orderData.deliveryAddress.area}</p>
          </InfoCard>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};

export default OrderTracking;