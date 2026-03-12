import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../service/authService.js";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import Loading from '../../components/UI/Loading.jsx'; 
import NotificationToaster from "../../components/UI/NotificationToaster.jsx";
import SecurityAnimation from "../../components/UI/SecurityAnimation.jsx";
import BackButton from "../../components/Button/BackButton.jsx";

const VerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);          // Loading animation state
  const { SignUpUser } = useContext(UserContext);         // Access email from context
  const navigate = useNavigate();

  const UserEmail = sessionStorage.getItem("Email")       // Get Email in session storage
  const emailValue = SignUpUser?.UserEmail || UserEmail;
  
  useEffect(() => {
    const otpSent = sessionStorage.getItem("otpSent");    // Read stored OTP status to control notification display

    if (otpSent) {
      toast.success("OTP sent successfully!");
      sessionStorage.removeItem("otpSent");              // Remove Stored OTP Status (True or False value only Present in Storage)
    }
  }, []);

  useEffect(() => {                                     // Protect route: redirect to signup if email is not available            
    if (!emailValue) {
      navigate("/signup", { replace: true });
    }
  }, [emailValue, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const cleanOtp = otp.trim()                       // Remove Extra Spaces 

    if (cleanOtp.length !== 6) {                      // Check length Of OTP
      toast.error("OTP must be 6 digits");
      return;
    }

    setLoading(true);                                // Start loading animation

    try {
      const response = await verifyOtp({
        email: emailValue,                            // Used User Email Through the Context
        otp: cleanOtp
      });

      sessionStorage.setItem("otpVerified", "true");    // Save email and OTP status to handle notification after page refresh/navigation
      navigate("/createaccount");                       // Redirect to create account page
    } catch (error) {
      if (error.response?.status === 400) {             // Check if backend returns 401 for incorrect OTP
        toast.error("Incorrect OTP. Please try again.");
      } else if(error.response?.status === 401){        // Check if OTP is expired or not
        toast.error("OTP Expired. Plase verify Email Again")
      }else {
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
            Secure Verification
          </h2>
          <p className="text-sm md:text-base opacity-90">
            Enter the OTP sent to your registered email address.
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
            Verify OTP
          </h2>

          <p className="text-gray-500 mb-8">
            Please enter the verification code sent to your email.
          </p>

          <form onSubmit={submitHandler} className="space-y-6">

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={emailValue || ""}     //User Email from session storage
                readOnly
                className="w-full px-5 py-4 text-lg rounded-xl border border-gray-300 bg-gray-100"
              />
            </div>

            {/* OTP Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
      </section>
    </>
  );
};

export default VerificationPage;