import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPageLayout from '../Layout/LandingPage/LandingPageLayout';
import AuthenticationPage from '../Layout/AuthenticationPages/AuthenticationPages';
import SignupPage from '../pages/Authentication/SignupPage';
import HomePage from '../pages/LandingPages/HomePage';
import AboutUs from '../pages/LandingPages/AboutUsPage';
import FeaturePage from '../pages/LandingPages/FeaturePage';
import HelpPage from '../pages/LandingPages/HelpPage';
import VerificationPage from '../pages/Authentication/VerificationPage';
import CreateAccountPage from '../pages/Authentication/CreateAccountPage';
import LoginPage from '../pages/Authentication/LoginPage';
import ResetPasswordPage from '../pages/Authentication/ResetPasswordPage';
import ForgetPasswordPage from '../pages/Authentication/ForgotPasswordPage';
import UnauthorizePage from '../pages/UnauthorizePage'

const AppRoute = () => {
  return (
    <Routes>
      <Route element={<LandingPageLayout/>}>
        <Route path="/" element={<HomePage/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/feature" element={<FeaturePage/>} />
        <Route path="/helpcenter" element={<HelpPage/>} />
      </Route>

        {/* Authentication Routes */}
        <Route element={<AuthenticationPage/>}>
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/verification" element={<VerificationPage/>} />
          <Route path="/createaccount" element={<CreateAccountPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/reset-password" element={<ResetPasswordPage/>} />
          <Route path="/forgotpassword" element={<ForgetPasswordPage/>} />
        </Route>

          {/* Role Based Access */}
        {/* <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["admin","homeowner","technician"]}>
            <RoleBasedRedirect />
          </ProtectedRoute>
        }/> */}

          {/* Private Route only Authorize User Can Access Specifice Pages */}
        {/* <Route path='/homeowner/dashboard' element={<ProtectedRoute allowedRoles={["homeowner"]}><DashboardPage/></ProtectedRoute>}>
            <Route index element={<HomeOwnerDashboard />}/>
        </Route>
        <Route path='/admin/dashboard' element={<ProtectedRoute allowedRoles={["admin"]}><DashboardPage/></ProtectedRoute>}>
            <Route index element={<AdminDashboard />}/>
        </Route>
        <Route path='/technician/dashboard' element={<ProtectedRoute allowedRoles={["technician"]}><DashboardPage/></ProtectedRoute>}>
            <Route index element={<TechnicianDashboard />}/>
        </Route> */}
        <Route path='/unauthorized' element={<UnauthorizePage/>}/>
    </Routes>
  )
}

export default AppRoute