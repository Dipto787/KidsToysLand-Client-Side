import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import OurToys from "../Pages/OurToys/AllToys";
import AuthenTication from "../Pages/Authentication/AuthenTication";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                index: true,
                element: <Home></Home>

            },
            {
                path: '/About-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/our-toys',
                element: <OurToys></OurToys>
            },
            {
                path: '/verify-checkout',
                element:<AuthenTication></AuthenTication>
            }
        ]
    }
])

export default Routes;