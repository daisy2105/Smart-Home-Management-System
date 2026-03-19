import React, { useContext } from "react";
import { User, Mail, ShieldCheck } from "lucide-react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { UserDetail } = useContext(UserContext);

  const name = UserDetail?.name;
  const role = UserDetail?.role;
  const email = UserDetail?.email;

  const handleLogout = async () => {
    try {
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-3 sm:px-6 lg:px-8 py-4 sm:py-6">

      <div className="bg-white dark:bg-neutral-950 shadow-xl rounded-2xl w-full max-w-4xl p-4 sm:p-8 border border-gray-200 dark:border-neutral-800">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-center sm:text-left">
          
          {/* Icon  */}
          <div className="mx-auto sm:mx-0 p-3 bg-gray-100 dark:bg-neutral-900 rounded-full">
            <User className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
              My Profile
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Manage your account information
            </p>
          </div>
        </div>

        {/* PROFILE DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">

          {/* NAME */}
          <div className="flex items-center gap-3 sm:gap-4 bg-gray-100 dark:bg-neutral-900 p-3 sm:p-5 rounded-xl border border-transparent hover:border-indigo-400/40 transition">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />

            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Name
              </p>
              <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                {name || "User Name"}
              </p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-3 sm:gap-4 bg-gray-100 dark:bg-neutral-900 p-3 sm:p-5 rounded-xl border border-transparent hover:border-emerald-400/40 transition">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />

            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white break-all">
                {email || "user@email.com"}
              </p>
            </div>
          </div>

          {/* ROLE */}
          <div className="flex items-center gap-3 sm:gap-4 bg-gray-100 dark:bg-neutral-900 p-3 sm:p-5 rounded-xl border border-transparent hover:border-violet-400/40 transition">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600 dark:text-violet-400 shrink-0" />

            <div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Role
              </p>
              <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                {role}
              </p>
            </div>
          </div>

        </div>

        {/* LOGOUT BUTTON */}
        <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2 text-sm sm:text-base rounded-lg font-medium bg-gray-900 text-white dark:bg-white dark:text-black hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;