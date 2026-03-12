import React, { useState, useContext, useEffect } from "react";
import { getUserDetail, Login } from "../../service/authService.js";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Loading from '../../components/UI/Loading.jsx';
import { UserContext } from "../../context/UserContext.jsx";
import SecurityAnimation from "../../components/UI/SecurityAnimation.jsx";
import BackButton from "../../components/Button/BackButton.jsx";
import NotificationToaster from "../../components/UI/NotificationToaster.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const { UserDetail, setUserDetail } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);          //Loading animation state
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const Role = UserDetail?.role         // Used Context for getting role of user which is got from backend 
  useEffect(() => {                     // Redirect if already logged in
    if (Role) { 
      navigate("/dashboard");
    }
  }, [Role, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);                                      // Start loading animation

    try {
      const response = await Login({              //sending data to backend for checking user is valid or not 
        email: email.trim(),
        password: password.trim(),
      });

      const user = await getUserDetail();         //  getting User Details from DB through Backend
      setUserDetail(user)                         // Store User Data in context 

      navigate("/dashboard", { replace: true });                   //Navigate user to role based dashboard
    } catch (error) {
      if (error.response?.status === 400) {                 //  Check if backend returns 401
        toast.error("Email or password is incorrect.");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading animation */}
      <Loading loading={loading}/>

      <section className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="gap-10 lg:gap-0 md:w-1/2 w-full flex flex-col justify-between p-8 bg-linear-to-br from-blue-600 to-violet-600 text-white">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-12 md:h-14" />
          <h1 className="text-xl md:text-2xl font-bold">Smart Home</h1>
        </div>

        {/* Left Side Lottie Animation */}
        <SecurityAnimation/>

        {/* Text */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Welcome Back
          </h2>
          <p className="text-sm md:text-base opacity-90">
            Login to manage and control your smart home devices.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-8 md:p-16">

        <div className="w-full max-w-xl">

          {/* Notification Toaster */}
          <NotificationToaster/>

          {/* Back Button */}
          <BackButton/>

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Login
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={submitHandler} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <span
                className="absolute right-4 top-12  cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}                // Show Password and Hide Password
              >
                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
              </span>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgotpassword")}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition duration-300"
            >
              Login
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
      </section>
    </>
  );
};

export default LoginPage;