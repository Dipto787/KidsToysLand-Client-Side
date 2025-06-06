import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root"; 
import Home from "../Pages/Home/Home";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children:[
            {
                index:true,
                element:<Home></Home>
            }
        ]
    }
])

export default Routes;