import React from "react";
import { ImSpinner8 } from "react-icons/im";

const Loader = ({ color, size }) => {
  return (
    <div className="flex justify-center items-center">
      <ImSpinner8 className={`text-${color} text-${size} animate-spin-slow`} />
    </div>
  );
};

export default Loader;
