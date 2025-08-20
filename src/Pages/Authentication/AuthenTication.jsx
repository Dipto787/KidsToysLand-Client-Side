import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidHide } from "react-icons/bi";
import { FaEye, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthProvider";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
const AuthenTication = () => {
    let [path, setPath] = useState('login');
    let [hide, setHide] = useState(true);
    let [confirmHide, setConfirmHide] = useState(true);
    let { createAccount, loading, continueWithGoogle, setLoading, updateUserProfile, signUp } = useContext(AuthContext);
    let location = useLocation();
    let [pending, setPending] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const pass = watch('password');
    const confirmPass = watch('confirmPassword');
    const passwordsMatch = pass === confirmPass;
    let navigator = location?.state ? location.state : '/';

    let navigate = useNavigate();

    const onRegisterSubmit = async (e) => {

        try {
            let formData = new FormData();
            formData.append('image', e.photo[0])
            console.log(formData)
            setPending(true);
            let { data } = await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
            console.log(data);

            const result = await createAccount(e.email, e.password);
            await updateUserProfile(e.name, data.data.display_url);
            if (result) {
                Swal.fire({
                    title: "Successful To Register!",
                    icon: "success",
                    draggable: true
                });
                navigate(navigator);
                setPending(false);
                setLoading(false);
            }

            reset();
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
            setPending(false);
        }
    }

    console.log('match', passwordsMatch)
    const handleLoginSubmit = async (e) => {
        if (!passwordsMatch) {
            return;
        }
        try {
            console.log(e)
            const result = await signUp(e.loginEmail, e.LoginPassword);
            if (result) {
                Swal.fire({
                    title: "Successful To Sign In!",
                    icon: "success",
                    draggable: true
                });
                navigate(navigator);
                setLoading(false);
            }
        } catch (err) {
            toast.error(err.message)
            setLoading(false);
        }
    }

    let handleContinueWithGoogle = async () => {
        let res = await continueWithGoogle()
        toast.success('success to login');
        navigate(navigator)
    }

    return (
        <div className="max-w-4xl my-20 m-auto">
            <div className="border shadow-xl py-5  rounded-xl   ">
                <div className="flex px-10 justify-between">
                    <h1 onClick={() => setPath('login')} className={` ${path === 'login' ? 'text-purple-600 font-bold border-b-4   border-red-500' : 'opacity-35'} text-xl duration-200 cursor-pointer py-3 font-semibold`}>LOGIN</h1>
                    <h1 onClick={() => setPath('register')} className={` ${path === 'register' ? 'text-purple-600 font-bold border-b-4  border-red-500' : 'opacity-35'} text-xl cursor-pointer duration-200 py-3 font-semibold`}>REGISTER</h1>
                </div>

                <div className="py-1">

                    {path === 'login' ?
                        <div className=" mt-7  px-10 mx-auto  ">
                            <div className="  text-xs w-full  ">
                                <form onSubmit={handleSubmit(handleLoginSubmit)} className=" ">
                                    <fieldset className="fieldset relative">
                                        <label className="label text-stone-500 font-semibold text-xl">Email</label>
                                        <input {...register('loginEmail', { required: true })} type="email" name="loginEmail" className="input  w-full " placeholder="Enter Your Email here" />
                                        {errors.loginEmail && <span className="text-red-500 text-lg font-bold p-2">Email is required</span>}
                                        <label className="label mt-3  text-stone-500 font-semibold text-xl">  Password</label>

                                        <label className={`input border-red-500 validator w-full ${pass === confirmPass && 'border-green-400'} `}>
                                            <input
                                                {...register('LoginPassword', { required: true })} type={`${hide ? 'password' : 'text'}`} className="w-full" name="LoginPassword" placeholder="Password" />
                                            <p onClick={() => setHide(!hide)} className={'text-xl cursor-pointer'}>{hide ? <FaEye /> :
                                                <BiSolidHide />}</p>
                                        </label>
                                        {errors.LoginPassword && <span className="text-red-500 text-lg font-bold p-2">Password is required</span>}
                                        <p className="underline text-lg font-semibold text-blue-600 cursor-pointer py-2">Forget Password</p>

                                        <button disabled={loading} className="btn bg-lime-600 text-xl py-3 text-white mt-4">{loading ? <TbFidgetSpinner className="animate-spin" /> : 'Sign In'}</button>
                                    </fieldset>
                                    <p className="text-xl text-center my-5">Don't Have an Account? Please <Link className="underline text-purple-500 font-semibold " onClick={() => setPath('register')}>Sign Up</Link></p>
                                </form>
                                <div className="divider"></div>
                                <div>
                                    <button disabled={loading} onClick={handleContinueWithGoogle} className="btn p-6 w-full text-lg"> Continue With <FcGoogle size={21} /></button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className=" mt-7 px-10 mx-auto">
                            <div className="text-xs  w-full   ">
                                <form onSubmit={handleSubmit(onRegisterSubmit)} className=" ">
                                    <fieldset className="fieldset text-xs space-y-2 relative">
                                        <label className="label  text-stone-500 font-semibold text-xs">Name</label>
                                        <input  {...register("name", { required: true })} type="text" name="name" className="input w-full" placeholder="Your Name..." />

                                        {errors.name && <span className="text-red-500 text-lg font-bold p-2">Name is required</span>}


                                        <label className="label text-stone-500 font-semibold text-xs">Email</label>
                                        <input  {...register('email', { required: true })} type="email" name="email" className="input w-full " placeholder="Enter Your Email here" />

                                        {errors.email && <span className="text-red-500 text-lg font-bold p-2">Email is required</span>}

                                        <label className="label text-stone-500 font-semibold text-xs">Upload Img</label>
                                        <input {...register('photo', { required: true })} type="file" name="photo" className="file-input w-full" />
                                        {errors.photo && <span className="text-red-500 text-lg font-bold p-2">Photo is required</span>}


                                        <label className="label mt-3  text-stone-500 font-semibold text-xs">  Password</label>

                                        <label className={`input validator w-full `}>
                                            <input
                                                {...register('password', { required: true })} type={`${hide ? 'password' : 'text'}`} className="    w-full" name="password" placeholder="Password" />
                                            <p onClick={() => setHide(!hide)} className={'text-xs cursor-pointer'}>{hide ? <FaEye /> :
                                                <BiSolidHide />}</p>
                                        </label>


                                        {errors.password && <span className="text-red-500 text-lg font-bold p-2">Password is required!</span>}

                                        <label className="label mt-3  text-stone-500 font-semibold text-xs"> Confirm Password</label>

                                        <label className={`input validator w-full `}>

                                            <input   {...register('confirmPassword', { required: true })} type={`${confirmHide ? 'password' : 'text'}`} className=" w-full" placeholder=" Confirm Password" name="confirmPassword" />
                                            <p onClick={() => setConfirmHide(!confirmHide)} className={` text-xs $ text-black  cursor-pointer  `}>{confirmHide ? <FaEye /> :
                                                <BiSolidHide />}</p>
                                        </label>


                                        {errors.confirmPassword && <span className="text-red-500 font-bold text-xs p-2">Retype password is required</span>}

                                        <p className="text-xs text-red-500">
                                            {pass && passwordsMatch ? <p className="text-green-500">✅ Passwords match </p> : "❌ Passwords do not match"}
                                        </p>



                                        <div className="flex items-center">
                                            <input       {...register('checked', { required: true })} name="checked" type="checkbox" className="checkbox" />

                                            <p className=" ml-4 text-xs text-black ">Accept Our <span className="underline text-violet-800">Terms and Conditions</span></p>
                                        </div>
                                        {errors.checked && <span className="text-red-500 font-bold p-2">You have to agree with our terms and conditions!</span>}
                                        <button disabled={loading || pending} className="btn bg-lime-600 text-xl py-3 text-white mt-4">{loading || pending ? <TbFidgetSpinner className="animate-spin" />
                                            : 'Sign Up'}</button>
                                    </fieldset>
                                    <p className="text-xs text-center my-5">Already Have an Account? Please <Link className="underline text-purple-500 font-semibold " onClick={() => setPath('login')}>Sign In</Link></p>
                                </form>

                                <div className="divider"></div>
                                <div>
                                    <button disabled={loading} onClick={handleContinueWithGoogle} className="btn p-6 w-full text-xs"> Continue With <FcGoogle size={21} /></button>
                                </div>
                            </div>
                        </div>
                    }
                </div >
            </div >
        </div >
    );
};

export default AuthenTication;