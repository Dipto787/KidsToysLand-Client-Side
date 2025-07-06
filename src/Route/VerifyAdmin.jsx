import { Navigate } from "react-router-dom";
import Spinner from "../Shared/Spinner";
import UseAdmin from "../hooks/UseAdmin";

const VerifyAdmin = ({ children }) => {
    let [isAdmin, isLoading] = UseAdmin();
    if (isLoading) return <Spinner></Spinner>;
    if (isAdmin === true) return children;

    return <Navigate to={'/dashboard/home'}></Navigate>
    
};

export default VerifyAdmin;