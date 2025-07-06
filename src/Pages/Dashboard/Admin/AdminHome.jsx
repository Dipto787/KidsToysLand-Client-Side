import { useContext } from "react";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Authentication/AuthProvider";
import { GiMoneyStack } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { MdToys } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import CountUp from "react-countup";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const AdminHome = () => {
    let axiosSecure = UseAxiosSecure();
    let { user } = useContext(AuthContext);
    let { data: totalRevenue = [] } = useQuery({
        queryKey: ['totalRevenue'],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/payHistoryAll`);
            return data;
        }
    })

    const totalRevenues = totalRevenue.reduce((acc, revenue) => acc + revenue.price, 0);


    let { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/users`);
            return data;
        }
    })


    let { data: toys = [] } = useQuery({
        queryKey: ['toys'],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/toys`);
            return data;
        }
    })

    const chartData = totalRevenue.map((item, index) => ({
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
            <div className="flex justify-between gap-3  border-b-2 p-4 items-center">
                {/* Total Revenue */}
                <div className="bg-gradient-to-r  from-purple-500 to-pink-300 w-full py-9  text-center flex items-center justify-center rounded-xl  gap-2 text-white ">
                    <p><GiMoneyStack size={70} /></p>
                    <div>
                        <h1 className="text-2xl font-bold">Total Revenue</h1>
                        <p className="text-5xl"> <CountUp end={totalRevenues} duration={2} />+</p>
                    </div>
                </div>


                {/* Total Customers */}
                <div className="bg-gradient-to-r from-[#d5a65c] to-[#fbe4ba] w-full py-9  text-center flex items-center justify-center rounded-xl gap-2 text-white ">
                    <p><FaUsers size={70} /></p>
                    <div>
                        <h1 className="text-2xl font-bold">Total Users</h1>
                        <p className="text-5xl"> <CountUp end={users.length} duration={4} />+</p>

                    </div>
                </div>



                {/* Total Customers */}
                <div className="bg-gradient-to-r from-[#fe5489] to-[#fec6e3] w-full py-9  text-center flex items-center justify-center rounded-xl  gap-2 text-white ">
                    <p><MdToys size={70} /></p>
                    <div>
                        <h1 className="text-2xl font-bold">Total Toys</h1>
                        <p className="text-5xl"> <CountUp end={toys.length} duration={2} />+</p>
                    </div>
                </div>

                {/* Total Customers */}
                <div className="bg-gradient-to-r from-[#70b4ff] to-[#a8e9ff] w-full py-9  text-center flex items-center justify-center rounded-xl   text-white ">
                    <p><TbTruckDelivery size={70} /></p>
                    <div>
                        <h1 className="text-2xl font-bold">Total Orders</h1>
                          <p className="text-5xl"> <CountUp end={totalRevenue.length} duration={5} />+</p>
                    </div>
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

export default AdminHome;