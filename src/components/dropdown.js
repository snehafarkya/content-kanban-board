import { useEffect, useRef, useState } from "react";

export default function CustomDropdown({
  options = [],
  placeholder = "Select an option",
  value,
  onChange,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const selectedOption = options.find(
    (opt) => String(opt.key) === String(value)
  );

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="w-full p-2 text-left bg-white border-gray-300 border rounded-md  flex justify-between items-center"
      >
        <span>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className=" opacity-70">▾</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange(option.key); 
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-blue-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
