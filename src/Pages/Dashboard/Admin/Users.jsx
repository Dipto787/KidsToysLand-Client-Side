import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import toast from "react-hot-toast";

const Users = () => {
  let axiosSecure = UseAxiosSecure();
  let { user: userx } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  let { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      let { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  let handleMakeAdmin = async (email) => {
    try {
      let { data } = await axiosSecure.patch(`/user/${email}`, { role: true });
      if (data.modifiedCount > 0) {
        toast.success("✅ Successfully made Admin");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  let handleMakeUser = async (email) => {
    try {
      let { data } = await axiosSecure.patch(`/user/${email}`, { role: false });
      if (data.modifiedCount > 0) {
        toast.success("✅ Successfully made User");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Filter + search logic
  let filteredUsers = users.filter((user) => {
    let matchesSearch =
      user?.displayName?.toLowerCase().includes(search.toLowerCase()) ||
      user?.email?.toLowerCase().includes(search.toLowerCase());
    let matchesFilter =
      filter === "all" ||
      (filter === "admin" && user.isAdmin) ||
      (filter === "user" && !user.isAdmin);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-xl sm:text-2xl font-bold text-center text-black mb-6 uppercase">
        Manage Users
      </h1>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
        >
          <option value="all">All</option>
          <option value="admin">Admins</option>
          <option value="user">Users</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          {/* head */}
          <thead className="bg-gray-100">
            <tr className="text-black text-xs sm:text-sm">
              <th className="py-3 px-2 sm:px-4">#</th>
              <th className="py-3 px-2 sm:px-4">Name</th>
              <th className="py-3 px-2 sm:px-4">Role</th>
              <th className="py-3 px-2 sm:px-4">Operation</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.email}
                className="hover:bg-gray-50 border-b last:border-none"
              >
                <td className="py-3 px-2 sm:px-4 font-medium">{index + 1}</td>
                <td className="py-3 px-2 sm:px-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12">
                        <img
                          src={user?.photoURL}
                          alt={user?.displayName || "User"}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm sm:text-base">
                        {user?.displayName || "Unknown User"}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-[200px]">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 sm:px-4 font-medium">
                  {user.isAdmin ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <span className="text-gray-700">User</span>
                  )}
                </td>
                <td className="py-3 px-2 sm:px-4">
                  {user.isAdmin ? (
                    <button
                      onClick={() => handleMakeUser(user?.email)}
                      disabled={user.email === userx.email && user.isAdmin}
                      className="px-3 py-1 sm:px-4 sm:py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm rounded-md shadow"
                    >
                      Make User
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user?.email)}
                      className="px-3 py-1 sm:px-4 sm:py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm rounded-md shadow"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
