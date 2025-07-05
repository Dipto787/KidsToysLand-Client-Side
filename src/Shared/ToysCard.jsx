import StarRatings from 'react-star-ratings';
import notFound from '../assets/cards/card-4.webp'
import { Link } from 'react-router-dom';
const ToysCard = ({ toy }) => {
    return (
        <Link to={`/our-toys/${toy._id}`} className='hover:scale-105 block cursor-pointer duration-300 hover:shadow-none'>

            <div className="flex flex-col p-5 h-full border rounded-lg hover:shadow-2xl shadow-md">
                <figure>
                    <img
                        className="mx-auto h-72"
                        src={toy?.img}
                        alt="Shoes" />
                </figure>
                <div className="card-body flex flex-col flex-grow">
                    <h2 className="card-title">{toy?.name}</h2>
                    <p>{toy?.details}</p>
                    <div className='font-semibold'>
                        <p className="text-[#f7a173] text-xl"> ${toy?.price}</p>
                        <p className='text-lg flex gap-4 '>{toy?.sold} sold <span className='text-slate-300'>|</span>    <span className='  flex'> 
                            <StarRatings 
                            rating={toy?.rating}
                            starRatedColor="#faca51" 
                            starDimension='15px'
                            starSpacing='2px'
                            numberOfStars={6}
                            name='rating'
                        /></span>({toy?.rating})</p>

                    </div>
                        <span className='text-right font-normal opacity-70'>Dinajpur</span>
                </div>
            </div>
        </Link>
    );
};

export default ToysCard;