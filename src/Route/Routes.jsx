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
import MyOrder from "../Pages/Dashboard/MyOrder";
import PaymentGetWay from "../Pages/Dashboard/PaymentGetWay";
import PaymentHistory from '../Pages/Dashboard/PaymentHistory'
import NotFound from "../Shared/NotFound";
import WishList from "../Pages/Dashboard/WishList";
import PrivateRoute from "./PrivateRoute";
import GetDiscount from "../Pages/Dashboard/GetDiscount";
const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <NotFound></NotFound>,
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
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: '/our-toys/:id',
                element: <PrivateRoute><ToysDetails></ToysDetails></PrivateRoute>
            }

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: 'home',
                element: <PrivateRoute> <UserHome></UserHome></PrivateRoute>
            },
            {
                path: 'my-order',
                element: <PrivateRoute> <MyOrder></MyOrder></PrivateRoute>
            },
            {
                path: 'payment',
                element: <PrivateRoute><PaymentGetWay></PaymentGetWay></PrivateRoute>
            },
            {
                path: 'pay-history',
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            },
            {
                path: 'wish-list',
                element: <PrivateRoute><WishList></WishList></PrivateRoute>
            },
            {
                path: 'discount',
                element: <PrivateRoute><GetDiscount></GetDiscount></PrivateRoute>
            }
        ],


    },

])

export default Routes;