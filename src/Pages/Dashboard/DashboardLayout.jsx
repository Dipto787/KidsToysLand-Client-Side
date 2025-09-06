import { NavLink, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../Authentication/AuthProvider";
import IsAdmin from "../../hooks/UseAdmin";
import Spinner from "../../Shared/Spinner";

// Icons
import { MdDashboard, MdLocalOffer, MdPayment, MdFavorite, MdLogout } from "react-icons/md";
import { HiUserGroup, HiOutlineHome, HiPlus } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";

const DashboardLayout = () => {
  const [cart] = useCart();
  const [isAdmin, isLoading] = IsAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);

  if (isLoading) return <Spinner />;

  const activeClass = "bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg";
  const normalClass = "text-gray-700 hover:bg-pink-100 hover:text-pink-600 rounded-lg transition-all duration-200";

  // Close sidebar when a link is clicked (for mobile)
  const handleLinkClick = () => setIsOpen(false);

  return (
    <div className="max-w-screen-2xl mx-auto bg-white text-gray-800">
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4 flex justify-end">
        {!isOpen ? (
          <FiMenu
            size={28}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer"
          />
        ) : (
          <FiX
            size={28}
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
          />
        )}
      </div>

      <div className="flex min-h-screen gap-10">
        {/* Sidebar */}
        <div
          className={`bg-[#f3f4f6] flex-col p-5 space-y-6 transition-all duration-300 ease-in-out
            ${isOpen ? "absolute z-30 left-0 w-4/5 min-h-screen shadow-xl" : "hidden"} 
            lg:flex lg:w-[22%] lg:relative lg:min-h-full`}
        >
          {/* Admin Menu */}
          {user && isAdmin && (
            <ul className="space-y-3 text-sm">
              <li>
                <NavLink to="/dashboard/adminHome" onClick={handleLinkClick} className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 font-medium ${isActive ? activeClass : normalClass}`
                }>
                  <MdDashboard size={24} /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-toys" onClick={handleLinkClick} className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 font-medium ${isActive ? activeClass : normalClass}`
                }>
                  <HiPlus size={24} /> Add Toys
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-toys" onClick={handleLinkClick} className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 font-medium ${isActive ? activeClass : normalClass}`
                }>
                  <MdLocalOffer size={24} /> Manage Toys
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users" onClick={handleLinkClick} className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 font-medium ${isActive ? activeClass : normalClass}`
                }>
                  <HiUserGroup size={24} /> Users
                </NavLink>
              </li>
            </ul>
          )}

          {/* User Menu */}
          {user && !isAdmin && (
            <ul className="space-y-3 text-sm">
              <li>
                <NavLink to="/dashboard/home" onClick={handleLinkClick} className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 font-medium ${isActive ? activeClass : normalClass}`
                }>
                  <HiOutlineHome size={24} /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="my-order" onClick={handleLinkClick} className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 font-medium ${isActive ? activeClass : normalClass}`
                }>
                  <MdPayment size={24} /> My Orders ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="wish-list" onClick={handleLinkClick} className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 font-medium ${isActive ? activeClass : normalClass}`
                }>
                  <MdFavorite size={24} /> WishList
                </NavLink>
              </li>
              <li>
                <NavLink to="pay-history" onClick={handleLinkClick} className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 font-medium ${isActive ? activeClass : normalClass}`
                }>
                  <MdPayment size={24} /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="discount" onClick={handleLinkClick} className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 font-medium ${isActive ? activeClass : normalClass}`
                }>
                  <MdLocalOffer size={24} /> Get Discount
                </NavLink>
              </li>
            </ul>
          )}

          {/* Divider */}
          <div className="border-t border-gray-300 mt-6"></div>

          {/* General Links */}
          <ul className="space-y-4 mt-4 text-sm">
            <li>
              <NavLink to="/" onClick={handleLinkClick} className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-100 hover:text-pink-600 rounded-lg transition-all">
                <HiOutlineHome size={22} /> Home
              </NavLink>
            </li>
            <li onClick={() => { logout(); handleLinkClick(); }}>
              <NavLink className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-600 rounded-lg transition-all">
                <MdLogout size={22} /> Logout
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-50 rounded-lg shadow-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
