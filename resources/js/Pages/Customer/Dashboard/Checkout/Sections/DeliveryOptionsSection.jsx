import React from "react";
import DeliveryOptionCard from "../DeliveryOptionCard";

const DeliveryOptionsSection = ({ deliveryOption, setDeliveryOption }) => {
  return (
    <div className="rounded-xl p-6 mb-6 bg-[#EFEFEF] shadow-sm">
      <h2 className="text-xl font-medium text-gray-900 mb-4">
        Delivery Options
      </h2>
      <div className="space-y-3">
        <DeliveryOptionCard
          label="Standard 10-25 mins"
          price={0}
          selected={deliveryOption === "standard"}
          onClick={() => setDeliveryOption("standard")}
        />
        <DeliveryOptionCard
          label="Express Delivery 5-10 mins"
          price={150}
          selected={deliveryOption === "express"}
          onClick={() => setDeliveryOption("express")}
        />
        <DeliveryOptionCard
          label="Schedule Delivery"
          selected={deliveryOption === "schedule"}
          onClick={() => setDeliveryOption("schedule")}
          expandable
        />
      </div>
    </div>
  );
};

export default DeliveryOptionsSection;