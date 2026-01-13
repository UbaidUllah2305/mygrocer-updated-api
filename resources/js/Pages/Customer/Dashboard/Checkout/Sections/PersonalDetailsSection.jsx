import React from "react";

const PersonalDetailsSection = ({
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  saveForNext,
  setSaveForNext,
}) => {
  const isFilled = (field) => !!field;

  return (
    <div className="bg-[#EFEFEF] rounded-xl p-6 mb-6 shadow-sm">
      <h2 className="text-xl font-medium text-gray-900 mb-4">
        Personal details
      </h2>

      {/* Email */}
      <div className="relative mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-[#FFFFFF] border rounded-xl outline-none transition focus:border-[#6F9C3D] peer border-[#6F9C3D]"
        />
        <label
          htmlFor="email"
          className={`absolute left-3 top-3 text-base text-[#6F9C3D] rounded-md transition-all pointer-events-none ${
            isFilled(email)
              ? "-translate-y-full scale-75 text-[#6F9C3D] bg-white px-1"
              : ""
          }`}
        >
          Email
        </label>
      </div>

      {/* First & Last Name */}
      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 bg-[#FFFFFF] border rounded-lg outline-none transition focus:border-[#6F9C3D] peer border-[#6F9C3D]"
          />
          <label
            htmlFor="firstName"
            className={`absolute left-3 top-3 text-base text-[#6F9C3D] rounded-md transition-all pointer-events-none ${
              isFilled(firstName)
                ? "-translate-y-full scale-75 text-[#6F9C3D] bg-white px-1"
                : ""
            }`}
          >
            First Name
          </label>
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 bg-[#FFFFFF] border rounded-lg outline-none transition focus:border-[#6F9C3D] peer border-[#6F9C3D]"
          />
          <label
            htmlFor="lastName"
            className={`absolute left-3 top-3 text-base text-[#6F9C3D] rounded-md transition-all pointer-events-none ${
              isFilled(lastName)
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
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full bg-[#FFFFFF] p-3 border rounded-lg outline-none transition focus:border-[#6F9C3D] peer border-[#6F9C3D]"
        />
        <label
          htmlFor="phoneNumber"
          className={`absolute left-3 top-3 text-base text-[#6F9C3D] rounded-md transition-all pointer-events-none ${
            isFilled(phoneNumber)
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

      {/* Save for next */}
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
  );
};

export default PersonalDetailsSection;