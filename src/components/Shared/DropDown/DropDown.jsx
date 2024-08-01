import React from "react";
import img from "../../../assets/p1.jpg";
import { allIcons } from "../../../data/all-icons";

const DropDown = ({ isOpen, close }) => {
    const {cross} = allIcons;
  return (
    <div
      className={`${
        isOpen ? "translate-x-0 right-3 shadow-a3" : "translate-x-full right-0"
      } fixed bg-white text-gray1 mt-4 left-[900px] h-[460px]  border border-t-4 border-t-secondary z-10 transition duration-500 ease-out transform`}
    >
      <div className="flex justify-between px-3 mt-2">
        <h1>cart</h1>
        <span onClick={close} className="cursor-pointer text-2xl">
          {cross}
        </span>
      </div>
      <div className="p-3 mt-5">
        <img src={img} alt="" className="w-12" />
      </div>
    </div>
  );
};

export default DropDown;
