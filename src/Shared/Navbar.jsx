import { Link, NavLink } from "react-router-dom";
import logo from '../assets/logos.png'
const Navbar = () => {
    let Links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/our-toys'}>Our Toys</NavLink></li>
        <li><NavLink to={'/About-Us'}>About Us</NavLink></li> 
    </>;
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
                    <Link className="btn max-w-48   text-xl"><img src={logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                      {Links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to={'/verify-checkout'} className="btn bg-purple-500 px-10 text-white font-semibold">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;