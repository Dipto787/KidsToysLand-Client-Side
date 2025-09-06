import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../Authentication/AuthProvider";
import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const UserHome = () => {
  let [cart] = useCart();
  let { user } = useContext(AuthContext);
  let axiosSecure = UseAxiosSecure();

  let { data: payHistory = [] } = useQuery({
    queryKey: ["payHistory", user?.email],
    queryFn: async () => {
      let { data } = await axiosSecure.get(`/payHistory/${user?.email}`);
      return data;
    },
  });

  let { data: wishList = [] } = useQuery({
    queryKey: ["wishList", user?.email],
    queryFn: async () => {
      let { data } = await axiosSecure.get(`/bookMark/${user?.email}`);
      return data;
    },
  });

  let totalSpent = 0;
  payHistory.forEach((his) => {
    totalSpent += his.price;
  });

  const chartData = payHistory.map((item, index) => ({
    name: `Order ${index + 1}`,
    uv: item.price,
  }));

  // Custom Triangle Bar Shape
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
            C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
            ${x + width / 2}, ${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} 
            ${x + width}, ${y + height}
            Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="px-4 lg:px-8 py-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg text-white text-center py-6 transform hover:scale-105 transition">
          <h1 className="text-lg font-medium">Your Orders</h1>
          <p className="text-3xl font-bold mt-2">
            <CountUp end={cart.length + payHistory.length} duration={3} />+
          </p>
        </div>

        {/* Wishlist */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg text-white text-center py-6 transform hover:scale-105 transition">
          <h1 className="text-lg font-medium">WishList</h1>
          <p className="text-3xl font-bold mt-2">
            <CountUp end={wishList.length} duration={3} />+
          </p>
        </div>

        {/* Total Spent */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl shadow-lg text-white text-center py-6 transform hover:scale-105 transition">
          <h1 className="text-lg font-medium">Total Spent</h1>
          <p className="text-3xl font-bold mt-2">
            $<CountUp end={totalSpent} duration={2} />+
          </p>
        </div>
      </div>

      {/* Chart Section */}
     <div className="mt-10 bg-white shadow-lg rounded-2xl p-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Spending Overview
  </h2>

  {/* Responsive Chart Wrapper */}
  <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="name" stroke="#555" />
        <YAxis stroke="#555" />
        <Bar
          dataKey="uv"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top", fill: "#333" }}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

    </div>
  );
};

export default UserHome;
