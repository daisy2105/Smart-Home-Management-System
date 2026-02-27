import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPageLayout from '../Layout/LandingPage/LandingPageLayout';
import AuthenticationPage from '../Layout/AuthenticationPage/AuthenticationPage';
import SignupPage from '../pages/Authentication/SignupPage';
import HomePage from '../pages/LandingPages/HomePage';
import AboutUs from '../pages/LandingPages/AboutUsPage';
import FeaturePage from '../pages/LandingPages/FeaturePage';
import HelpPage from '../pages/LandingPages/HelpPage';
import VerificationPage from '../pages/Authentication/VerificationPage';
import CreateAccountPage from '../pages/Authentication/CreateAccountPage';
import LoginPage from '../pages/Authentication/LoginPage';
import ResetPasswordPage from '../pages/Authentication/ResetPasswordPage';
import ForgetPasswordPage from '../pages/Authentication/ForgetPasswordPage';

const AppRoute = () => {
  return (
    <Routes>
        <Route element={<LandingPageLayout/>}>
            <Route path="/" element={<HomePage/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            <Route path="/feature" element={<FeaturePage/>} />
            <Route path="/helpcenter" element={<HelpPage/>} />
        </Route>
        <Route element={<AuthenticationPage/>}>
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/verification" element={<VerificationPage/>} />
            <Route path="/createaccount" element={<CreateAccountPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/reset-password" element={<ResetPasswordPage/>} />
            <Route path="/forgotpassword" element={<ForgetPasswordPage/>} />
        </Route>
    </Routes>
  )
}

export default AppRoute