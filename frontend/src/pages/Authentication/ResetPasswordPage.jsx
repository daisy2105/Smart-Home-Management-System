import React, { useState, useEffect } from "react";
import { resetPassword } from "../../service/authService.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Loading from '../../components/UI/Loading.jsx';
import SecurityAnimation from "../../components/UI/SecurityAnimation.jsx";
import NotificationToaster from "../../components/UI/NotificationToaster.jsx";
import BackButton from "../../components/Button/BackButton.jsx";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);          //Loading animation state
  const token = searchParams.get("token");                // Get token from URL query parameters

  useEffect(() => {
  if (!token) {                                           // If Token isn't present then send back user to login page
    toast.error("Invalid or expired reset link.");
    navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {               // Frontend validation password and confirm password should not be empty
      toast.error("Please fill all fields.");
      return;
    }
    
    if (newPassword !== confirmPassword) {              // Check is password matc to confirm password or not
      toast.error("Passwords do not match.");
      return;
    }
    
    setLoading(true);                                      // Start loading animation
    
    try {
      const response = await resetPassword({token, newPassword});           //send token and new password to backend
      toast.success("Password reset successful! Please log in with your new password.");

      navigate("/login", { replace: true });               // redirect after success
    } catch (error) {
        toast.error("Password must be at least 8 characters with special and numeric character");
    } finally {
      setLoading(false);                                    // Stop loading animation
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
            Reset Your Password
          </h2>
          <p className="text-sm md:text-base opacity-90">
            Secure your account by creating a strong new password.
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
            Reset Password
          </h2>

          <form onSubmit={submitHandler} className="space-y-6">

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="text"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

              {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition duration-300"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
      </section>
    </>
  );
};

export default ResetPasswordPage;