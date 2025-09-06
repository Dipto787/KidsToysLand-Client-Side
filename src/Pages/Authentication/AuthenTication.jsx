import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidHide } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthProvider";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const AuthenTication = () => {
  let [path, setPath] = useState("login");
  let [hide, setHide] = useState(true);
  let [confirmHide, setConfirmHide] = useState(true);
  let { createAccount, loading, continueWithGoogle, setLoading, updateUserProfile, signUp } =
    useContext(AuthContext);
  let location = useLocation();
  let [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const pass = watch("password");
  const confirmPass = watch("confirmPassword");
  const passwordsMatch = pass === confirmPass;
  let navigator = location?.state ? location.state : "/";
  let navigate = useNavigate();

  // Register Submit
  const onRegisterSubmit = async (e) => {
    try {
      let formData = new FormData();
      formData.append("image", e.photo[0]);
      setPending(true);

      let { data } = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const result = await createAccount(e.email, e.password);
      await updateUserProfile(e.name, data.data.display_url);
      if (result) {
        Swal.fire({
          title: "Registration Successful!",
          icon: "success",
        });
        navigate(navigator);
      }

      setPending(false);
      setLoading(false);
      reset();
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
      setPending(false);
    }
  };

  // Login Submit
  const handleLoginSubmit = async (e) => {
    try {
      const result = await signUp(e.loginEmail, e.LoginPassword);
      if (result) {
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
        });
        navigate(navigator);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  let handleContinueWithGoogle = async () => {
    let res = await continueWithGoogle();
    toast.success("Google Sign-in Successful");
    navigate(navigator);
  };

  return (
    <div className="min-h-screen flex p-4  items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex justify-around border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <button
            onClick={() => setPath("login")}
            className={`w-1/2 py-4 text-lg font-semibold transition-all ${
              path === "login"
                ? "text-purple-700 border-b-4 border-purple-600"
                : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setPath("register")}
            className={`w-1/2 py-4 text-lg font-semibold transition-all ${
              path === "register"
                ? "text-purple-700 border-b-4 border-purple-600"
                : "text-gray-400"
            }`}
          >
            Register
          </button>
        </div>

        {/* Body */}
        <div className="p-8 md:p-12">
          {path === "login" ? (
            // ---------------- LOGIN ----------------
            <form
              onSubmit={handleSubmit(handleLoginSubmit)}
              className="space-y-6"
            >
              <div>
                <label className="block text-gray-600 font-semibold mb-2">
                  Email
                </label>
                <input
                  {...register("loginEmail", { required: true })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full input bg-white input-bordered focus:ring-2 focus:ring-purple-400"
                />
                {errors.loginEmail && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("LoginPassword", { required: true })}
                    type={hide ? "password" : "text"}
                    placeholder="Enter password"
                    className="w-full input bg-white input-bordered focus:ring-2 focus:ring-purple-400"
                  />
                  <span
                    onClick={() => setHide(!hide)}
                    className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
                  >
                    {hide ? <FaEye /> : <BiSolidHide />}
                  </span>
                </div>
                {errors.LoginPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Password is required
                  </p>
                )}
              </div>

              <p className="text-blue-600 underline cursor-pointer">
                Forgot Password?
              </p>

              <button
                disabled={loading}
                className="w-full btn bg-purple-600 hover:bg-purple-700 text-white text-lg"
              >
                {loading ? <TbFidgetSpinner className="animate-spin" /> : "Sign In"}
              </button>

              <p className="text-center text-sm">
                Don’t have an account?{" "}
                <span
                  onClick={() => setPath("register")}
                  className="text-purple-600 cursor-pointer font-semibold underline"
                >
                  Sign Up
                </span>
              </p>

              <div className="divider">OR</div>
              <button
                type="button"
                onClick={handleContinueWithGoogle}
                className="w-full btn border text-lg flex items-center justify-center gap-2"
              >
                <FcGoogle size={22} /> Continue with Google
              </button>
            </form>
          ) : (
            // ---------------- REGISTER ----------------
            <form
              onSubmit={handleSubmit(onRegisterSubmit)}
              className="space-y-6"
            >
              <div>
                <label className="block text-gray-600 font-semibold mb-2">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full input bg-white input-bordered focus:ring-2 focus:ring-purple-400"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-2">
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full input bg-white input-bordered focus:ring-2 focus:ring-purple-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-2">
                  Upload Image
                </label>
                <input
                  {...register("photo", { required: true })}
                  type="file"
                  className="file-input bg-white w-full"
                />
                {errors.photo && (
                  <p className="text-red-500 text-sm mt-1">
                    Profile photo is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", { required: true })}
                    type={hide ? "password" : "text"}
                    placeholder="Enter password"
                    className="w-full input bg-white input-bordered focus:ring-2 focus:ring-purple-400"
                  />
                  <span
                    onClick={() => setHide(!hide)}
                    className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
                  >
                    {hide ? <FaEye /> : <BiSolidHide />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    Password is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword", { required: true })}
                    type={confirmHide ? "password" : "text"}
                    placeholder="Re-enter password"
                    className="w-full input bg-white input-bordered focus:ring-2 focus:ring-purple-400"
                  />
                  <span
                    onClick={() => setConfirmHide(!confirmHide)}
                    className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
                  >
                    {confirmHide ? <FaEye /> : <BiSolidHide />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Confirm password is required
                  </p>
                )}
                {pass && passwordsMatch ? (
                  <p className="text-green-600 text-sm mt-1">
                    ✅ Passwords match
                  </p>
                ) : (
                  <p className="text-red-500 text-sm mt-1">
                    ❌ Passwords do not match
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  {...register("checked", { required: true })}
                  type="checkbox"
                  className="checkbox"
                />
                <p className="text-sm">
                  Accept our{" "}
                  <span className="underline text-purple-600">
                    Terms & Conditions
                  </span>
                </p>
              </div>
              {errors.checked && (
                <p className="text-red-500 text-sm mt-1">
                  You must accept our terms and conditions
                </p>
              )}

              <button
                disabled={loading || pending}
                className="w-full btn bg-purple-600 hover:bg-purple-700 text-white text-lg"
              >
                {loading || pending ? (
                  <TbFidgetSpinner className="animate-spin" />
                ) : (
                  "Sign Up"
                )}
              </button>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => setPath("login")}
                  className="text-purple-600 cursor-pointer font-semibold underline"
                >
                  Sign In
                </span>
              </p>

              <div className="divider">OR</div>
              <button
                type="button"
                onClick={handleContinueWithGoogle}
                className="w-full btn bg-white text-black border text-lg flex items-center justify-center gap-2"
              >
                <FcGoogle size={22} /> Continue with Google
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthenTication;
