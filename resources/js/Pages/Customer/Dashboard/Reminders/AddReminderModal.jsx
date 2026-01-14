import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

const AddReminderModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [repeatType, setRepeatType] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const [isRepeatDropdownOpen, setIsRepeatDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const repeatTypeRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (repeatTypeRef.current && !repeatTypeRef.current.contains(event.target)) {
        setIsRepeatDropdownOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setIsStatusDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a reminder title.");
      return;
    }
    alert(`Reminder added: ${title}`);
    onClose();
    setTitle("");
    setDate("");
    setRepeatType("");
    setStatus("");
    setDescription("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6 shadow-xl relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 rounded-full text-white hover:text-gray-400 transition z-10"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
          Add a Reminder
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Reminder Title"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base md:text-lg"
              style={{ fontFamily: "'Inter', sans-serif'" }}
            />
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base md:text-lg"
              style={{ fontFamily: "'Inter', sans-serif'" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div ref={repeatTypeRef} className="relative">
              <button
                type="button"
                onClick={() => setIsRepeatDropdownOpen(!isRepeatDropdownOpen)}
                className="w-full p-2 py-3 border border-neutral-300 rounded-lg flex items-center justify-between text-left"
              >
                <span className="text-sm">{repeatType || "Select Repeat Type"}</span>
                <ChevronDown className="text-neutral-400 w-5 h-5" />
              </button>
              {isRepeatDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="max-h-40 overflow-y-auto">
                    {["Daily", "Weekly", "Monthly", "Yearly"].map((type) => (
                      <div
                        key={type}
                        onClick={() => {
                          setRepeatType(type);
                          setIsRepeatDropdownOpen(false);
                        }}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${repeatType === type ? "bg-[#D3FFA1AB]" : ""}`}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div ref={statusRef} className="relative">
              <button
                type="button"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="w-full p-2 py-3 border border-neutral-300 rounded-lg flex items-center justify-between text-left"
              >
                <span className="text-sm">{status || "Select Status"}</span>
                <ChevronDown className="text-neutral-400 w-5 h-5" />
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="max-h-40 overflow-y-auto">
                    {["Active", "Inactive"].map((stat) => (
                      <div
                        key={stat}
                        onClick={() => {
                          setStatus(stat);
                          setIsStatusDropdownOpen(false);
                        }}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${status === stat ? "bg-[#D3FFA1AB]" : ""}`}
                      >
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="4"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F9C3D] text-base"
              style={{ fontFamily: "'Inter', sans-serif'" }}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="max-w-[530px] w-full py-3 bg-[#6F9C3D] text-white text-lg font-bold rounded-lg hover:bg-[#5A7E2F] transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReminderModal;