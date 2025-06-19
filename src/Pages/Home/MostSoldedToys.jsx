import axios from "axios";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const MostSoldEdToys = () => {
  let axiosSecure = UseAxiosSecure();

  let { data: toys = [] } = useQuery({
    queryKey: ['toys'],
    queryFn: async () => {
      let { data } = await axiosSecure.get('/our-toys');
      return data;
    }
  })

  return (
    <div className="px-2 lg:px-0">
      <h1 className="lg:text-6xl text-4xl text-center my-4 lg:my-20  mb-3 font-semibold border-b-4 p-10 border-blue-600 ">Most Sold Toys</h1>

      <div>
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {
            toys.slice(0, 10).map(toy => <SwiperSlide><div className="mb-4 shadow-xl">
              <figure>
                <img
                  className="h-80"
                  src={toy.img}
                  alt="Shoes" />
              </figure>
              <div className="card-body ">
                <h2 className="card-title">{toy.name}</h2>
                <p className="text-xl font-semibold  text-blue-600">Sold : {toy.sold}</p>
              </div>
            </div>
            </SwiperSlide>)
          }
        </Swiper>
      </div>
    </div>
  );
};

export default MostSoldEdToys;
