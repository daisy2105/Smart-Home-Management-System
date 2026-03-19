import React, { useState } from "react";
import { Home, Cpu, User, Menu, X, Moon, Sun, Battery, Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import DarkModeButton from "../../Button/DarkModeButton";

const SideBar = ({ isMenuOpen, setIsMenuOpen, role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const menuItems = {
    HOMEOWNER: [
      { name: "Dashboard", path: "", icon: <Home size={20} /> },
      { name: "My Devices", path: "mydevices", icon: <Cpu size={20} /> },
      { name: "Energy Usage", path: "energyusage", icon: <Battery size={20} /> },
      { name: "Profile", path: "profile", icon: <User size={20} /> },
    ],
    TECHNICIAN: [
      { name: "Dashboard", path: "", icon: <Home size={20} /> },
      { name: "Issues", path: "allissues", icon: <Bell size={20} /> },
      { name: "Profile", path: "profile", icon: <User size={20} /> },
    ],
    ADMIN: [
      { name: "Dashboard", path: "", icon: <Home size={20} /> },
      { name: "Manage Users", path: "manageusers", icon: <User size={20} /> },
      { name: "Manage Devices", path: "managedevices", icon: <Cpu size={20} /> },
      { name: "Settings", path: "settings", icon: <Settings size={20} /> },
    ],
  };

  const currentMenu = menuItems[role];

  return (
    <section
      className={`fixed md:relative h-screen bg-white dark:bg-neutral-950 text-gray-900 dark:text-white border-r border-gray-200 dark:border-neutral-800 flex flex-col transition-all duration-300 shadow-sm
        ${isOpen ? "md:w-64" : "md:w-16"}
        ${isMenuOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* TOP BUTTONS */}
      <div className="flex items-center justify-between p-4">
        <div className="hidden md:block cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </div>
        <div className="md:hidden cursor-pointer" onClick={() => setIsMenuOpen(false)}>
          <X />
        </div>
      </div>

      {/* MENU */}
      <ul className="flex flex-col gap-1 px-2">
        {currentMenu.map((item) => (
          <Link key={item.name} to={item.path}>
            <li className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-900 hover:text-indigo-600 dark:hover:text-indigo-400 ">
              <span className="text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {item.icon}
              </span>

              {(isOpen || isMenuOpen) && (
                <span className="whitespace-nowrap font-medium">
                  {item.name}
                </span>
              )}
            </li>
          </Link>
        ))}
      </ul>

      {/* DARK MODE TOGGLE */}
      <div className="mt-auto p-3">
        <div
          className="flex items-center gap-4 px-2 py-2 rounded-lg bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-neutral-800 transition cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <Sun className="text-amber-500" />
          ) : (
            <Moon className="text-indigo-500" />
          )}

          {(isOpen || isMenuOpen) && (
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>

              <DarkModeButton
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SideBar;