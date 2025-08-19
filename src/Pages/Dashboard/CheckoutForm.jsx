import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { useQuery } from "@tanstack/react-query";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { RiCloseLargeLine } from "react-icons/ri";
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    let [clientSecret, setClientSecret] = useState('');
    const location = useLocation();
    let [, refetch] = useCart();
    let [cart] = useCart();
    let navigate = useNavigate();
    let [process, setProcess] = useState(false);
    let [transactionId, setTransactionId] = useState('');
    console.log(location)
    let axiosSecure = UseAxiosSecure();
    let [isOpen, setIsOpen] = useState(false);

    let { user } = useContext(AuthContext);
    let totalPrice = 0;
    for (let carts of location.state) {
        // totalPrice += cart.cart.price * cart.cart.quantity
        totalPrice += carts.extra.quantity * carts.cart.price
    }

    useEffect(() => {
        if (!location.state || !Array.isArray(location.state) || location.state.length === 0) {
            return navigate('/dashboard/myOrder', { replace: true });
        }
    }, [location.state, navigate]);




    let { data: myLocation = {}, refetch: reLoad } = useQuery({
        queryKey: ['myLocation', user?.email],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/usersLocation/${user?.email}`);
            return data;
        }
    })

    console.log(myLocation)



    useEffect(() => {

        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })

    }, [axiosSecure, totalPrice]);
    let handleSubmit = async (e) => {
        e.preventDefault();
        setProcess(true);
        if (!stripe || !elements) {
            setProcess(false);
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            setProcess(false);
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log(error)
            setProcess(false);
        } else {

            console.log(paymentMethod)
        }

        // confirm payment
        let { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });
        if (confirmError) {
            console.log('confirmError')
        } else {
            console.log(paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                let payment = {
                    email: user?.email,
                    price: totalPrice,
                    date: new Date(),
                    transaction: paymentIntent.id,
                    cartId: location.state.map(carts => carts._id),
                    status: 'Paid'
                }
                let quantity = location.state.map(carts => carts.extra.quantity);
                let cartIds = location.state.map(carts => carts.cart._id);
                console.log(quantity)
                axiosSecure.post(`/payHistory`, payment)
                let setSold = await axiosSecure.patch(`/carts`, { cartIds, quantity });
                console.log('setSolddata', setSold.data)
                let { data } = await axiosSecure.get(`/usersLocation/${user?.email}`);
                let { data: loll } = await axiosSecure.get(`/payHistory/${user?.email}`);
                if (!data.userLocation) {
                    let { data: lol } = await axiosSecure.patch(`/payHistoryLocation`, data);
                }
                refetch();
                setProcess(false);
                window.location.replace('/dashboard/pay-history');

            }
        }
    }
    let [number, setNumber] = useState('');
    let validNumber = number.length === 11;
    let handleAddLocation = async (location) => {
        location.preventDefault();
        let form = location.target;
        let locationInfo = { number: form.number.value, city: form.city.value, area: form.area.value, email: user?.email };
        let { data } = await axiosSecure.put(`/userLocation/${user?.email}`, locationInfo);
        console.log(data);
        setIsOpen(false);
        reLoad();
    }

    return (
        <div>
            <div className="flex  justify-between">
                <div className="w-[50%]">
                    <div className="shadow-lg">
                        <div className="flex justify-between bg-slate-200 px-8 p-2">
                            <h1>Shipping & Billing</h1>
                            <p onClick={() => setIsOpen(true)} className="text-blue-500 cursor-pointer font-semibold">EDIT</p>
                        </div>
                        <div className="bg-gray-100 p-8 mb-5">
                            <div>

                                <div>
                                    <div className="flex items-center mb-4 gap-8">
                                        <p className="font-semibold">{user?.displayName}</p>
                                        <p>  +{myLocation.number}</p>
                                    </div>
                                    <div className="flex gap-3 items-center text-lg">
                                        <p className="bg-[#169ebc] rounded-full px-3  text-white">Location</p>
                                        <p> {myLocation.city} ,</p>
                                        <p>{myLocation.area}</p>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                    <div className="">
                        <h2 className="text-3xl border-b-2 mb-4 p-3">Your Carts : {location?.state.length}</h2>
                        {
                            location?.state.map(carts => (
                                <div>
                                    <div className=" flex gap-5 justify-between items-center ">
                                        <img className="w-[20%]" src={carts.cart.img} alt="" />
                                        <div className="text-xl" >
                                            <h1 className="text-2xl font-semibold">{carts.cart.name}</h1>
                                            <h1 className="">{carts.cart.details}</h1>
                                        </div>
                                    </div>

                                    <div className="divider"></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex-1 ">
                    <form onSubmit={handleSubmit}>
                        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
                            <h1 className="text-2xl text-center mb-4">Total Price : {totalPrice}</h1>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">💳 Enter your card details</h2>

                            <div className="p-4 rounded-md border border-gray-300 bg-gray-50 focus-within:border-blue-500 transition-all duration-300">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                color: "#32325d",
                                                fontFamily: "Arial, sans-serif",
                                                backgroundColor: "#f8fafc",
                                                '::placeholder': {
                                                    color: "#a0aec0",
                                                },
                                            },
                                            invalid: {
                                                color: "#e53e3e",
                                                iconColor: "#e53e3e",
                                            },
                                        },
                                    }}
                                />
                            </div>


                            <button type="submit" className="mt-6 w-full  bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium" disabled={!stripe || !clientSecret || process || cart.length === 0}>
                                Pay
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* modal */}
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

                    <div className="flex  min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full  bg-base-200 max-w-lg  rounded-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <h1 onClick={() => setIsOpen(false)} className="text-2xl cursor-pointer font-semibold mt-2 p-3"><RiCloseLargeLine />
                            </h1>
                            <form onSubmit={handleAddLocation} className="">
                                <div className="card  w-full   shrink-0 shadow-2xl">
                                    <div className="card-body">
                                        <fieldset className="fieldset">
                                            <label className="label"> Contact Number</label>
                                            <input onChange={(e) => setNumber(e.target.value)} type="number" name="number" className="input w-full" placeholder="number...." required />
                                            <p>{validNumber ? '' : <p className="text-lg text-red-500">Number length Should be 11</p>}</p>
                                            <label className="label"> Your City</label>
                                            <input defaultValue={myLocation.city} type="text" name="city" className="input w-full" placeholder="your city..." required />

                                            <label className="label"> Your Area</label>
                                            <input defaultValue={myLocation.area} type="text" name="area" className="input w-full" placeholder="your Area..." required />
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

export default CheckoutForm;