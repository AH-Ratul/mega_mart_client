import React from "react";
import Products from "../components/Products/Products";

const HomePage = () => {
  return (
    <main className="relative flex flex-col">
      <section className="lg:flex lg:items-center">
        <div className="bg-[#DF1238] w-screen h-96 flex justify-center pt-14"></div>
      </section>

      <section className="mt-20 px-3 flex flex-col items-center w-full">
        <div className="w-full flex flex-col max-w-[1270px]">
          <h1 className="text-xl mb-14 ml-3">Buy Your All Favorite Products</h1>
          <div className="flex justify-center">
            <Products />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
