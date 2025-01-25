import React from "react";
import Slider from "../components/Slider/Slider";
import Category from "../components/Shared/Category/Category";

const HomePage = () => {
  return (
    <main className="mt-4 flex flex-col justify-center items-center">
      <section className="lg:flex lg:items-center lg:gap-5">
        {/* category */}
        <div className="hidden lg:block">
          <Category />
        </div>
        {/* slider */}
        <div className="w-[410px] md:w-[770px] lg:w-[992px]">
          <Slider />
        </div>
      </section>

      <div></div>
    </main>
  );
};

export default HomePage;
