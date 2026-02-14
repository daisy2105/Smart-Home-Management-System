import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPageLayout from '../Layout/LandingPage/LandingPageLayout';
import HomePage from '../pages/LandingPages/HomePage';
import AboutUs from '../pages/LandingPages/AboutUsPage';
import FeaturePage from '../pages/LandingPages/FeaturePage';
import HelpPage from '../pages/LandingPages/HelpPage';

const AppRoute = () => {
  return (
    <Routes>
        <Route element={<LandingPageLayout/>}>
            <Route path="/" element={<HomePage/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            <Route path="/feature" element={<FeaturePage/>} />
            <Route path="/helpcenter" element={<HelpPage/>} />
        </Route>
    </Routes>
  )
}

export default AppRoute