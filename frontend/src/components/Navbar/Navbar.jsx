import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-sky-600 font-medium border-b-2 border-sky-600 pb-1"
      : "text-black dark:text-white hover:text-sky-600";

  return (
    <div className="w-full bg-transparent dark:bg-transparent backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-colors duration-300">
      
      <div className="h-14 md:h-18 px-6 md:px-8 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="h-8 md:h-12" />
          <h1 className="text-lg md:text-3xl text-black dark:text-white font-medium">
            Smart Home
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex text-[17px] space-x-10">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/feature" className={navLinkClass}>Feature</NavLink></li>
          <li><NavLink to="/aboutus" className={navLinkClass}>About Us</NavLink></li>
          <li><NavLink to="/helpcenter" className={navLinkClass}>Help Center</NavLink></li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-6">
          <NavLink 
            to="/login" 
            className="px-5 py-2 bg-white dark:bg-slate-800 text-blue-500 dark:text-blue-400 font-medium rounded-lg shadow hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          >
            Login
          </NavLink>

          <NavLink 
            to="/signup" 
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X size={28} className="text-black dark:text-white" />
            ) : (
              <Menu size={28} className="text-black dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-white theme-dark:bg-slate-900 shadow-md px-6 py-4 space-y-4 transition-colors duration-300">
          
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/feature" className={navLinkClass} onClick={() => setIsOpen(false)}>Feature</NavLink>
          <NavLink to="/aboutus" className={navLinkClass} onClick={() => setIsOpen(false)}>About Us</NavLink>
          <NavLink to="/helpcenter" className={navLinkClass} onClick={() => setIsOpen(false)}>Help Center</NavLink>

          <div className="flex flex-col space-y-3 pt-4">
            <NavLink 
              to="/login" 
              onClick={() => setIsOpen(false)} 
              className="px-5 py-2 text-center bg-white theme-dark:bg-slate-800 text-blue-500 dark:text-blue-400 font-semibold rounded-lg shadow hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              Login
            </NavLink>

            <NavLink 
              to="/signup" 
              onClick={() => setIsOpen(false)} 
              className="px-5 py-2 text-center bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
            >
              Sign Up
            </NavLink>
          </div>

        </div>
      )}
    </div>
  );
};

export default Navbar;
