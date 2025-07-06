import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Pages/Authentication/AuthProvider";

const UseAdmin = () => {
    let axiosSecure = UseAxiosSecure();
    let { user, loading } = useContext(AuthContext);
    let { data: isAdmin, isLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data.isAdmin;
        },
        
    })

    return [isAdmin, isLoading];
};

export default UseAdmin;