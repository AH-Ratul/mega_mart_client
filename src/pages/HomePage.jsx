import React from "react";
import Slider from "../components/Slider/Slider";
import Category from "../components/Shared/Category/Category";
import Spotlights from "../components/spotlights/Spotlights";
import cart1 from '../assets/img-cat-1.png';

const HomePage = () => {
  return (
    <main className="mt-4 lg:mt-2 flex flex-col justify-center items-center">
      <div className="lg:flex lg:items-center ">
        {/* category */}
        <div className="hidden lg:block">
          <Category />
        </div>
        {/* slider */}
        <div className="w-[410px] md:w-[750px] lg:w-[980px]">
          <Slider />
        </div>
      </div>
      <div className="mt-9 ">
        <Spotlights />
      </div>
      <div>
        <img src={cart1} alt="cart1" className="w-full" />
      </div>
    </main>
  );
};

export default HomePage;
