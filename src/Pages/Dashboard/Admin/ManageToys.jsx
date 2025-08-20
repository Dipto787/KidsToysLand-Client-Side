import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { toQueryRef } from "firebase/data-connect";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ManageToys = () => {
    let axiosSecure = UseAxiosSecure();
    let { data: toys = [], refetch, isLoading } = useQuery({
        queryKey: ['toys'],
        queryFn: async () => {
            let { data } = await axiosSecure.get('/toys');
            return data;
        }
    })

    let handleDelete = async (id) => {
        try {
            let { data } = await axiosSecure.delete(`/toy/${id}`);
            if (data.deletedCount > 0) {
                toast.success('Success To Delete');
                refetch();
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    return (
        <div>
            <div>
                <div className="overflow-x-auto   rounded-2xl    ">
                    <table className="table border-b-2   lg:table-fixed w-full">
                        {/* head */}
                        <thead className="bg-[#d1a054] border     text-white font-semibold">
                            <tr className="text-xs">
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>sold</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                toys.map((toy, index) => <tr className="text-xs">
                                    <th><img src={toy?.img} className="w-[50%]" alt="" /></th>
                                    <td className="text-xs"> {toy.name}</td>
                                    <td className="text-xs">${toy.price}</td>
                                    <td>{toy.sold}</td>
                                    <td className="space-y-2">
                                        <Link to={`/dashboard/update-toy/${toy._id}`} className="btn rounded p-3 text-white bg-[#d1a054] mr-6"><HiPencilAlt size={24} /></Link>
                                        <button onClick={() => handleDelete(toy._id)} className="btn p-3 text-white bg-red-600 "><MdDeleteOutline size={24} /></button>
                                    </td>

                                </tr>)
                            }



                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
};

export default ManageToys;