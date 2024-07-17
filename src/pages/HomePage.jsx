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
        <div className="w-[410px] md:w-[770px] lg:w-[980px]">
          <Slider />
        </div>
      </div>
      <div className="mt-9 ">
        <Spotlights />
      </div>
      <div>
        
      </div>
    </main>
  );
};

export default HomePage;
