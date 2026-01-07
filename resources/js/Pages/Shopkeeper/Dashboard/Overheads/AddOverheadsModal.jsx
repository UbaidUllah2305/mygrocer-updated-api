import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import InputFloating from "@/Components/InputFloating";
import SelectFloating from "@/Components/SelectFloating";

const OverheadsModal = ({ isOpen, mode, item, onClose, onCreate, onUpdate }) => {
  const [focusedFields, setFocusedFields] = useState({});
  const [formData, setFormData] = useState({
    exp: "",
    amt: "",
    date: "",
    payment: "Cash",
    status: "Paid",
    fre: "Monthly",
    receipt: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && item) {
        setFormData({
          exp: item.exp || "",
          amt: item.amt || "",
          date: item.date || "",
          payment: item.payment || "Cash",
          status: item.status || "Paid",
          fre: item.fre || "Monthly",
          receipt: item.receipt || "",
        });
      } else {
        setFormData({
          exp: "",
          amt: "",
          date: "",
          payment: "Cash",
          status: "Paid",
          fre: "Monthly",
          receipt: "",
        });
      }
    }
  }, [isOpen, mode, item]);

  const setFieldFocus = (field, isFocused) => {
    setFocusedFields((prev) => ({ ...prev, [field]: isFocused }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const payload = { ...formData };
    if (mode === "add") {
      onCreate(payload);
    } else {
      onUpdate(payload);
    }
  };

  if (!isOpen) return null;

  const paymentOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Bank", label: "Bank" },
    { value: "Card", label: "Card" },
    { value: "Online", label: "Online" },
  ];

  const statusOptions = [
    { value: "Paid", label: "Paid" },
    { value: "Pending", label: "Pending" },
    { value: "Overdue", label: "Overdue" },
    { value: "Active", label: "Active" },
  ];

  const frequencyOptions = [
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-xl ring-1 ring-black/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-white shadow hover:opacity-90"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-[#2c323c] text-center mb-6">
            {mode === "add" ? "Add Overheads" : "Edit Overheads"}
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputFloating
              id="exp"
              label="Expense Name"
              value={formData.exp}
              onChange={(e) => handleInputChange("exp", e.target.value)}
              onFocus={() => setFieldFocus("exp", true)}
              onBlur={() => setFieldFocus("exp", false)}
              isFocused={focusedFields.exp}
            />

            <InputFloating
              id="amt"
              label="Amount"
              value={formData.amt}
              onChange={(e) => handleInputChange("amt", e.target.value)}
              onFocus={() => setFieldFocus("amt", true)}
              onBlur={() => setFieldFocus("amt", false)}
              isFocused={focusedFields.amt}
            />

            <InputFloating
              id="date"
              label="Date (DD/MM/YYYY)"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              onFocus={() => setFieldFocus("date", true)}
              onBlur={() => setFieldFocus("date", false)}
              isFocused={focusedFields.date}
            />

            <SelectFloating
              id="payment"
              label="Payment Method"
              value={formData.payment}
              onChange={(e) => handleInputChange("payment", e.target.value)}
              onFocus={() => setFieldFocus("payment", true)}
              onBlur={() => setFieldFocus("payment", false)}
              isFocused={focusedFields.payment}
              options={paymentOptions}
            />

            <SelectFloating
              id="status"
              label="Status"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              onFocus={() => setFieldFocus("status", true)}
              onBlur={() => setFieldFocus("status", false)}
              isFocused={focusedFields.status}
              options={statusOptions}
            />

            <SelectFloating
              id="fre"
              label="Frequency"
              value={formData.fre}
              onChange={(e) => handleInputChange("fre", e.target.value)}
              onFocus={() => setFieldFocus("fre", true)}
              onBlur={() => setFieldFocus("fre", false)}
              isFocused={focusedFields.fre}
              options={frequencyOptions}
            />
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="px-8 py-3 rounded-xl text-lg font-medium bg-[#6F9C3D] text-white hover:bg-[#5d8a32] transition-colors min-w-[200px]"
              onClick={handleSubmit}
            >
              {mode === "add" ? "Create" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverheadsModal;