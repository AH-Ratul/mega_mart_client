import React from "react";
import sp1 from "../../assets/free-shipping.png";
import sp2 from "../../assets/guaranteed.png";
import sp3 from "../../assets/deal.png";

const Spotlights = () => {
  return (
    <div className="">
      <ul className="md:flex gap-16 pb-4">
        <li className="border-4">
          <img src={sp1} alt="free-shipping" />
        </li>
        <li className="border-4">
          <img src={sp2} alt="guaranteed" />
        </li>
        <li className="border-4">
          <img src={sp3} alt="deal" />
        </li>
      </ul>
    </div>
  );
};

export default Spotlights;
