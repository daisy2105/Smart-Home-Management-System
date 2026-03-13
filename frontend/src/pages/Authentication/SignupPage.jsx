import React, { useState, useContext } from 'react';
import { sendOtp } from '../../service/authService.js';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext.jsx';
import logo from '../../assets/logo.png';
import toast from "react-hot-toast";
import Loading from '../../components/UI/Loading.jsx';
import SecurityAnimation from '../../components/UI/SecurityAnimation.jsx';
import NotificationToaster from '../../components/UI/NotificationToaster.jsx';
import BackButton from '../../components/Button/BackButton.jsx';

const SignupPage = () => {
  const [ email , setEmail] = useState('');
  const [loading, setLoading] = useState(false);          //Loading animation state
  const { setUserDetail } = useContext(UserContext);      // Access setEmailInput from context
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);                                      // Start loading animation

    try {
      const cleanEmail = email.trim().toLowerCase();      // remove extra spaces of the email
      const response = await sendOtp({ email: cleanEmail });

      sessionStorage.setItem("Email",cleanEmail)          // Store email in session storage
      sessionStorage.setItem("otpSent", "true");          // Save email and OTP status to handle notification after page refresh/navigation
      setUserDetail({UserEmail:cleanEmail});              // Store email in context for later use
      
      navigate("/verification");                // Redirect to OTP verification page
    } catch (error) {
        if (error.response?.status === 409) {
          toast.error("Email already exists. Please login.");
        } else if (error.response?.status === 400) {
          toast.error("Invalid email address.");
        } else {
          toast.error("Something went wrong. Try again later.");
        }
    }finally {
      setLoading(false);             // Stop loading animation
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

        {/*left side lottie Animation */}
        <SecurityAnimation/>

        {/* Text */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Welcome to Smart Home Management System
          </h2>
          <p className="text-sm md:text-base opacity-90">
            Manage your smart home devices with ease and convenience.
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
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your email address to receive a verification OTP.
          </p>

          <form onSubmit={submitHandler} className="space-y-6">

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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition duration-300"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
      </section>
    </>
  );
};

export default SignupPage;