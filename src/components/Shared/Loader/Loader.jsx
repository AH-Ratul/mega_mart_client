import React from "react";
import { ImSpinner8 } from "react-icons/im";

const Loader = ({ color, size }) => {
  return (
    <div className="flex justify-center items-center">
      <ImSpinner8
        className={`text-${color} animate-spin-slow`}
        style={{ fontSize: size }}
      />
    </div>
  );
};

export default Loader;
