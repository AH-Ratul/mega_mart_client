import React from "react";
import Products from "../components/Products/Products";

const HomePage = () => {
  return (
    <main className="relative flex flex-col">
      <section className="lg:flex lg:items-center">
        <div className="bg-[#DF1238] w-screen h-96 flex justify-center pt-14"></div>
      </section>

      <div className="mt-20 px-3 flex flex-col justify-center items-center">
        <h1 className="text-xl">Buy Your All Favorite Products</h1>
        <Products />
      </div>
    </main>
  );
};

export default HomePage;
