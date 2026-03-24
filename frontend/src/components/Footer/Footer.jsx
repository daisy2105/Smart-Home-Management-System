import React from "react";
import Logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-sky-600 font-medium "
      : "text-white hover:text-sky-600";
  return (
    <footer className="bg-black dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
        <img src={Logo} alt="logo" className="h-8 md:h-12" />
        <div className="text-2xl font-bold text-white dark:text-white">
          Smart Home
        </div>
        </div>
        {/* Navigation Links */}
        <ul className="hidden md:flex text-[17px] space-x-10">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/feature" className={navLinkClass}>Feature</NavLink></li>
          <li><NavLink to="/aboutus" className={navLinkClass}>About Us</NavLink></li>
          <li><NavLink to="/helpcenter" className={navLinkClass}>Help Center</NavLink></li>
        </ul>
      </div>

      {/* Bottom copyright */}
      <div className="mt-6 pt-4 text-center text-gray-400 dark:text-gray-500 text-sm">
        &copy; 2026 Smart Home. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
