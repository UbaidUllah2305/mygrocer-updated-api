import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Check } from 'lucide-react';
import CustomerDashboardLayout from "@/Layouts/CustomerDashboardLayout";

const ProfilePage = ({ auth }) => {
  const [formData, setFormData] = useState({
    firstName: "Samad Ahmed",
    lastName: "Ahmed",
    mobile: "",
    email: "ayeshanadeem34534@gmail.com",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const isFilled = (field) => !!formData[field];

  return (
    <CustomerDashboardLayout
      auth={auth}
      showFilters={false}
      showLocationBar={false}
      showBreadcrumb={true}
    >
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
        My Profile
      </h1>

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {["firstName", "lastName"].map((field) => (
            <div key={field} className="relative">
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full md:max-w-[604px] px-4 h-14 md:h-16 border border-[#6F9C3D] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base md:text-lg peer"
                style={{ fontFamily: "'Inter', sans-serif'" }}
              />
              <label
                className={`absolute left-4 ${isFilled(field) ? '-top-2.5 text-xs' : 'top-3.5 text-lg'
                  } text-[#6F9C3D] bg-white px-1 py-1 transition-all duration-200 pointer-events-none`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {field === "firstName" ? "First Name" : "Last Name"}
              </label>
            </div>
          ))}
        </div>

        {/* Mobile Number */}
        <div className="mb-7 relative">
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full md:max-w-[604px] h-14 md:h-16 px-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base peer"
            style={{ fontFamily: "'Inter', sans-serif'" }}
          />
          <label
            className={`absolute left-4 ${isFilled("mobile") ? "-top-2.5 text-xs" : "top-3.5 text-lg"
              } text-[#6F9C3D] bg-white px-1 py-1 transition-all duration-200 pointer-events-none`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Mobile Number
          </label>
        </div>

        {/* Email */}
        <div className="mb-6">
          <h3 className="text-lg md:text-xl font-medium mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            Email
          </h3>
          <div className="relative mb-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full md:max-w-[604px] px-4 h-14 md:h-16 border border-[#6F9C3D] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base peer"
              style={{ fontFamily: "'Inter', sans-serif'" }}
            />
            <label
              className={`absolute left-4 ${isFilled("email") ? "-top-2.5 text-xs" : "top-3.5 text-lg"
                } text-[#6F9C3D] bg-white px-1 py-1 transition-all duration-200 pointer-events-none`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Email Address
            </label>
          </div>
          {formData.email && (
            <span className="inline-flex h-8 items-center gap-1 text-xs bg-[#6F9C3D29] px-4 py-0.5 rounded-xl">
              <span className="bg-[#6F9C3D] h-4 text-white rounded-xl -ml-1">
                <Check className="h-4 w-4" />
              </span>
              Verified
            </span>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-medium mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            Password
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["currentPassword", "newPassword"].map((field) => (
              <div key={field} className="relative">
                <input
                  type="password"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full md:max-w-[604px] px-4 h-14 md:h-16 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base peer"
                  style={{ fontFamily: "'Inter', sans-serif'" }}
                />
                <label
                  className={`absolute left-4 ${isFilled(field) ? "-top-2.5 text-xs" : "top-3.5 text-lg"
                    } text-[#6F9C3D] bg-white px-1 py-1 transition-all duration-200 pointer-events-none`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {field === "currentPassword" ? "Current Password" : "New Password"}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Payments Section */}
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-medium mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            My Payments
          </h2>
          <p className="text-base md:text-lg mb-4">
            You have not saved payment option yet.
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#FF8B2C] w-[130px] md:w-[154px] h-12 text-base md:text-lg text-white rounded-lg font-medium hover:bg-[#FF7A1A] transition"
          >
            Save
          </button>
        </div>
      </form>
    </CustomerDashboardLayout>
  );
};

export default ProfilePage;