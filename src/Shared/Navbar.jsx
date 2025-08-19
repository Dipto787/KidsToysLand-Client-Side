import { Link, NavLink } from "react-router-dom";
import logo from '../assets/logos.png'
import { useContext } from "react";
import { AuthContext } from "../Pages/Authentication/AuthProvider";
import { IoCart } from "react-icons/io5";
import UseAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCart from "../hooks/useCart";
import { IoIosNotifications } from "react-icons/io";
import UseAdmin from "../hooks/UseAdmin";
const Navbar = () => {
    let [cart, refetch] = useCart();
    let axiosSecure = UseAxiosSecure();
    let [isAdmin, isLoading] = UseAdmin();
    let { data: notifications = [], refetch: reCheck } = useQuery({
        queryKey: ['notification'],
        queryFn: async () => {
            let { data } = await axiosSecure.get('notifications');
            return data;
        }
    })
    let { user, loading, logout } = useContext(AuthContext);
    let handleLogout = () => {
        logout();
    }
    let Links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/our-toys'}>Our Toys</NavLink></li>
        <li><NavLink to={'/About-Us'}>About Us</NavLink></li>
        {!isLoading && user && <> {
            isAdmin ? <li><NavLink to={'/dashboard/AdminHome'}>Dashboard</NavLink></li> : <li><NavLink to={'/dashboard/home'}>Dashboard</NavLink></li>
        }


            {
                !isLoading && user &&
                (
                    isAdmin ?
                        <NavLink to={'/dashboard/notifications x'} className="relative"><IoIosNotifications size={28} />
                            <p className="absolute text-lg  -right-4  text-white font-bold  -top-3"><span className="bg-red-500 rounded-full px-2 py-1 text-xs  ">{cart.length}</span></p>
                        </NavLink>
                        :
                        <NavLink to={'/dashboard/my-order'} className="relative"><IoCart size={28} />
                            <p className="absolute text-lg  -right-5  text-white font-bold  -top-3"><span className="bg-blue-500 rounded-full px-2 py-1 ">{cart.length}</span></p>
                        </NavLink>)

            }


        </>}
    </>;
    console.log(loading)
    return (
        <div className="pb-20">
            <div className="navbar px-10 fixed w-full z-30 bg-slate-100  bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {Links}
                        </ul>
                    </div>
                    <Link className=" max-w-32 lg:max-w-36 btn btn-sm"><img src={logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal text-xs px-1">
                        {Links}
                    </ul>
                </div>


                <div className="navbar-end">

                    {

                        user ?
                            <div className="dropdown dropdown-end">
                                <div className="flex gap-5 items-center">
                                    <div tabIndex={0} role="button" className=" avatar">
                                        <div className=" w-8  rounded-full">
                                            <img
                                                alt=""
                                                src={user?.photoURL} />
                                        </div>
                                    </div>
                                    {
                                        !isLoading && !isAdmin && <NavLink to={'/dashboard/notifications x'} className="relative"><IoIosNotifications size={33} />
                                            <p className="absolute text-sm  -right-4  text-white font-bold  -top-3"><span className="bg-red-500 rounded-full px-2 py-1 ">{notifications.length}</span></p>
                                        </NavLink>
                                    }
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                                    <li><Link to={'/my-profile'}>My Profile</Link></li>
                                    <li onClick={handleLogout} className=""><Link>Logout</Link></li>
                                </ul>
                            </div>
                            :

                            !loading &&
                            <Link to={'/verify-checkout'} className="btn bg-purple-500 px-8 text-xs text-white font-semibold">Sign In</Link>

                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;