import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import ToysCard from "../../Shared/ToysCard";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Spinner from "../../Shared/Spinner";
import notFound from '../../assets/not found/no found.png'
const WishList = () => {
    let axiosSecure = UseAxiosSecure();
    let { user } = useContext(AuthContext);
    let { data: wishList = [], isLoading, refetch } = useQuery({
        queryKey: ['wishList', user?.email],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/bookMark/${user?.email}`);
            return data;
        },
    })

    let handleDeleteWishList = async (id) => {
        let { data } = await axiosSecure.delete(`/wishlist/${id}`);
        refetch();
        console.log(data);
    }

    if(isLoading || !user){
        return <Spinner></Spinner>
    }

    return (
        <div className=" ">
            <div>
                <h1 className="text-xl font-semibold border-b-2 cursor-pointer  border-blue-600 p-2">WishList  : {wishList.length}</h1>
            </div>
            <div className="   grid grid-cols-1 gap-6 ">
                {
                    wishList.length === 0 ? <img className="max-w-md mx-auto my-20" src={notFound} alt="" /> :
                    wishList.map(listed => (
                        <div className="flex border-b-2 p-3  items-center justify-between">
                            <Link to={`/our-toys/${listed.wishList._id}`} className="w-[10%] hover:shadow-xl">
                                <img src={listed.wishList.img} alt="" />

                            </Link>
                            <div>
                                <h1 className="text-2xl">{listed.wishList.name}</h1>
                                <p>{listed.wishList.details}</p>
                            </div>


                            <div>
                                <p className="text-[#f7a173] text-xl"> ${listed.wishList.price}</p>
                            </div>

                            <div className="space-x-4">
                                <Link to={`/our-toys/${listed.wishList._id}`} className="btn">Add To Cart</Link>

                                <button onClick={() => handleDeleteWishList(listed._id)} className="btn bg-red-600 text-white">Delete <MdDelete size={20}></MdDelete></button>
                            </div>

                        </div>



                    ))

                }

            </div>
        </div>
    );
};

export default WishList;