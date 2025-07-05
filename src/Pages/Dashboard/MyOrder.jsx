import { useContext, useState } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import useCart from "../../hooks/useCart";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const MyOrder = () => {
    let { user } = useContext(AuthContext);
    let [cart, refetch] = useCart();
    let axiosSecure = UseAxiosSecure();
    let [totalPrice, setTotalPrice] = useState(0);
    let [selectData, setSelectData] = useState(0);
    let [payItem, setPayItem] = useState([]);
    let [isOpen, setIsOpen] = useState(false);
    let navigate = useNavigate();
    let selectedData = (check) => {
        setTotalPrice(check + totalPrice);
        setSelectData(selectData + 1);
    }

    let handleCancelCart = async (cart) => {
        console.log(cart._id)
        let { data } = await axiosSecure.delete(`/cart`, { data: { email: user?.email, id: cart._id } })
        console.log(data)
        refetch();
    }

    let handlePay = async (e) => {
        let { data } = await axiosSecure.get(`/usersLocation/${user?.email}`);
        if (data) {
            return navigate(`/dashboard/payment`, { state: payItem });
        } else {
            return setIsOpen(true);
        }

    }

    console.log(payItem)

    let [number, setNumber] = useState('');
    let validNumber = number.length === 11;
    
    let handleAddLocation = async (location) => {
        location.preventDefault();
        let form = location.target;
        let locationInfo = { number: form.number.value, city: form.city.value, area: form.area.value, email: user?.email };
        let { data } = await axiosSecure.post('/userLocation', locationInfo);
        if (data.insertedId) {
            console.log('item is pay item', payItem)
            return navigate(`/dashboard/payment`, { state: payItem });
        }
    }
    let handleUnSelectItem = (cart) => {
        console.log('un select data', cart)
        let updateData = payItem.filter(item => item !== cart);
        setPayItem(updateData);
    }
    return (
        <div>
            <div className="flex justify-around">
                <h1 className="text-2xl font-semibold">Selected Data ({selectData})</h1>
                <h1 className="text-2xl font-semibold">Total Price : ({totalPrice})</h1>
                <button onClick={() => handlePay()} disabled={selectData === 0} className="btn bg-orange-500 text-white font-semibold px-10">Pay</button>
            </div>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className=" rounded-xl">
                        <tr>
                            <th>
                                Select data
                            </th>
                            <th>Name</th>
                            <th>price</th>
                            <th>quantity</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map(cartData => <tr>
                                <th>
                                    <label className=" ">
                                        <input onClick={(e) => e.target.checked === true ? (selectedData(cartData.cart.price * cartData.extra.quantity), setPayItem([...payItem, cartData])) : (setTotalPrice(totalPrice - cartData.cart.price * cartData.extra.quantity), setSelectData(selectData - 1),
                                            handleUnSelectItem(cartData))} type="checkbox" className="checkbox border-black text-orange-500 rounded-none" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask  h-32 w-32">
                                                <img
                                                    src={cartData.cart.img}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{cartData.cart.name}</div>
                                            <p> brand :  {cartData.cart.brand}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    $ {cartData.cart.price * cartData.extra.quantity}
                                </td>
                                <td>{cartData.extra.quantity}</td>
                                <td>
                                    <p   ><span className="bg-green-600 text-white font-bold rounded-full px-2 py-1">{cartData.status}</span></p>
                                </td>
                                <th>
                                    <button onClick={() => handleCancelCart(cartData)} className="btn  ">cancel</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* modal */}
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

                    <div className="flex  min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full  bg-base-200 max-w-lg  rounded-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <h1 className="text-center text-2xl font-semibold p-3">You Should be need to add your location</h1>
                            <form onSubmit={handleAddLocation} className="">
                                <div className="card  w-full   shrink-0 shadow-2xl">
                                    <div className="card-body">
                                        <fieldset className="fieldset">
                                            <label className="label"> Contact Number</label>
                                            <input onChange={(e) => setNumber(e.target.value)} type="number" name="number" className="input w-full" placeholder="number...." required />
                                            <p>{validNumber ? '' : <p className="text-lg text-red-500">Number length Should be 11</p>}</p>
                                            <label className="label"> Your City</label>
                                            <input type="text" name="city" className="input w-full" placeholder="your city..." required />

                                            <label className="label"> Your Area</label>
                                            <input type="text" name="area" className="input w-full" placeholder="your Area..." required />
                                            <button disabled={!validNumber} className="btn bg-red-500 text-white font-bold mt-4">Add</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default MyOrder;