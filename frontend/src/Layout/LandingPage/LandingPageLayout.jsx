import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const LandingPageLayout = () => {
  return (
   <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default LandingPageLayout