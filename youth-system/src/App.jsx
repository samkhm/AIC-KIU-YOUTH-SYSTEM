import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import RoleDashboard from './pages/RoleDashboard'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Auth from './pages/auth_pages/Auth'
import { Toaster } from 'sonner'
import CornfirmEmail from './pages/auth_pages/password_reset/CornfirmEmail'
import PasswordReset from './pages/auth_pages/password_reset/PasswordReset'
import BgImage from "@/img/bg-church.svg"

export default function App() {
  return (
    <div>
        <img
      src={BgImage}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
  <BrowserRouter>
    <Toaster richColors position='top-center' />
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard'/>}/>
      <Route path='/login' element={<Auth/>} />
      <Route path='/cornfirm_password' element={ <CornfirmEmail />} />
      <Route path='/reset_password' element={ <PasswordReset />}/>
      <Route path='/register' element={<Navigate to="/auth" />}/>
      <Route 
        path='/dashboard'
        element={
          <ProtectedRoutes>
            <RoleDashboard/>
          </ProtectedRoutes>
        }
       />
    </Routes>
  </BrowserRouter>
  </div>
  )
}
