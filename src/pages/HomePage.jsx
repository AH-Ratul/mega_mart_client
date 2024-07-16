import React from "react";
import Slider from "../components/Slider/Slider";
import Category from "../components/Shared/Category/Category";

const HomePage = () => {
  return (
    <main className="mt-4 lg:mt-2 flex justify-center items-center">
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
    </main>
  );
};

export default HomePage;
