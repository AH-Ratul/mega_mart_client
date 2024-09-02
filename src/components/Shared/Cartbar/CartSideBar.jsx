import React from "react";
import { allIcons } from "../../../data/all-icons";
import p1 from "../../../assets/p1.jpg";

const CartSideBar = ({ isOpen, close }) => {
  const { cross, cart, checkout } = allIcons;
  return (
    <div>
      <div
        className={`fixed h-[100dvh]  left-0 right-32 md:right-64 text-gray1 bg-white z-20 top-0 px-4 py-3 md:px-7 md:py-4 overflow-hidden inset-y-0 transform ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold text-orange-500">My Cart</h1>
          <span
            onClick={close}
            className="hover:text-primary text-black text-3xl"
          >
            {cross}
          </span>
        </div>

        {/* Cart items */}
        <div className="h-[75%] md:h-[85%] mt-9 overflow-auto custom-scrollbar">
          <div className=" text-black flex justify-between items-center p-1">
            <img src={p1} alt="" className="w-10 md:w-16" />
            <p className="text-xs md:text-sm -ml-7 md:-ml-36">
              Dell Laptop i5 8th gen..{" "}
            </p>
            <span className="text-base  bg-gray1 text-white  px-1">
              {cross}
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center mt-7">
          <button className="bg-primary w-full text-center text-white/90  py-2 flex justify-center items-center gap-1 rounded-md">
            {cart} View Cart
          </button>
        </div>
      </div>
      <div
        onClick={close}
        className={`fixed w-screen h-screen bg-gray-900 top-0 left-0 z-10 transform ${
          isOpen ? "opacity-30 visible" : "opacity-0 invisible"
        } transistion-opacity duration-500 ease-in-out`}
      ></div>
    </div>
  );
};

export default CartSideBar;
