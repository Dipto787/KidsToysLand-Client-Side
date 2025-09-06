import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query"; 

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const { data: payHistory = [], isLoading } = useQuery({
        queryKey: ['payHistory', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payHistory/${user?.email}`);
            return data;
        }
    });

    if (isLoading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="p-4 max-w-screen-xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
                Total Payments: <span className="text-pink-600">{payHistory.length}</span>
            </h1>

            {/* Table for medium+ screens */}
            <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg w-full">
                <table className="w-full border border-gray-200 min-w-[600px]">
                    <thead className="bg-pink-500 text-white font-semibold">
                        <tr>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {payHistory.map((history, index) => (
                            <tr key={index}>
                                <td className="px-4 py-3 break-words">{history.email}</td>
                                <td className="px-4 py-3">${history.price}</td>
                                <td className="px-4 py-3">{history.date}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full font-semibold ${
                                        history.status.toLowerCase() === 'paid' ? 'bg-green-500 text-white' :
                                        history.status.toLowerCase() === 'pending' ? 'bg-yellow-500 text-white' :
                                        'bg-red-500 text-white'
                                    }`}>
                                        {history.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-4 w-full">
                {payHistory.map((history, index) => (
                    <div key={index} className="p-4 bg-white rounded-xl shadow-md border border-gray-200 w-full">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-800 break-words">{history.email}</p>

                        <p className="text-sm text-gray-500 mt-2">Price</p>
                        <p className="font-medium text-gray-800">${history.price}</p>

                        <p className="text-sm text-gray-500 mt-2">Date</p>
                        <p className="font-medium text-gray-800">{history.date}</p>

                        <p className="text-sm text-gray-500 mt-2">Status</p>
                        <span className={`inline-block px-3 py-1 mt-1 rounded-full font-semibold ${
                            history.status.toLowerCase() === 'paid' ? 'bg-green-500 text-white' :
                            history.status.toLowerCase() === 'pending' ? 'bg-yellow-500 text-white' :
                            'bg-red-500 text-white'
                        }`}>
                            {history.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentHistory;
