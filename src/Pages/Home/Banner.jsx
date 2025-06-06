


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


import b1 from '../../assets/Banner/b-1.png'
import b2 from '../../assets/Banner/b-2.png'
import b3 from '../../assets/Banner/b-3.png'


const Banner = ({ text }) => {
    return (
        <Swiper
            loop={true}
            autoplay={{
                delay: 2000,

            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
        >
            <SwiperSlide><img className='w-full' src={b1} alt="" /></SwiperSlide>
            <SwiperSlide><img className='w-full' src={b2} alt="" /></SwiperSlide>
            <SwiperSlide><img className='w-full' src={b3} alt="" /></SwiperSlide>


        </Swiper>
    );
};

export default Banner;