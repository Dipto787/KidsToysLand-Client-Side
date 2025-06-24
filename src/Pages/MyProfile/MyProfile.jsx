
import { AuthContext } from "../Authentication/AuthProvider";
import profileBanner from '../../assets/Banner/profileBanner.webp';
import { useContext, useState } from "react";
import { BiSolidHide } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { TbFidgetSpinner, TbXboxX } from "react-icons/tb";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
const MyProfile = () => {
    let [confirmPass, setConfirmPass] = useState('');
    let [pass, setPass] = useState('');
    let [hide, setHide] = useState(true);
    let [confirmHide, setConfirmHide] = useState(true);
    let [hidden, setHidden] = useState(false);
    let navigate = useNavigate();
    let [isOpen, setIsOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    let { user, updateUserPassword, setLoading, loading, logout } = useContext(AuthContext);
    let handleChangePassword = async (e) => {
        try {
            await updateUserPassword(e.password)
                .then(() => {
                    setIsOpen(false);
                    logout();
                    navigate('/verify-checkout')
                    toast.success('password updated successful')
                })


        } catch (err) {
            setLoading(false);
            toast.error(err.message)
        }
    }
    return (
        <div className='flex justify-center items-center  '>
            <div className='bg-white shadow-lg rounded-2xl w-3/5'>
                <img
                    alt='profile'
                    src={profileBanner}
                    className='w-full mb-4 rounded-t-lg h-36'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>


                    <p className='mt-2 text-xl font-medium text-gray-800 '>
                        User Id: {user?.uid}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-black '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-black '>{user?.email}</span>
                            </p>

                            <div>
                                <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                    Update Profile
                                </button>

                                <button onClick={() => setIsOpen(true)} className='bg-[#F43F5E] px-8 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                    Change Password
                                </button>



                            </div>
                        </div>
                    </div>
                </div>
            </div>






            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10     overflow-y-auto">
                    <div className="flex min-h-full  items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl   bg-amber-200 p-6 backdrop-blur-2xl "
                        >
                            <form onSubmit={handleSubmit(handleChangePassword)} className="">
                                <label className="label mt-3   text-stone-500 font-semibold text-xl">  Password</label>

                                <label className={`input border-red-500 validator w-full ${pass === confirmPass && 'border-green-400'} `}>
                                    <input onKeyUp={(e) => setPass(e.target.value)}
                                        {...register('password', { required: true })} type={`${hide ? 'password' : 'text'}`} className="    w-full" name="password" placeholder="Password" />
                                    <p onClick={() => setHide(!hide)} className={'text-xl cursor-pointer'}>{hide ? <FaEye /> :
                                        <BiSolidHide />}</p>
                                </label>


                                {errors.password && <span className="text-red-500 text-lg font-bold p-2">Password is required!</span>}

                                <div>
                                    <label className="label mt-3  text-stone-500 font-semibold text-xl"> Confirm Password</label>

                                    <label className={`input border-red-500 validator w-full ${pass === confirmPass && 'border-green-400'} `}>

                                        <input onKeyUp={(e) => setConfirmPass(e.target.value)} {...register('confirmPassword', { required: true })} type={`${confirmHide ? 'password' : 'text'}`} className=" w-full" placeholder=" Confirm Password" name="confirmPassword" />
                                        <p onClick={() => setConfirmHide(!confirmHide)} className={` text-xl $ text-black  cursor-pointer  `}>{confirmHide ? <FaEye /> :
                                            <BiSolidHide />}</p>
                                    </label>
                                </div>


                                {errors.confirmPassword && <span className="text-red-500 text-lg font-bold p-2">Retype password is required</span>}

                                {
                                    confirmPass !== pass && <span className="text-red-500 text-lg font-bold p-2">Password Dost'n match </span>
                                }
                                <div className="modal-action">
                                    <button disabled={loading} className="btn">Change </button>

                                </div>

                                <Link onClick={() => setIsOpen(false)} className="  "><TbXboxX size={22} />

                                </Link>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>


        </div>
    );
};

export default MyProfile;