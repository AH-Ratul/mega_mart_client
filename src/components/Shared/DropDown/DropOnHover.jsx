import React from "react";
import { Link } from "react-router-dom";
import { allIcons } from "../../../data/all-icons";

const DropOnHover = () => {
  const { account, login } = allIcons;
  return (
    <div className="invisible absolute group-hover:visible border w-full shadow-a3 text-xs left-0 bg-white text-d2 transition-transform duration-300 ease-out transform -translate-y-2 group-hover:translate-y-0">
      <div className=" flex flex-col font-medium">
        <Link
          to="/signup"
          className="hover:text-secondary hover:bg-gray-100 px-6 py-1 flex justify-start items-center gap-1"
        >
          {account} Register
        </Link>
        <Link
          to="/login"
          className="hover:text-secondary hover:bg-gray-100 px-6 py-1 flex justify-start items-center gap-1"
        >
          {login} Login
        </Link>
      </div>
    </div>
  );
};

export default DropOnHover;
