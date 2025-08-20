import { BsFillHouseFill } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { FaAmazonPay, FaBookmark, FaCcAmazonPay, FaMotorcycle, FaUsers } from "react-icons/fa";
import { FcPaid } from "react-icons/fc";
import { IoIosCloseCircle, IoMdHome } from "react-icons/io";
import { IoCart, IoMenu } from "react-icons/io5";
import { MdDiscount, MdDownloadForOffline, MdFormatListBulleted, MdLogout } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { useContext, useState } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import IsAdmin from "../../hooks/UseAdmin";
import Spinner from "../../Shared/Spinner";

const DashboardLayout = () => {
    let [cart] = useCart();
    let [isAdmin, isLoading] = IsAdmin();
    let [isOpen, setIsOpen] = useState(false);
    console.log('THAT IS THE CRAZY TIME', isAdmin)
    let { logout, user } = useContext(AuthContext);
    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <div className="max-w-screen-2xl relative  mx-auto">
            <div className={`cursor-pointer  lg:hidden  ml-4 `}>
                {
                    !isOpen && <IoMenu onClick={() => setIsOpen(!isOpen)} size={30} />
                }
            </div>
            <div className="flex min-h-screen gap-10">

                <div onClick={() => setIsOpen(false)} className={`bg-[#edf2f4] lg:flex flex-col ${isOpen ? 'absolute w-[80%]  z-30 min-h-screen' : 'hidden'}  w-[21%]`}>
                    <div className={`cursor-pointer  lg:hidden  ml-4 mt-`}>
                        {
                            isOpen && <IoIosCloseCircle onClick={() => setIsOpen(!isOpen)} size={30} />
                        }
                    </div>

                    {

                        !isLoading && user &&
                        (
                            isAdmin &&
                            <ul className="space-y-3 p-5 text-xs">
                                <li ><NavLink to={'/dashboard/adminHome'} className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-lg  font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                                }><IoMdHome size={24} /> Admin Home</NavLink></li>


                                <li ><NavLink to={'/dashboard/add-toys'} className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-lg  font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                                }><FaMotorcycle size={24} />Add Toys</NavLink></li>

                                <li ><NavLink to={'/dashboard/manage-toys'} className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-lg  font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                                }><MdFormatListBulleted size={24} />Manage Toys</NavLink></li>

                                <li ><NavLink to={'/dashboard/users'} className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded-lg  font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                                }><FaUsers  size={24} />Users</NavLink></li>


                            </ul>
                        )}

                    {
                        !isAdmin && <ul className="space-y-5 p-5 text-xs">
                            <li ><NavLink to={'/dashboard/home'} className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg  font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                            }><IoMdHome size={24} /> User Home</NavLink></li>

                            <li ><NavLink to={'my-order'} className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg  font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                            }><IoCart size={24} />My Order :      ({cart.length})</NavLink></li>



                            <li ><NavLink to={'wish-list'} className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg  font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                            }><FaBookmark className="text-black" size={24} />WishList</NavLink></li>

                            <li ><NavLink to={'pay-history'} className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg  font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                            }><FaCcAmazonPay size={24} />Payment History</NavLink></li>

                            <li ><NavLink to={'discount'} className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg  font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                            }><MdDiscount size={24} />Get A Discount</NavLink></li>

                        </ul>
                    }
                    <div className="divider mt-15"></div>
                    <ul className="p-10 space-y-8 mt-">
                        <li ><NavLink to={'/'} className="flex items-center gap-2"><BsFillHouseFill size={22} />Home</NavLink></li>

                        <li onClick={logout} ><NavLink className="flex items-center gap-2"><MdLogout size={22} />Logout</NavLink></li>
                    </ul>
                </div>




                <div className="p-8 flex-1     ">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;