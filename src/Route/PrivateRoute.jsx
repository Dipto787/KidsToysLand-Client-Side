import { useContext } from "react";
import { AuthContext } from "../Pages/Authentication/AuthProvider";
import Spinner from "../Shared/Spinner";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    let { user, loading } = useContext(AuthContext);
    let location = useLocation();
    if (loading) {
        return <Spinner></Spinner>
    }

    if (user) {
        return children;
    }

    return <Navigate state={location?.pathname}   replace='true'  to={'/verify-checkout'}></Navigate>
};

export default PrivateRoute;