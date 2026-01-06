// resources/js/Components/Admin/DateInput.jsx
import { format, parse } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";

export default function DateInput({ value, onChange, label = "From" }) {
  const dateValue = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined;

  const handleChange = (selectedDate) => {
    if (selectedDate) {
      onChange(format(selectedDate, "yyyy-MM-dd"));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center justify-between gap-2 border-2 border-gray-300 rounded-xl bg-white px-3 py-2.5 text-[16px] font-medium shadow-sm hover:border-gray-400 transition text-left w-48"
        >
          {/* Left: Label + Value */}
          <div className="flex items-center gap-2">
            <span className="text-gray-700 whitespace-nowrap">{label} :</span>
            <span className="text-gray-600 min-w-20">
              {value ? format(parse(value, "yyyy-MM-dd", new Date()), "MM-dd-yy") : "Select date"}
            </span>
          </div>

          {/* Right: Calendar Icon */}
          <img
            src="/assets/Assets/calender.png"
            alt="calendar"
            className="h-5 w-5 object-contain shrink-0 text-gray-500"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="z-50 rounded-lg border border-gray-200 bg-white p-3 shadow-xl"
      >
        <DayPicker
          mode="single"
          selected={dateValue}
          onSelect={handleChange}
          initialFocus
          className="p-2"
          classNames={{
            months: "flex flex-col space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium text-gray-800",
            nav_button: "h-7 w-7 bg-white border border-gray-300 rounded-md hover:bg-gray-100 flex items-center justify-center",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-xs font-semibold text-gray-500 w-9 text-center",
            row: "flex w-full mt-2",
            cell: "text-center text-sm p-1 rounded-md w-9",
            day: "h-9 w-9 p-0 font-normal",
            day_selected: "bg-blue-500 text-white hover:bg-blue-600",
            day_today: "font-bold border border-blue-500",
            day_outside: "text-gray-400 opacity-50",
            day_disabled: "text-gray-300 opacity-50 cursor-not-allowed",
          }}
          modifiersClassNames={{
            selected: "bg-blue-500 text-white",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

