import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Spinner from "../../Shared/Spinner";
import notFound from '../../assets/not found/no found.png';

const WishList = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: wishList = [], isLoading, refetch } = useQuery({
    queryKey: ['wishList', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookMark/${user?.email}`);
      return data;
    },
  });

  const handleDeleteWishList = async (id) => {
    await axiosSecure.delete(`/wishlist/${id}`);
    refetch();
  };

  if (isLoading || !user) return <Spinner />;

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
        My WishList
      </h1>

      {wishList.length === 0 ? (
        <img
          className="max-w-xs sm:max-w-md mx-auto my-20"
          src={notFound}
          alt="No items found"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {wishList.map((item) => (
          <div
  key={item._id}
  className="bg-white shadow-md rounded-lg flex flex-col md:flex-row w-full h-full p-4 hover:shadow-xl transition-shadow duration-300"
>
  {/* Image */}
  <Link
    to={`/our-toys/${item.wishList._id}`}
    className="flex-shrink-0 w-full md:w-40 h-40 md:h-40 rounded-lg overflow-hidden"
  >
    <img
      src={item.wishList.img}
      alt={item.wishList.name}
      className="w-full h-full object-cover"
    />
  </Link>

  {/* Details + Price + Buttons */}
  <div className="flex-1 flex flex-col justify-between ml-0 md:ml-6 mt-4 md:mt-0">
    <div>
      <h2 className="text-xl font-semibold text-gray-800">
        {item.wishList.name}
      </h2>
      <p className="text-gray-600 text-sm mt-1 line-clamp-3">
        {item.wishList.details}
      </p>
    </div>

    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <p className="text-orange-500 font-bold text-lg">
        ${item.wishList.price}
      </p>
      <div className="flex gap-2 flex-wrap">
        <Link
          to={`/our-toys/${item.wishList._id}`}
          className="btn bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base flex-1 sm:flex-none transition-colors duration-300"
        >
          Add to Cart
        </Link>
        <button
          onClick={() => handleDeleteWishList(item._id)}
          className="btn bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base flex-1 sm:flex-none flex items-center justify-center gap-1"
        >
          Delete <MdDelete size={18} />
        </button>
      </div>
    </div>
  </div>
</div>

          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
