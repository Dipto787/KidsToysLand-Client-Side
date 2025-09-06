import { useContext, useState } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import useCart from "../../hooks/useCart";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const axiosSecure = UseAxiosSecure();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectData, setSelectData] = useState(0);
  const [payItem, setPayItem] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const validNumber = number.length === 11;

  const selectedData = (price) => {
    setTotalPrice(totalPrice + price);
    setSelectData(selectData + 1);
  };

  const handleCancelCart = async (cart) => {
    const { data } = await axiosSecure.delete(`/cart`, {
      data: { email: user?.email, id: cart._id },
    });
    if (data) refetch();
  };

  const handlePay = async () => {
    const { data } = await axiosSecure.get(`/usersLocation/${user?.email}`);
    if (data) navigate(`/dashboard/payment`, { state: payItem });
    else setIsOpen(true);
  };

  const handleUnSelectItem = (cart) => {
    setPayItem(payItem.filter((item) => item !== cart));
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    const form = e.target;
    const locationInfo = {
      number: form.number.value,
      city: form.city.value,
      area: form.area.value,
      email: user?.email,
    };
    const { data } = await axiosSecure.post("/userLocation", locationInfo);
    if (data.insertedId) navigate(`/dashboard/payment`, { state: payItem });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 bg-gray-50 min-h-screen">
      {/* Top Summary */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
          Selected Items: <span className="text-orange-500">{selectData}</span>
        </h1>
        <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
          Total Price: <span className="text-orange-500">${totalPrice}</span>
        </h1>
        <button
          onClick={handlePay}
          disabled={selectData === 0}
          className="btn bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 md:px-10 w-full md:w-auto transition-all duration-300"
        >
          Pay
        </button>
      </div>

      <div className="divider my-6"></div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="p-3">Select</th>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="text-center">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      e.target.checked
                        ? (selectedData(item.cart.price * item.extra.quantity),
                          setPayItem([...payItem, item]))
                        : (setTotalPrice(
                            totalPrice - item.cart.price * item.extra.quantity
                          ),
                          setSelectData(selectData - 1),
                          handleUnSelectItem(item))
                    }
                    className="checkbox checkbox-primary"
                  />
                </td>
                <td className="flex items-center gap-3 p-3">
                  <img
                    src={item.cart.img}
                    alt={item.cart.name}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold">{item.cart.name}</p>
                    <p className="text-sm text-gray-500">
                      Brand: {item.cart.brand}
                    </p>
                  </div>
                </td>
                <td className="text-center">${item.cart.price * item.extra.quantity}</td>
                <td className="text-center">{item.extra.quantity}</td>
                <td className="text-center">
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                    {item.status}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleCancelCart(item)}
                    className="btn btn-xs bg-red-500 hover:bg-red-600 text-white"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {cart.map((item, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                onChange={(e) =>
                  e.target.checked
                    ? (selectedData(item.cart.price * item.extra.quantity),
                      setPayItem([...payItem, item]))
                    : (setTotalPrice(
                        totalPrice - item.cart.price * item.extra.quantity
                      ),
                      setSelectData(selectData - 1),
                      handleUnSelectItem(item))
                }
                className="checkbox checkbox-primary"
              />
              <img
                src={item.cart.img}
                alt={item.cart.name}
                className="h-20 w-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.cart.name}</p>
                <p className="text-sm text-gray-500">Brand: {item.cart.brand}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Price:</p>
              <span className="font-semibold text-gray-800">
                ${item.cart.price * item.extra.quantity}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Quantity:</p>
              <span>{item.extra.quantity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                {item.status}
              </span>
              <button
                onClick={() => handleCancelCart(item)}
                className="btn btn-xs bg-red-500 hover:bg-red-600 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Location Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <DialogPanel className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            Add Your Location 📍
          </h2>
          <form onSubmit={handleAddLocation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Contact Number
              </label>
              <input
                type="number"
                name="number"
                placeholder="Enter your number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              {!validNumber && (
                <p className="text-red-500 text-sm mt-1">
                  Number should be 11 digits
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Area
              </label>
              <input
                type="text"
                name="area"
                placeholder="Enter your area"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              disabled={!validNumber}
              className="btn w-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all duration-300"
            >
              Add Location
            </button>
          </form>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default MyOrder;
