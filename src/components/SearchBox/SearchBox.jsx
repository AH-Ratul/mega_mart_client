import React, { useEffect, useRef, useState } from "react";
import Loader from "../Shared/Loader/Loader";
import { useSearchProductsQuery } from "../../redux/api/products_api";
import { useNavigate } from "react-router-dom";
import { allIcons } from "../../data/all-icons";

const SearchBox = () => {
  const { search } = allIcons;
  const [query, setQuery] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (keyword.trim() !== "") {
        setQuery(keyword.trim());
      } else {
        setQuery("");
      }
    }, [400]);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const {
    data: products = [],
    isLoading,
    error,
  } = useSearchProductsQuery(query, {
    skip: !query,
  });

  const handleBlur = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // delay to allow click event
  };

  const handleFocus = () => {
    if (query) {
      setShowDropdown(true);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (value) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  return (
    <>
      <div className="relative w-full max-w-md mx-auto">
        {/* Search Input and Button */}
        <div className="flex items-center lg:w-[360px]">
          <input
            type="text"
            className="text-gray1 rounded-2xl py-[9px] ps-3 w-full outline-none text-sm"
            placeholder="Search"
            value={keyword}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button
            className="bg-black/95 hover:bg-black/70 px-2 py-[6.5px] me-[2px] text-white/90 text-xl rounded-full absolute right-0"
            aria-label="Search"
          >
            {search}
          </button>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute mt-2 w-full max-w-md bg-white rounded-lg shadow-lg z-50">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader size="20px" />
              </div>
            ) : error ? (
              <p className="text-red-500 text-center py-4 text-sm">
                Something went wrong.
              </p>
            ) : products.length === 0 && query ? (
              <p className="text-gray-500 text-center py-4 text-sm">
                No results found for "
                <span className="font-medium">{query}</span>".
              </p>
            ) : (
              <ul className="max-h-80 overflow-y-auto">
                {products.map((product) => (
                  <li
                    key={product._id}
                    onClick={() =>
                      navigate(
                        `/details/${product._id}/${encodeURIComponent(
                          product.productName
                        )}`
                      )
                    }
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <img
                      src={product.productImages}
                      alt={product.productName}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span className="truncate">{product.productName}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBox;
