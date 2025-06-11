import axios from "axios";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
const MostSoldEdToys = () => {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    axios.get('Toys.json')
      .then(res => {
        // Sort from highest sold to lowest sold
        const sorted = res.data.sort((a, b) => b.sold - a.sold);
        setToys(sorted);
      })

  }, []);

  return (
    <div>
      <h1 className="text-6xl text-center my-20 font-semibold border-b-4 p-10 border-blue-600 ">Most Sold Toys</h1>

      <div>
        <Swiper
          slidesPerView={4}
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
