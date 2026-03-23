import React, { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import DeviceCard from './DeviceCard/DeviceCard'
import DeviceForm from '../../../Features/Devices/DeviceForm/DeviceForm'
import ManageDevice from '../../../Features/Devices/ManageDevice/ManageDevice'

const HomeownerDashboard = () => {
  const { UserDetail } = useContext(UserContext)
  const name = UserDetail?.name 

  return (
    <div className='flex flex-col gap-8 m-5 dark:text-white'>
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Welcome, {name} !
        </h1>
        <p className="text-gray-500 text-sm md:text-base dark:text-gray-300">
          Your smart home dashboard
        </p>
      </div>
      {/* DEVICE SUMMARY */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-2">
        <DeviceCard />
      </div>

      {/* DEVICE FORM */}
      <div className=" dark:bg-gray-900 rounded-2xl p-2">
        <DeviceForm />
      </div>

      {/* MANAGE DEVICE */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-2">
        <ManageDevice />
      </div>
    </div>
  )
}

export default HomeownerDashboard