import React from "react";
import { Link } from "react-router-dom";
import { allIcons } from "../../../data/all-icons";

const Category = () => {
  const { list } = allIcons;
  return (
    <div className="w-[300px] bg-babypowder">
      <h1 className="flex items-center ps-4 text-center text-xl bg-primary text-white font-bold py-2 rounded-t-lg">
        <span className="text-3xl pr-4">{list}</span> CATEGORIES
      </h1>
      <div className=" flex flex-col lg:text-sm h-[345px] border border-t-0 border-b1 text-gray1 rounded-b-md overflow-auto custom-scrollbar">
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
      </div>
    </div>
  );
};

export default Category;
