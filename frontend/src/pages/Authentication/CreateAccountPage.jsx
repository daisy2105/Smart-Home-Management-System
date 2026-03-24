import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import toast from "react-hot-toast";
import { createAccount, getUserDetail } from "../../service/authService.js";
import logo from "../../assets/logo.png";
import { Eye, EyeOff } from "lucide-react";
import Loading from '../../components/UI/Loading.jsx';
import NotificationToaster from "../../components/UI/NotificationToaster.jsx";
import SecurityAnimation from "../../components/UI/SecurityAnimation.jsx";
import BackButton from "../../components/Button/BackButton.jsx";

const CreateAccountPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { SignUpUser, setUserDetail } = useContext(UserContext);
  const [loading, setLoading] = useState(false);                //Loading animation state
  const [showPassword, setShowPassword] = useState(false);      // Show Password State

  const UserEmail = sessionStorage.getItem("Email")             // Get Email From Session Storage 
  const emailValue = SignUpUser?.UserEmail || UserEmail;        // If Context Refresh then get Email from Session Storage

  useEffect(() => {
    const verified = sessionStorage.getItem("otpVerified");     // Get Email From Session Storage

    if (verified) {
      toast.success("OTP verified successfully!");
      sessionStorage.removeItem("otpVerified");               // Remove Stored OTP Status (True or False value only Present in Storage)
    }
  }, []);

  useEffect(() => {                                         // Protect route: redirect to signup if email is not available 
    if (!emailValue) {
      navigate("/signup", { replace: true });
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const cleanPassword = password.trim();                  // Remove Extra Spaces of password
    
    if (cleanPassword.length < 8) {                         // Check Password length Must be 8 char
      toast.error("Password must be at least 8 characters with special and numeric character");
      return;
    }

    setLoading(true);                                        // Start loading animation
    try {
      const response = await createAccount({            // Send email, name, password, and role to backend for account creation
        email: emailValue,       
        name,
        password: cleanPassword,
        role,
      });

      const userData = await getUserDetail()      // Get UserDetails from DB through backend and store in Context 
      setUserDetail(userData)                    // Add User Data in context for Future use
      sessionStorage.removeItem("Email");
      navigate("/dashboard", { replace: true });
      
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Password must be at least 8 characters with special and numeric character");
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

      <section className="h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="gap-10 lg:gap-0 md:w-1/2 w-full flex flex-col justify-between p-8 bg-linear-to-br from-blue-600 to-violet-600 text-white">

        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-12 md:h-14" />
          <h1 className="text-xl md:text-2xl font-bold">Smart Home</h1>
        </div>

        {/* Left Side Loitte Animation */}
        <SecurityAnimation/>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Complete Your Registration
          </h2>
          <p className="text-sm md:text-base opacity-90">
            Provide your details to finish setting up your account.
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
            Fill in the information below to continue.
          </p>

          <form onSubmit={submitHandler} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={emailValue || ""}
                readOnly
                className="w-full px-5 py-4 text-lg rounded-xl border border-gray-300 bg-gray-100"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <span
                className="absolute right-4 top-12  cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}                          // Show Password and Hide Password
              >
                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
              </span>
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>

              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="appearance-none w-full px-5 py-4 text-lg rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                >
                  <option value="">Choose your role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="HOMEOWNER">Homeowner</option>
                  <option value="TECHNICIAN">Technician</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                  ▼
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition duration-300"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
      </section>
    </>
  );
};

export default CreateAccountPage;