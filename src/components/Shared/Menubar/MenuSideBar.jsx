import React from "react";
import logo from "../../../assets/logo11.svg";
import { allIcons } from "../../../data/all-icons";
import { Link } from "react-router-dom";

const MenuSideBar = ({ isOpen, close }) => {
  const { cross } = allIcons;

  return (
    <div
      className={`fixed h-[100dvh]  left-0 right-8 text-gray1 bg-white z-20 top-0 p-2 overflow-hidden inset-y-0 transform ${
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      } transition-transform duration-500 ease-in-out`}
    >
      <div className="flex justify-between items-center">
        <img src={logo} alt="logo" className="w-44 md:w-64" />
        <span onClick={close}>
          {cross}
        </span>
      </div>
      <div className="px-7 mt-4 flex flex-col gap-2 text-lg md:text-xl">
        <Link className="hover:text-primary">My Account</Link>
        <Link className="hover:text-primary">Products</Link>
        <Link className="hover:text-primary">Contacts</Link>
        <Link className="hover:text-primary">Login</Link>
        <Link className="hover:text-primary">Register</Link>
      </div>
    </div>
  );
};

export default MenuSideBar;
