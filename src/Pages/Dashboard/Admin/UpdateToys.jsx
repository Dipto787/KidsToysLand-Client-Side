import { useNavigate, useParams } from "react-router-dom";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const UpdateToys = () => {
    let { id } = useParams();
    let [loading, setLoading] = useState(false);
    let axiosSecure = UseAxiosSecure();
    let { data: toy = {}, refetch, isLoading } = useQuery({
        queryKey: ['toy'],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/all-toys/${id}`);
            return data;
        },

    })
    console.log(toy)
    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let handleAddToy = async (e) => {
        const file = e.photo[0]
        if (!file || !file.type.startsWith("image/")) {
            toast.error("⚠️ Please upload a valid image file.");
            return;
        }
        console.log(file)
        let imgData = new FormData();
        imgData.append('image', file)
        try {
            setLoading(true);
            let { data } = await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMGBB_API_KEY}`, imgData);
            let addData = {
                name: e.name,
                age: e.age,
                brand: e.brand,
                price: e.price,
                details: e.details,
                sold: 0,
                rating: 0,
                img: data.data.url

            }

            let { data: added } = await axiosSecure.post('/toys', addData)
            console.log(added)

            if (added.insertedId) {
                let notification = {
                    subject: '🧸Admin Post a new Toys',
                    toyName:
                        e.name,
                    brand: e.brand,
                    price: e.price,
                    date: new Date()
                }
                axiosSecure.post('/notifications', notification)
                toast.success('Added success')
                navigate('/dashboard/manage-toys')
                setLoading(false);
            }


        } catch (err) {
            setLoading(false);
            toast.error("❌ Failed to add toy");
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleAddToy)} className="bg-[#f3f3f3]  p-10">
                <div className="grid gap-4  grid-cols-2">

                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Toy Name</legend>
                            <input defaultValue={toy.name} type="text" className="input w-full" name="name"    {...register('name', { required: true })} placeholder="toy name..." />

                        </fieldset>
                    </div>

                    <div>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Toy Brands</legend>
                            <select name="brand"   {...register('brand', { required: true })} defaultValue={''} className="select w-full" >
                                <option value={toy.brand} >{toy.brand}</option>
                                <option value="funskool">funskool</option>
                                <option value="toybilss">toybilss</option>
                                <option value="challenge accepted">challenge accepted</option>
                                <option value="winfun">winfun</option>
                                <option value="frank">frank</option>
                                <option value="fisher-price">fisher-price</option>
                                <option value="majorette">majorette</option>
                                <option value="zepltyr">zepltyr</option>
                                <option value="sold">sold</option>
                            </select>

                        </fieldset>
                    </div>


                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">age range</legend>
                            <select defaultValue={``} name="age" className="select w-full" required>
                                <option value={toy.age} >{toy.age}</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </fieldset>
                    </div>



                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Toy Price</legend>
                            <input type="number" defaultValue={toy.price} className="input w-full" name="price"  {...register('price', { required: true })} placeholder="toy price..." required />
                        </fieldset>
                    </div>

                    <div className="col-span-2">
                        <fieldset className="fieldset ">
                            <legend className="fieldset-legend">toys details</legend>
                            <textarea defaultValue={toy.details} className="textarea h-28  w-full" name="details" placeholder="details..."></textarea>
                        </fieldset>
                    </div>

                    <div>
                        <fieldset className="fieldset">
                                <p className="text-sm text-gray-600 mt-1">Current image</p>
                            <div className="mb-2">
                                <img src={toy.img} alt="Current Toy" className="h-24 rounded border" />
                            </div>
                            
                            
                            <input   type="file" name="photo" placeholder="fdf"  {...register('photo', { required: true })} className="file-input" required />


                        </fieldset>
                    </div>
                </div>
                <div className="text-center">
                    <button disabled={loading} className="btn  w-[50%] mt-8 bg-gradient-to-r from-[#876025] to-[#b17e2f] text-white font-bold py-6 ">{loading ? <FaSpinner size={22} className="animate-spin" /> : 'Add Toy'}</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateToys;