import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query"; 

const PaymentHistory = () => {
    let { user } = useContext(AuthContext);
    let axiosSecure = UseAxiosSecure();
    let { data: payHistory = [], isLoading } = useQuery({
        queryKey: ['payHistory', user?.email],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/payHistory/${user?.email}`);
            return data;
        }
    })
    return (
        <div>
            <h1 className="text-4xl mb-5">Total Payment : {payHistory.length}</h1>
            <div className="overflow-x-auto   rounded-2xl    ">
                <table className="table border-b-2   table-fixed w-full">
                    {/* head */} 
                    <thead className="bg-[#d1a054] border     text-white font-semibold">
                        <tr>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payHistory.map(history => <tr>
                                <th>{history.email}</th>
                                <td>${history.price}</td>
                                <td>{history.date}</td>
                                <td className=""><span className="bg-green-500 rounded-full px-2 text-white font-bold">{history.status}</span></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;