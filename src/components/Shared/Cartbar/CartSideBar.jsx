import React from "react";
import { allIcons } from "../../../data/all-icons";

const CartSideBar = ({isOpen, close}) => {
    const {cross} = allIcons;
  return (
    <div
      className={`fixed h-[100dvh]  left-0 right-8 text-gray1 bg-white z-20 top-0 px-4 py-2 md:px-7 md:py-4 overflow-hidden inset-y-0 transform ${
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      } transition-transform duration-500 ease-in-out`}
    >
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black/70">Cart</h1>
            <span onClick={close}>{cross}</span>
        </div>
    </div>
  );
};

export default CartSideBar;
