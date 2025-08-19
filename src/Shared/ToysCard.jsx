import StarRatings from 'react-star-ratings';
import notFound from '../assets/cards/card-4.webp'
import { Link } from 'react-router-dom';
const ToysCard = ({ toy }) => {
    return (
        <Link to={`/our-toys/${toy._id}`} className='hover:scale-105 block cursor-pointer duration-300 hover:shadow-none'>

            <div className="flex flex-col p-5 h-full border rounded-lg hover:shadow-2xl shadow-md">
                <figure>
                    <img
                        className="mx-auto h-52"
                        src={toy?.img}
                        alt="Shoes" />
                </figure>
                <div className="card-body flex flex-col flex-grow">
                    <h2 className="card-title  text-sm">{toy?.name}</h2>
                    <p className='text-xs'>{toy?.details}</p>
                    <div className='font-semibold'>
                        <p className="text-[#f7a173] text-xs"> ${toy?.price}</p>
                        <p className='text-xs flex lg:gap-6 gap-1 '>{toy?.sold} sold <span className='text-slate-300'>|</span>   
                         <span className='   flex'> 
                            <StarRatings 
                            rating={toy?.rating}
                            starRatedColor="#faca51" 
                            starDimension='15px'
                            starSpacing='2px'
                            numberOfStars={5}
                            name='rating'
                        /></span>({toy?.rating})</p>


                    </div>
                        <span className='text-right text-xs font-normal opacity-70'>Dinajpur</span>
                </div>
            </div>
        </Link>
    );
};

export default ToysCard;