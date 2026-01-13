import React from "react";
import PaymentMethodCard from "../PaymentMethodCard";
import { ChevronDown } from "lucide-react";

const PaymentMethodSection = ({
  paymentMethod,
  setPaymentMethod,
  isExpanded,
  setIsExpanded,
  total,
  onAddDetailsClick,
}) => {
  return (
    <div className="bg-[#EFEFEF] rounded-xl p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-gray-900">
          Payment Method
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xl text-gray-600 font-medium hover:text-gray-800 flex items-center gap-1"
        >
          {isExpanded ? "Change" : "Change"}
          <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {isExpanded ? (
        <div className="space-y-3">
          {/* Cash */}
          <div className="flex items-center gap-4">
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
            <PaymentMethodCard
              iconSrc="/assets/Assets/Customer/checkout/cash.svg"
              label="Cash"
              price={total}
              isSelected={paymentMethod === "cash"}
              onClick={() => setPaymentMethod("cash")}
            />
          </div>

          {/* Visa */}
          <div className="flex items-center gap-4">
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
            <PaymentMethodCard
              iconSrc="/assets/Assets/Customer/checkout/visa.svg"
              label="Visa"
              price={total}
              isSelected={paymentMethod === "visa"}
              onClick={() => setPaymentMethod("visa")}
              actionLabel="Add details"
              isExpanded={isExpanded}
              onAddDetailsClick={onAddDetailsClick} 
            />
          </div>

          {/* Card */}
          <div className="flex items-center gap-4">
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
            <PaymentMethodCard
              iconSrc="/assets/Assets/Customer/checkout/card.svg"
              label="Credit or Debit Card"
              price={total}
              isSelected={paymentMethod === "card"}
              onClick={() => setPaymentMethod("card")}
              actionLabel="Add details"
              isExpanded={isExpanded}
              onAddDetailsClick={onAddDetailsClick} 
            />
          </div>
        </div>
      ) : (
        <PaymentMethodCard
          iconSrc={
            paymentMethod === "cash"
              ? "/assets/Assets/Customer/checkout/cash.svg"
              : paymentMethod === "visa"
              ? "/assets/Assets/Customer/checkout/visa.svg"
              : "/assets/Assets/Customer/checkout/card.svg"
          }
          label={
            paymentMethod === "cash"
              ? "Cash"
              : paymentMethod === "visa"
              ? "Visa"
              : "Credit or Debit Card"
          }
          price={total}
          isSelected={true}
          onClick={() => setIsExpanded(true)}
        />
      )}
    </div>
  );
};

export default PaymentMethodSection;