import { useEffect, useRef, useState } from "react";

const SortDropDown = ({ sortBy, setSortBy }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "default", label: "Sort By: Default" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
  ];

  // Detect screen size for hover or click
  const isDesktop = window.innerWidth >= 1280;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hover handler for desktop
  const handleMouseEnter = () => {
    if (isDesktop) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (isDesktop) setOpen(false);
  };

  const handleToggleClick = () => {
    if (!isDesktop) setOpen((prev) => !prev);
  };

  const handleSelect = (value) => {
    setSortBy(value);
    setOpen(false);
  };

  return (
    <div
      className="relative w-40"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleToggleClick}
        className="w-full bg-white border z-20 border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary flex justify-between items-center transition-all"
      >
        {options.find((opt) => opt.value === sortBy)?.label}
      </button>

      {open && (
        <div className="absolute pt-2 z-20 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropDown;
