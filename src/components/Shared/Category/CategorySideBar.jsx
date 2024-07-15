import React from "react";
import { allIcons } from "../../../data/all-icons";
import { Link } from "react-router-dom";

const CategorySideBar = ({ isOpen, close }) => {
  const { cross } = allIcons;

  return (
    <div
      className={`fixed h-[100dvh]  left-0 right-8 text-gray1 bg-white z-20 top-0 px-3 overflow-hidden inset-y-0 transform ${
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      } transition-transform duration-500 ease-in-out`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl mt-4 ml-4 text-black flex items-center font-bold">
          Categories
        </h1>
        <span onClick={close} className="hover:text-primary text-black text-3xl">
          {cross}
        </span>
      </div>
      {/* category lists */}
      <div className=" mt-9 flex flex-col  text-lg md:text-xl md:mx-6 rounded shadow-a2">
        <Link className="hover:text-primary border-b px-7 py-1">
          Mobile & Accessories
        </Link>
        <Link className="hover:text-primary border-b px-7 py-1">
          Electrical & Applience
        </Link>
        <Link className="hover:text-primary border-b px-7 py-1">
          Home Decor & Life Style
        </Link>
        <Link className="hover:text-primary border-b px-7 py-1">
          Women's Fashion
        </Link>
        <Link className="hover:text-primary border-b px-7 py-1">
          Men's Fashion
        </Link>
        <Link className="hover:text-primary border-b px-7 py-1">
          Computers & Accessories
        </Link>
        <Link className="hover:text-primary  px-7 py-1">
          TV & Home Applience
        </Link>
      </div>
    </div>
  );
};

export default CategorySideBar;
