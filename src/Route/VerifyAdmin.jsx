import IsAdmin from "../hooks/isAdmin";
import Spinner from "../Shared/Spinner";

const VerifyAdmin = ({ children }) => {
    let [isAdmin, isLoading] = IsAdmin();
    if (isLoading) return <Spinner></Spinner>;
    if (isAdmin === 'true') return children;
    
};

export default VerifyAdmin;