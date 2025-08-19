import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios'
import TasteyMonal from '../../assets/review.png'
import StarRatings from 'react-star-ratings';
import SectionTitle from '../../Shared/SectionTitle';
const TestimonalSwiper = () => {
    let [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get('review.json')
            .then((res) => {
                setReviews(res.data);
            })
    }, [])

    console.log(reviews)
    return (
        <div className='mb-10 px-2 lg:px-0'>
        <SectionTitle title={'Testimonial'} subtitle={'what our customers says'}> </SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide className='px-4'>
                        <img className='mx-auto' src={TasteyMonal} alt="" />
                        <div className='space-y-5'>
                            <h2 className='text-center text-sm font-semibold'>Product Name : {review.product}</h2>


                            <div className='text-center '>
                                <StarRatings
                                     starDimension="25px"
                                    rating={review.rating}
                                    starRatedColor="gold"
                                    numberOfStars={6}
                                    name='rating'
                                    size={4}
                                />
                            </div>
                            <h2 className='text-center text-sm font-semibold'>Author : {review.author}</h2>
                            <p className='text-center text-xs'>{review.review}</p>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default TestimonalSwiper;