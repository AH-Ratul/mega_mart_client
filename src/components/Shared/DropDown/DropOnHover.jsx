import React from "react";
import { Link } from "react-router-dom";

const DropOnHover = () => {
  return (
    <div className="absolute border mt-[90px] w-full shadow-sm text-center py-1 left-0 bg-white text-d2 transition-opacity duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:visible invisible">
      <div className="flex flex-col">
        <Link
          href=""
          className="font-medium hover:text-secondary hover:bg-gray-100 px-5 py-1"
        >
          Register
        </Link>
        <Link
          href=""
          className="font-medium hover:text-secondary hover:bg-gray-100 px-5 py-1"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default DropOnHover;
