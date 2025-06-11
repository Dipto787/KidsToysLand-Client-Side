import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios'
import TasteyMonal from '../../assets/review.png'
import StarRatings from 'react-star-ratings';
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
        <div className='mb-10'>
            <h1 className="text-6xl text-center my-20 font-semibold border-b-4 p-10 border-red-600 ">Testimonial</h1>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide>
                        <img className='mx-auto' src={TasteyMonal} alt="" />
                        <div className='space-y-5'>
                            <h2 className='text-center text-2xl font-semibold'>Product Name : {review.product}</h2>


                            <div className='text-center'>
                                <StarRatings

                                    rating={review.rating}
                                    starRatedColor="gold"
                                    numberOfStars={6}
                                    name='rating'
                                />
                            </div>
                            <h2 className='text-center text-2xl font-semibold'>Author : {review.author}</h2>
                            <p className='text-center text-xl'>{review.review}</p>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default TestimonalSwiper;