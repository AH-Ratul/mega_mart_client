import React from "react";
import { allIcons } from "../../../data/all-icons";
import { Link } from "react-router-dom";

const CategorySideBar = ({ isOpen, close }) => {
  const { cross } = allIcons;

  const categories = [
    "Mobile & Accessories",
    "Electrical & Appliance",
    "Home Decor & Lifestyle",
    "Women's Fashion",
    "Men's Fashion",
    "Computers & Accessories",
    "TV & Home Appliance",
  ];

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-20 transform ${
          isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
          <button
            onClick={close}
            className="text-gray-600 hover:text-primary text-2xl"
            aria-label="Close categories"
          >
            {cross}
          </button>
        </div>

        {/* Category List */}
        <nav className="flex flex-col p-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category
                .toLowerCase()
                .replace(/ & /g, "-")
                .replace(/\s+/g, "-")}`}
              onClick={close}
              className="py-2 px-3 text-sm font-medium text-gray-800 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
            >
              {category}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-gray-900 z-10 ${
          isOpen ? "opacity-30 visible" : "opacity-0 invisible"
        } transition-opacity duration-300 ease-in-out lg:hidden`}
      ></div>
    </div>
  );
};

export default CategorySideBar;
