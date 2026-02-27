import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import toast, { Toaster } from "react-hot-toast";
import { createAccount } from "../../Service/authService.js";
import logo from "../../assets/logo.png";
import Lottie from "lottie-react";
import { Eye, EyeOff } from "lucide-react";
import animationData from "../../assets/animation/DataPrivacy.json.json";
import Loading from '../../assets/animation/loading.json.json';

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { email } = useContext(UserContext);
  const [loading, setLoading] = useState(false);          //Loading animation state
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
  toast.success("OTP verified Successfully ");       //Show Notification if OTP is correct 
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await createAccount({             // Send email, name, password, and role to backend for account creation
        email,
        name,
        password,
        role,
      });

      setLoading(true);                                      // Start loading animation

    const userRole = response.role?.toLowerCase();           // changing role textcase into lowercase

    if (userRole === "homeowner") {                         // Redirect based on role
      navigate("/homeowner/dashboard");
    } else if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else if (userRole === "technician") {
      navigate("/technician/dashboard");
    } else {
      toast.error("Unknown user role");
    }
    } catch (error) {
      if (error.response?.status === 400) {
        console.error("Account creation failed:", error.response.data);
        toast.error("Account creation failed. Please check your details and try again.");
      } else {
        console.error("An error occurred:", error);
        toast.error("Something went wrong. Try again later.");
      }
    }finally {
      setLoading(false);             // Stop loading animation
    }
  };

  return (
    <>
    {/* Loading animation */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
          <div className="w-70">
            <Lottie
              animationData={Loading}   
              loop={true}
            />
          </div>
        </div>
      )}

      <section className="h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="gap-10 lg:gap-0 md:w-1/2 w-full flex flex-col justify-between p-8 bg-linear-to-br from-blue-600 to-violet-600 text-white">

        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-12 md:h-14" />
          <h1 className="text-xl md:text-2xl font-bold">Smart Home</h1>
        </div>

        <div className="hidden lg:flex justify-center items-center my-10">
          <Lottie
            animationData={animationData}
            loop
            className="w-64 md:w-96"
          />
        </div>

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
          <Toaster position="top-right" containerStyle={{
            top: "5%", 
            right: "15%",
            }}/>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 text-blue-600 font-medium hover:underline flex items-center gap-2"
          >
            ← Back
          </button>

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
                value={email}
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
                onClick={() => setShowPassword(!showPassword)}
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

            <button
              type="submit"
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