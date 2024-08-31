import React from "react";
import banner from "../../assets/banner6.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Slider = () => {
  return (
    <div>
      <Swiper
        direction="horizontal"
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
      >
        <SwiperSlide className="px-3 md:px-9 lg:pl-0 lg:pr-0">
          <img
            src={banner}
            alt="banner"
            className="w-full h-[170px]  md:h-[390px] object-cover rounded-md "
          />
        </SwiperSlide>
        <SwiperSlide className="px-3 md:px-9 lg:pl-0 lg:pr-0">
          <img
            src={banner}
            alt="banner"
            className="w-full h-[170px] md:h-[390px] object-cover rounded-md "
          />
        </SwiperSlide>
        <SwiperSlide className="px-3 md:px-9 lg:pl-0 lg:pr-0">
          <img
            src={banner}
            alt="banner"
            className="w-full h-[170px] md:h-[390px] object-cover rounded-md "
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
