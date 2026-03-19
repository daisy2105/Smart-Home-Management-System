import React from "react";
import { User, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const DashboardNavbar = ({setIsMenuOpen}) => {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-neutral-950 p-3 shadow-md">

      {/* Left - Logo / Title */}
      <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
        <button className="md:hidden"
            onClick={() => setIsMenuOpen(true)}>
            <Menu />
        </button>
        <img src={logo} className="w-10 sm:w-12" alt="Logo" />
        <h1 className="sm:block text-lg md:text-2xl">
          Smart Home Dashboard
        </h1>
      </div>

      {/* RIGHT — Icons */}
      <div className="flex items-center gap-4 sm:gap-6">

        {/* Notification */}
        <Link to="notification" className=" p-2 rounded-lg  hover:bg-gray-100 dark:hover:bg-neutral-900 transition">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>

        {/* Profile */}
        <Link to="profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 transition group ">
          <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />

          <span className="hidden sm:block text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
            Profile
          </span>
        </Link>

      </div>
    </div>
  );
};

export default DashboardNavbar;