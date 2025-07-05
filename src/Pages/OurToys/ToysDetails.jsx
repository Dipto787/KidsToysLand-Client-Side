import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import StarRatings from "react-star-ratings";
import { CiSaveUp2 } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Authentication/AuthProvider";
import useCart from "../../hooks/useCart";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Spinner from "../../Shared/Spinner";
import IsAdmin from "../../hooks/isAdmin";
const ToysDetails = () => {
    let [, refetch] = useCart();
    let [isAdmin,isProgress] = IsAdmin();
    let params = useParams();
    let axiosSecure = UseAxiosSecure();
    let { user } = useContext(AuthContext);
    let [quantity, setQuantity] = useState(1);
    let { data: toys = [], isLoading: pend } = useQuery({
        queryKey: ['toys'],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/all-toys/${params?.id}`);
            return data;
        }
    })

    console.log('pend', pend)

    let { data: wishList = {}, isLoading, refetch: updates } = useQuery({
        queryKey: ['wishList', user?.email, toys._id],
        queryFn: async () => {
            let { data } = await axiosSecure.get('/wishList', { params: { email: user?.email, id: toys._id } });
            return data;
        },


    })

    let isSave = wishList?.saved === true;


    let handleAddCart = async (cart) => {
        if (!user) {
            return toast.error('please sign in first');
        }
        let extra = { email: user?.email, quantity };
        let { data } = await axiosSecure.post('/cart', { cart, extra, status: 'pending' });
        console.log(data)
        if (data.insertedId) {
            toast.success('Toys Add To Cart')
            refetch();
        } else {
            let { data } = await axiosSecure.patch(`/cart/${user?.email}`, { id: cart._id, quantity })
            if (data.modifiedCount > 0) {
                toast.success('Toys Add To Cart')
            }
        }
    }

    let handleAddToWishList = async (wishList) => {
        let { data } = await axiosSecure.post('/wishList', { wishList, saved: true, email: user?.email, id: toys._id });
        console.log(data)
        if (data.insertedId) {
            updates()
            toast.success('saved');
        }

    }

    if (isLoading || !user || isProgress) {
        return <Spinner></Spinner>;
    }
    return (
        <div className="shadow-xl my-4">
            <div className="">
                <div className="hero-content h-screen gap-32    items-center  w-full flex-col lg:flex-row">

                    <img
                        src={toys.img}
                        className=""
                    />
                    <div className="space-y-6 ">
                        <h1 className="text-5xl font-bold">{toys.name}</h1>
                        <p>{toys.details}</p>
                        <div className="flex flex-row-reverse     justify-between">

                            <div className="flex font-bold cursor-pointer text-xl text-blue-500  items-center gap-2">


                                {
                                    isSave ?
                                        <div className="flex gap-2">
                                            <span className="text-blue-500">Saved</span>
                                            <FaBookmark size={22} className="text-blue-500 font-bold" />

                                        </div>
                                        :
                                        <div className="flex gap-2">
                                            <span className="text-black">Save</span>
                                            <FaRegBookmark onClick={() => handleAddToWishList(toys)} size={22} className="text-blue-500 font-bold" />
                                        </div>


                                }




                            </div>
                            <div ><p className='text-lg mt-10 flex gap-4 '><span className='  flex'>
                                <StarRatings
                                    rating={toys?.rating}
                                    starRatedColor="#faca51"
                                    starDimension='15px'
                                    starSpacing='2px'
                                    numberOfStars={6}
                                    name='rating'
                                /></span> <span className="text-blue-400">Ratings ({toys?.rating})</span></p>

                                <div className="mt-5">
                                    brand: <span className="text-blue-400">{toys.brand}</span>
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <p className="text-[#f7a173] font-semibold text-4xl"> ${toys?.price}</p>
                        <div className="flex gap-5   items-center">
                            Quantity
                            <button disabled={quantity === 1} onClick={() => (1 < quantity && setQuantity(quantity - 1))} className={`btn-sm ${quantity === 1 && 'cursor-not-allowed'} bg-slate-200 p-3 text-lg `}><RiSubtractFill />
                            </button>
                            <p className="text-lg font-semibold">{quantity}</p>
                            <button onClick={() => setQuantity(quantity + 1)} className="btn-sm bg-slate-200 p-3 text-lg"><MdAdd />
                            </button>
                        </div>

                        <button disabled={isAdmin} onClick={() => handleAddCart(toys)} className="btn bg-[#f57224] text-white p-4 px-16 py-5 ">Add To Cart</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToysDetails;