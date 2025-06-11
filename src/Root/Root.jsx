import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="max-w-7xl min-h-[calc(70vh-15px)] mx-auto">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;