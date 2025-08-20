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
import VerifyAdmin from "./VerifyAdmin";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import AddToys from "../Pages/Dashboard/Admin/AddToys";
import ManageToys from "../Pages/Dashboard/Admin/ManageToys";
import UpdateToys from "../Pages/Dashboard/Admin/UpdateToys";
import Users from "../Pages/Dashboard/Admin/Users";
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
            },
            {
                path: 'adminHome',
                element: <VerifyAdmin><AdminHome></AdminHome></VerifyAdmin>
            },
            {
                path: 'add-toys',
                element: <VerifyAdmin><AddToys></AddToys></VerifyAdmin>
            },
            {
                path: 'manage-toys',
                element: <VerifyAdmin><ManageToys></ManageToys></VerifyAdmin>
            },
            {
                path: 'users',
                element: <VerifyAdmin><Users></Users></VerifyAdmin>
            },
            {
                path: 'update-toy/:id',
                element: <VerifyAdmin><UpdateToys></UpdateToys></VerifyAdmin>
            }
        ],


    },

])

export default Routes;