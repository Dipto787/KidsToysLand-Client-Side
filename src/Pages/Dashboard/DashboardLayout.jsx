import { BsFillHouseFill } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { FaAmazonPay } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdDiscount, MdDownloadForOffline, MdLogout } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div>
            <div className="flex gap-10">
                <div className="bg-[#edf2f4] h-screen w-[18%]">
                    <ul className="space-y-5 p-8">
                        <li ><NavLink className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                        }><IoMdHome size={22} /> User Home</NavLink></li>

                        <li ><NavLink to={'my-order'} className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                        }><CiShoppingCart size={22} />My Order</NavLink></li>

                        <li ><NavLink to={'wish-list'} className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                        }><MdDownloadForOffline size={22} />WishList</NavLink></li>

                        <li ><NavLink to={'pay-history'} className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                        }><FaAmazonPay size={22} />Payment History</NavLink></li>

                        <li ><NavLink to={'discount'} className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium 
              ${isActive ? "bg-pink-500 text-white shadow-md" : "text-gray-700 hover:bg-pink-100"}`
                        }><MdDiscount size={22} />Get A Discount</NavLink></li>

                    </ul>
                    <div className="divider mt-20"></div>
                    <ul className="p-10 space-y-8 mt-20">
                        <li ><NavLink className="flex items-center gap-2"><BsFillHouseFill size={22} />Home</NavLink></li>

                        <li ><NavLink className="flex items-center gap-2"><MdLogout size={22} />Logout</NavLink></li>
                    </ul>
                </div>




                <div className="p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;