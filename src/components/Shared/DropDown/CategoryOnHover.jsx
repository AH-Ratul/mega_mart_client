import React from "react";
import { Link } from "react-router-dom";

const CategoryOnHover = ({ close }) => {
  const categories = [
    "Mobile & Accessories",
    "Electrical & Appliance",
    "Home Decor & Lifestyle",
    "Women's Fashion",
    "Men's Fashion",
    "Computer & Accessories",
    "TV & Home Appliance",
  ];

  return (
    <div className="invisible absolute group-hover:visible w-80 h-fit bg-white shadow-sm text-d1 z-50 mt-2 border rounded-md transition-transform duration-300 ease-out transform -translate-y-2 group-hover:-translate-y-0">
      <div className="absolute top-[3px] left-11 transform -translate-y-2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white"></div>

      {/* Category List */}
      <nav className="flex flex-col py-2">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category}`}
            onClick={close}
            className="py-2 px-7 text-sm font-medium text-gray-800 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
          >
            {category}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default CategoryOnHover;
