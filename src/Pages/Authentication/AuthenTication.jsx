import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidHide } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import toast from "react-hot-toast";
import { AuthContext } from "./AuthProvider";

const AuthenTication = () => {
    let [path, setPath] = useState('login');
    let [hide, setHide] = useState(true);
    let [confirmHide, setConfirmHide] = useState(true);
    let { createAccount } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onRegisterSubmit = async (e) => {
        try {
            console.log(e);

            //    await createAccount(e.email, password);
        } catch (err) {
            toast.error(err.message)
        }
    }
    return (
        <div className="max-w-4xl my-20 m-auto">
            <div className="border shadow-xl py-5  rounded-xl   ">
                <div className="flex px-10 justify-between">
                    <h1 onClick={() => setPath('login')} className={` ${path === 'login' ? 'text-purple-600 font-bold border-b-4   border-red-500' : 'opacity-35'} text-5xl duration-200 cursor-pointer py-3 font-semibold`}>LOGIN</h1>
                    <h1 onClick={() => setPath('register')} className={` ${path === 'register' ? 'text-purple-600 font-bold border-b-4  border-red-500' : 'opacity-35'} text-5xl cursor-pointer duration-200 py-3 font-semibold`}>REGISTER</h1>
                </div>

                <div className="py-1">
                    {
                        path === 'login' ?
                            <div className=" mt-7  px-10 mx-auto  ">
                                <div className="  w-full  ">
                                    <form className=" ">
                                        <fieldset className="fieldset relative">
                                            <label className="label text-stone-500 font-semibold text-xl">Email</label>
                                            <input type="email" name="email" className="input  w-full " placeholder="Enter Your Email here" />
                                            <label className="label mt-3  text-stone-500 font-semibold text-xl">Password</label>
                                            <input type={`${hide ? 'password' : 'text'}`} className="input  w-full" placeholder="Password" />
                                            <p onClick={() => setHide(!hide)} className="absolute text-2xl z-40 right-5 bottom-[100px] ">{hide ? <FaEye /> :
                                                <BiSolidHide />}</p>

                                            <p className="underline text-lg font-semibold text-blue-600 cursor-pointer py-2">Forget Password</p>

                                            <button className="btn bg-lime-600 text-xl py-3 text-white mt-4">Sign In</button>
                                        </fieldset>
                                        <p className="text-xl text-center my-5">Don't Have an Account? Please <Link className="underline text-purple-500 font-semibold " onClick={() => setPath('register')}>Sign Up</Link></p>
                                    </form>
                                </div>
                            </div>
                            :
                            <div className=" mt-7  px-10 mx-auto  ">
                                <div className="  w-full  ">
                                    <form onSubmit={handleSubmit(onRegisterSubmit)} className=" ">
                                        <fieldset className="fieldset space-y-3 relative">
                                            <label className="label text-stone-500 font-semibold text-xl">Name</label>
                                            <input  {...register('name'), { required: true }} type="text" name="name" className="input  w-full " placeholder="Your Name..." />



                                            <label className="label text-stone-500 font-semibold text-xl">Email</label>
                                            <input  {...register('email'), { required: true }} type="email" name="email" className="input  w-full " placeholder="Enter Your Email here" />


                                            <label className="label text-stone-500 font-semibold text-xl">Upload Img</label>
                                            <input {...register('photo'), { required: true }} type="file" name="photo" className="file-input w-full" />


                                            <label className="label mt-3  text-stone-500 font-semibold text-xl">Password</label>
                                            <input  {...register('password'), { required: true }} type={`${hide ? 'password' : 'text'}`} className="input  w-full" name="password" placeholder="Password" />

                                            <p onClick={() => setHide(!hide)} className="absolute text-2xl z-40 right-5 bottom-[175px] ">{hide ? <FaEye /> :
                                                <BiSolidHide />}</p>


                                            <label className="label mt-3  text-stone-500 font-semibold text-xl"> Confirm Password</label>
                                            <input {...register('confirmPassword')} type={`${hide ? 'password' : 'text'}`} className="input  w-full" placeholder=" Confirm Password" name="confirmPassword" />

                                            <p onClick={() => setConfirmHide(!confirmHide)} className="absolute text-2xl z-40 text-black right-5 bottom-[90px] ">{confirmHide ? <FaEye /> :
                                                <BiSolidHide />}</p>

                                            <div className="flex items-center">
                                                <input       {...register('checked')} name="checked" type="checkbox" className="checkbox" />

                                                <p className=" ml-4 text-lg text-black ">Accept Our <span className="underline text-violet-800">Terms and Conditions</span></p>
                                            </div>

                                            <button className="btn bg-lime-600 text-xl py-3 text-white mt-4">Sign Up</button>
                                        </fieldset>
                                        <p className="text-xl text-center my-5">Don't Have an Account? Please <Link className="underline text-purple-500 font-semibold " onClick={() => setPath('register')}>Sign In</Link></p>
                                    </form>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default AuthenTication;