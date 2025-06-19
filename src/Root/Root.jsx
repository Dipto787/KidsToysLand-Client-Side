import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Root = () => {
    let location = useLocation();
    let unable = (location.pathname === '/verify-checkout');
    return (
        <div>
            { <Navbar></Navbar>}
            <div className=" min-h-[calc(64.40vh-68px)] max-w-7xl mx-auto">
                <Outlet></Outlet>
            </div>
            {<Footer></Footer>}
        </div>
    );
};

export default Root;