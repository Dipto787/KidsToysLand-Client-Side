import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../Authentication/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import CountUp from "react-countup";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const UserHome = () => {


    let [cart] = useCart();
    let { user } = useContext(AuthContext);
    let axiosSecure = UseAxiosSecure();
    let { data: payHistory = [], isLoading } = useQuery({
        queryKey: ['payHistory', user?.email],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/payHistory/${user?.email}`);
            return data;
        }
    })

    let { data: wishList = [], isLoading: isPending, refetch } = useQuery({
        queryKey: ['wishList', user?.email],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/bookMark/${user?.email}`);
            return data;
        },
    })
    let totalSpent = 0;
    payHistory.map(his => {
        totalSpent += his.price;
    })


    const chartData = payHistory.map((item, index) => ({
        name: `Order ${index + 1}`,
        uv: item.price,
    }));

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
    };
    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    return (
        <div>
            <div className="flex justify-between  border-b-2 p-4 items-center">
                {/* Total Orders */}
                <div className="bg-[#F3E5F5] px-28 py-3  text-center border-2 text-[#4A148C] ">
                    <h1 className="text-2xl">Your Orders</h1> 
                    <p className="text-5xl"> <CountUp end={cart.length + payHistory.length} duration={3} />+</p>
                </div>
                {/* Total Orders */}

                <div className="bg-[#FFD700]  px-28 py-3 text-center border-2 text-[#4A148C] ">
                    <h1 className="text-2xl">WishList</h1> 
                    <p className="text-5xl"> <CountUp end={wishList.length} duration={3} />+</p>
                </div>
                {/* Total Orders */}

                <div className="bg-[#581845] px-20 py-3  text-center border-2 text-[#FAF3E0] ">
                    <h1 className="text-2xl">Total Spent</h1>
                    <p className="text-5xl"> <CountUp end={totalSpent.toLocaleString()} duration={2} />+</p>
                </div>
            </div>



            <div className="mt-10 ">
                <BarChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
};

export default UserHome;