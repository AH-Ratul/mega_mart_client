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
      <div className="flex xl:w-[360px] rounded-md items-center">
        <input
          type="text"
          className="text-gray1 rounded-2xl  py-[9px] ps-3 w-full outline-none text-sm"
          placeholder="Search"
          value={keyword}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button className="bg-black/95 hover:bg-black/70 px-2 py-[6.5px] me-[2px] text-white/90 text-xl rounded-full absolute right-0">
          {search}
        </button>
      </div>

      {showDropdown && (
        <div className="absolute mt-2 shadow-lg bg-white w-dvw xl:w-[500px] py-2 z-50 -right-3 xl:-left-16 rounded">
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <Loader size="20px" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center py-4 text-sm">
              Something went wrong.
            </p>
          ) : products.length === 0 && query ? (
            <p className="text-gray-500 text-center py-4 text-sm">
              No results found for "<span className="font-medium">{query}</span>
              ".
            </p>
          ) : (
            <ul
              className={`${
                products
                  ? "overflow-scroll overflow-x-hidden"
                  : "overflow-hidden"
              } h-96`}
            >
              {products.map((product) => (
                <li
                  key={product._id}
                  onClick={() =>
                    navigate(`/details/${product._id}/${product.productName}`)
                  }
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800 flex items-center gap-3"
                >
                  <img
                    src={product.productImages}
                    alt={product.productName}
                    className="w-10"
                  />
                  {product.productName}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBox;
