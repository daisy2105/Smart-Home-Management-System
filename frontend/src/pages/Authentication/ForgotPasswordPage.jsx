import React, { useState, Navigate } from "react";
import { forgotPassword} from "../../service/authService"
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import Loading from '../../components/UI/Loading';
import BackButton from "../../components/Button/BackButton";
import NotificationToaster from "../../components/UI/NotificationToaster";
import SecurityAnimation from "../../components/UI/SecurityAnimation";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);          //Loading animation state

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);                                      // Start loading animation

    try {
      const response = await forgotPassword({ email });     // Send email to backend 
      toast.success("Reset Password Mail sent successfully! Please check your email.");
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("If an account exists, reset email has been sent.");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    } finally {
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

        {/* Left Side Lottie Animation */}
        <SecurityAnimation/>

        {/* Text */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Forgot Your Password?
          </h2>
          <p className="text-sm md:text-base opacity-90">
            Enter your registered email and we’ll send you a reset OTP.
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
            Forgot Password
          </h2>

          <p className="text-gray-500 mb-8">
            We will send a verification code to your email.
          </p>

          <form onSubmit={submitHandler} className="space-y-6">

            {/* Email Field */}
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
              Send Reset Mail
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Remember your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Back to Login
            </span>
          </p>
        </div>
      </div>
      </section>
    </>
  );
};

export default ForgotPasswordPage;