import React from "react";
import logo from "../../../../public/logo12.svg";
import { allIcons } from "../../../data/all-icons";
import { Link } from "react-router-dom";

const MenuSideBar = ({ isOpen, close }) => {
  const { cross } = allIcons;

  return (
    <div
      className={`fixed h-[100dvh] left-0 right-8 text-gray1 bg-white z-20 top-0 px-3 overflow-hidden inset-y-0 transform ${
        isOpen ? "translate-x-0 shadow-a2" : "-translate-x-full"
      } transition-transform duration-500 ease-in-out`}
    >
      <div className="flex justify-between items-center pl-4 mt-2">
        <img src={logo} alt="logo" className="w-32 md:w-52 py-2" />
        <span
          onClick={close}
          className="hover:text-primary text-black text-3xl"
        >
          {cross}
        </span>
      </div>
      <div className=" mt-4 pl-8 md:pl-10 flex flex-col gap-2 text-lg md:text-xl">
        <Link className="hover:text-primary">My Account</Link>
        <Link className="hover:text-primary">Products</Link>
        <Link className="hover:text-primary">Contacts</Link>
        <Link to="/login" onClick={close} className="hover:text-primary">
          Login
        </Link>
        
      </div>
    </div>
  );
};

export default MenuSideBar;
