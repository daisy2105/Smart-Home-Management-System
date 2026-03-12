import React from 'react'
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
        <main className="p-4">
            <Outlet />
        </main>
    </div>
  )
}
export default DashboardLayout