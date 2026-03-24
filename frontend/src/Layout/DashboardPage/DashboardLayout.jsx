import React, { useState, useContext} from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/SideBar/SideBar";
import DashboardNavbar from "../../components/Dashboard/DashboardNavbar/DashboardNavbar";
import { UserContext } from "../../context/UserContext";

const DashboardPage = () => {
  const { UserDetail } = useContext(UserContext);
  const UserRole = UserDetail?.role;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar                                          //SideBar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        role={UserRole}
      />
      <div className="flex flex-col w-full h-full">
        <DashboardNavbar                                 //DashboardNavbar
          setIsMenuOpen={setIsMenuOpen}
        />
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />                                    
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;