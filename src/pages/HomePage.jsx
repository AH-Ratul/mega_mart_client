import React from "react";
import p2 from "../assets/p2.jpg";

const HomePage = () => {
  return (
    <main className="mt-4 flex justify-center items-center">
      <div className="">
        <img src={p2} alt="banner" className="w-96 h-[190px] object-cover rounded-md" />
      </div>
    </main>
  );
};

export default HomePage;
