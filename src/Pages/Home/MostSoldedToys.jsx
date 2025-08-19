

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Shared/SectionTitle";
import ToysCard from "../../Shared/ToysCard";
const MostSoldEdToys = () => {
  let axiosSecure = UseAxiosSecure();

  let { data: toys = [] } = useQuery({
    queryKey: ['toys'],
    queryFn: async () => {
      let { data } = await axiosSecure.get('/toys');
      return data;
    }
  })

  return (
    <div className="px-2 lg:px-0">
     <SectionTitle title={'Most-Sold-Toys'} subtitle={'our popular toys'}></SectionTitle>

      <div>
        <Swiper 
        slidesPerView={3}
      
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
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
            Array.isArray(toys) ?
              toys.sort((a, b) => b.sold - a.sold).slice(0, 10).map(toy => <SwiperSlide>
                <ToysCard toy={toy}></ToysCard>
              </SwiperSlide>)

              : undefined
          }
        </Swiper>
      </div>
    </div>
  );
};

export default MostSoldEdToys;
