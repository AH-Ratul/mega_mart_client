import React from "react";
import p1 from "../assets/banner2.svg";
import p2 from "../assets/banner.svg";
import p3 from "../assets/banner5.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const HomePage = () => {
  return (
    <main className="mt-4 flex justify-center items-center">
      <Swiper
        direction="horizontal"
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
      >
        <SwiperSlide className="px-3 md:px-9">
          <img
            src={p1}
            alt="banner"
            className="w-full h-[170px]  md:h-[390px] object-cover rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide className="px-3 md:px-9">
          <img
            src={p2}
            alt="banner"
            className="w-full h-[170px]  md:h-[390px] object-cover rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide className="px-3 md:px-9">
          <img
            src={p3}
            alt="banner"
            className="w-full h-[170px] md:h-[390px] object-cover rounded-md"
          />
        </SwiperSlide>
      </Swiper>
    </main>
  );
};

export default HomePage;
