import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import unauthorized from "../assets/animation/unauthorized.json";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-centerbg-white text-gray-900 relative overflow-hidden">
      {/* Soft Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-purple-100/40 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Lottie Animation */}
        <div className="w-72 mx-auto">
          <Lottie animationData={unauthorized} loop />
        </div>

        {/* 404 Title */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mt-6">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>

        {/* Message */}
        <p className="text-gray-500 mt-4 text-lg leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved.
          <br />
          Let’s get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <button 
            onClick={() => navigate(-1)} 
            className="px-7 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-300">
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-7 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 font-medium">
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
