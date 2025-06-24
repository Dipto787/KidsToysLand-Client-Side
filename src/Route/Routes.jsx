import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import OurToys from "../Pages/OurToys/AllToys";
import AuthenTication from "../Pages/Authentication/AuthenTication";
import MyProfile from "../Pages/MyProfile/MyProfile";
import ToysDetails from "../Pages/OurToys/ToysDetails";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import UserHome from "../Pages/Dashboard/UserHome";

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
                element: <AuthenTication></AuthenTication>
            },
            {
                path: '/my-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path:'/our-toys/:id',
                element:<ToysDetails></ToysDetails>
            }

        ]
    },
    {
        path:'/dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children:[
            {
                index:true,
                element:<UserHome></UserHome>
            }
        ]
    }
])

export default Routes;