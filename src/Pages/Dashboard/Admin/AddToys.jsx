import { useState } from "react";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddToys = () => {
  let [loading, setLoading] = useState(false);
  let axiosSecure = UseAxiosSecure();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let handleAddToy = async (e) => {
    const file = e.photo[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("⚠️ Please upload a valid image file.");
      return;
    }

    let imgData = new FormData();
    imgData.append("image", file);

    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        imgData
      );

      let addData = {
        name: e.name,
        brand: e.brand,
        age: e.age,
        price: e.price,
        details: e.details,
        sold: 0,
        rating: 0,
        img: data.data.url,
      };

      let { data: added } = await axiosSecure.post("/toys", addData);

      if (added.insertedId) {
        let notification = {
          subject: "🧸 Admin Posted a New Toy",
          toyName: e.name,
          brand: e.brand,
          price: e.price,
          date: new Date(),
        };
        axiosSecure.post("/notifications", notification);

        toast.success("✅ Toy added successfully");
        navigate("/dashboard/manage-toys");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      toast.error("❌ Failed to add toy");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 lg:p-12 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold uppercase text-center text-gray-800">
        Add a Toy
      </h1>
      <div className="divider w-[40%] mx-auto"></div>

      <form
        onSubmit={handleSubmit(handleAddToy)}
        className="grid gap-6 lg:grid-cols-2 mt-6"
      >
        {/* Toy Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Toy Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
            placeholder="Enter toy name"
          />
          {errors.name && <p className="text-red-500 text-xs">Required</p>}
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
          <select
            {...register("brand", { required: true })}
            defaultValue=""
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
          >
            <option value="" disabled>
              Select Brand
            </option>
            <option value="funskool">Funskool</option>
            <option value="toybilss">Toybilss</option>
            <option value="challenge accepted">Challenge Accepted</option>
            <option value="winfun">Winfun</option>
            <option value="frank">Frank</option>
            <option value="fisher-price">Fisher-Price</option>
            <option value="majorette">Majorette</option>
            <option value="zepltyr">Zepltyr</option>
          </select>
          {errors.brand && <p className="text-red-500 text-xs">Required</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Age Range</label>
          <select
            {...register("age", { required: true })}
            defaultValue=""
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
          >
            <option value="" disabled>
              Select Age
            </option>
            {[...Array(8)].map((_, i) => (
              <option key={i} value={i + 2}>
                {i + 2}
              </option>
            ))}
          </select>
          {errors.age && <p className="text-red-500 text-xs">Required</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
            placeholder="Enter toy price"
          />
          {errors.price && <p className="text-red-500 text-xs">Required</p>}
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Details</label>
          <textarea
            {...register("details", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 h-32"
            placeholder="Enter toy details"
          ></textarea>
          {errors.details && <p className="text-red-500 text-xs">Required</p>}
        </div>

        {/* Photo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
          {errors.photo && <p className="text-red-500 text-xs">Required</p>}
        </div>

        {/* Submit */}
        <div className="lg:col-span-2 text-center">
          <button
            disabled={loading}
            className="btn w-full lg:w-1/2 mt-6 bg-gradient-to-r from-[#876025] to-[#b17e2f] text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90"
          >
            {loading ? <FaSpinner size={22} className="animate-spin" /> : "Add Toy"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddToys;
