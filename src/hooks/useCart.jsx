import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Pages/Authentication/AuthProvider";
import UseAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";

const useCart = () => {
    let axiosSecure = UseAxiosSecure();
    let { user } = useContext(AuthContext);
    let { data: cart = [], refetch, isLoading } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/carts/${user?.email}`);
            return data;
        },
        enabled: !!user?.email,
    })

    return [cart, refetch];

};

export default useCart;