import React from "react";
import { Check } from "lucide-react";

const OrderStepper = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-5xl mx-auto mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step.id <= currentStep
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
              className={`mt-2 text-xs text-center max-w-20 ${
                step.id <= currentStep ? "text-[#6F9C3D] font-medium" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-12 sm:w-16 md:w-20 mx-1 ${
                step.id < currentStep ? "bg-[#6F9C3D]" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderStepper;