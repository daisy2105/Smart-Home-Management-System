import React from "react";
import Logo from "../../assets/logo.png";

const Footer = () => {
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
        <ul className="flex gap-6 text-gray-300 dark:text-gray-400">
          <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            Home
          </li>
          <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            Features
          </li>
          <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            About
          </li>
          <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            Contact
          </li>
        </ul>
      </div>

      {/* Bottom copyright */}
      <div className="mt-6 pt-4 text-center text-gray-400 dark:text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Smart Home. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
