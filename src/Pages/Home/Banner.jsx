


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


import b1 from '../../assets/Banner/b-1.jpg'
import b2 from '../../assets/Banner/b-2.jpg'
import b3 from '../../assets/Banner/b-3.jpg'
import b4 from '../../assets/Banner/b-4.jpg'
import b5 from '../../assets/Banner/b-5.jpg'


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
            <SwiperSlide><img className='mx-auto' src={b1} alt="" /></SwiperSlide>
            <SwiperSlide><img className='mx-auto' src={b2} alt="" /></SwiperSlide>
            <SwiperSlide><img className='mx-auto' src={b3} alt="" /></SwiperSlide>
            <SwiperSlide><img className='mx-auto' src={b4} alt="" /></SwiperSlide>
            <SwiperSlide><img className='mx-auto' src={b5} alt="" /></SwiperSlide>


        </Swiper>
    );
};

export default Banner;