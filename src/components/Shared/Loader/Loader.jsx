import React from "react";
import { ImSpinner8 } from "react-icons/im";

const Loader = () => {
  return (
    <div>
      <ImSpinner8 className="text-secondary text-6xl animate-spin-slow" />
    </div>
  );
};

export default Loader;
