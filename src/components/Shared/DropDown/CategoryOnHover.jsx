import React from "react";
import { Link } from "react-router-dom";

const CategoryOnHover = () => {
  return (
    <div className="invisible absolute group-hover:visible w-80 h-fit bg-white shadow-sm text-d1 z-20 mt-2 border rounded-md transition-transform duration-300 ease-out transform -translate-y-2 group-hover:-translate-y-0">
      <div className="absolute top-[3px] left-11 transform -translate-y-2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white"></div>

      <div className="flex flex-col py-2 text-xs 2xl:text-sm">
        <Link className="hover:text-primary hover:bg-gray-100 px-7 py-2 transition duration-300 ease-in-out">
          Mobile & Accessories
        </Link>
        <Link className="hover:text-primary hover:bg-gray-100 px-7 py-2 transition duration-300 ease-in-out">
          Electrical & Applience
        </Link>
        <Link className="hover:text-primary hover:bg-gray-100 px-7 py-2 transition duration-300 ease-in-out">
          Home Decor & Life Style
        </Link>
        <Link className="hover:text-primary hover:bg-gray-100 px-7 py-2 transition duration-300 ease-in-out">
          Women's Fashion
        </Link>
        <Link className="hover:text-primary hover:bg-gray-100 px-7 py-2 transition duration-300 ease-in-out">
          Men's Fashion
        </Link>
        <Link className="hover:text-primary hover:bg-gray-100 px-7 py-2 transition duration-300 ease-in-out">
          Computers & Accessories
        </Link>
        <Link className="hover:text-primary hover:bg-gray-100 px-7 py-2 transition duration-300 ease-in-out">
          TV & Home Applience
        </Link>
        <Link className="hover:text-primary hover:bg-gray-100 px-7 py-2 transition duration-300 ease-in-out">
          Gift's Items
        </Link>
        <Link className="hover:text-primary hover:bg-gray-100 px-7 py-2 transition duration-300 ease-in-out">
          Grocery
        </Link>
      </div>
    </div>
  );
};

export default CategoryOnHover;
