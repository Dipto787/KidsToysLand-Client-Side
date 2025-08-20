import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { use, useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import toast from "react-hot-toast";

const Users = () => {
    let axiosSecure = UseAxiosSecure();
    let { user: userx } = useContext(AuthContext);
    console.log(userx)
    let { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            let { data } = await axiosSecure.get('/users');
            return data;
        }

    })
    let handleMakeAdmin = async (email) => {
        try {
            let { data } = await axiosSecure.patch(`/user/${email}`, { role: true });
            if (data.modifiedCount > 0) {
                toast.success('success to make admin')
                refetch();
            }

        } catch (err) {
            toast.error(err.message)
        }
    }
    let handleMakeUser = async (email) => {
        try {
            let { data } = await axiosSecure.patch(`/user/${email}`, { role: false });
            if (data.modifiedCount > 0) {
                toast.success('success to make user')
                refetch();
            }

        } catch (err) {
            toast.error(err.message)
        }
    }
    return (
        <div>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-xs">
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {users.map((user, index) => (
                            <tr>
                                <th>
                                    <label>
                                        {index}
                                    </label>
                                </th>
                                <td className="text-xs">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user?.photoURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user?.displayName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.isAdmin ? 'admin ' : 'user'}
                                </td>
                                <th>
                                    {
                                        user.isAdmin ? 
                                        <button onClick={() => handleMakeUser(user?.email)} disabled={user.email === userx.email && user.isAdmin}  className="btn text-white text-xs btn-sm bg-purple-500">Make User</button> 

                                        : <button onClick={() => handleMakeAdmin(user?.email)} className="btn text-white text-xs btn-sm bg-orange-500">Make Admin</button>
                                    }
                                </th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Users;