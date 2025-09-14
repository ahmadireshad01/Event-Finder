import React, { useState, useRef, useEffect } from "react";

interface FilterButtonProps {
  label: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (option: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  options,
  isOpen,
  onToggle,
  onSelect,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none"
      >
        <span className="mr-2">{label}</span>
        <svg
          className={`w-4 h-4 fill-current transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.516 7.548L10 12.031l4.484-4.483 1.032 1.032-5.516 5.516-5.516-5.516z" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => onSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FilterGroup: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({
    Category: "Category",
    "Date Range": "Date Range",
    Location: "Location",
  });

  const filterData = [
    {
      label: "Category",
      options: ["Music", "Art", "Sports", "Tech", "Food", "Ed"],
    },
    { label: "Date Range", options: ["Today", "This Week", "This Month"] },
    { label: "Location", options: ["New York", "London", "Tokyo"] },
  ];

  const toggleDropdown = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleSelect = (label: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [label]: option }));
    setOpenIndex(null);
  };

  return (
    <div className="flex space-x-3 bg-gray-900 p-3 rounded-md max-w-md mx-auto">
      {filterData.map(({ label, options }, i) => (
        <FilterButton
          key={label}
          label={selectedOptions[label]}
          options={options}
          isOpen={openIndex === i}
          onToggle={() => toggleDropdown(i)}
          onSelect={(option) => handleSelect(label, option)}
        />
      ))}
    </div>
  );
};

export default FilterGroup;
