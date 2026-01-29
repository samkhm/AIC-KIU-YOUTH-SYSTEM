import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from './pages/auth_pages/login/Login'
import Signup from './pages/auth_pages/register/Signup'
import RoleDashboard from './pages/RoleDashboard'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { Toaster } from 'sonner'

export default function App() {
  return (
  <BrowserRouter>
    <Toaster richColors position='top-center' />
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard'/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Signup/>}/>
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
  )
}
