import React from "react";
import { PiSpinnerBold } from "react-icons/pi";

const Loader = ({ color, size }) => {
  return (
    <div className="flex justify-center items-center">
      <PiSpinnerBold
        className={`text-${color} animate-spin`}
        style={{ fontSize: size }}
      />
    </div>
  );
};

export default Loader;
