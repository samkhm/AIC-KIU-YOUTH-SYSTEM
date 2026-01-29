import React from 'react'
import { getUserRole } from '@/utils/auth'
import AdminBoard from './adminDashboard/AdminBoard'
import UserBoard from './userDashboard/UserBoard'
import { Navigate } from "react-router-dom"

export default function RoleDashboard() {
    const userRole = getUserRole();
    if(!userRole){
        return <Navigate to='/login' replace/>
    } 

    switch(userRole){
        case 'admin':
            return <AdminBoard/>;
        case 'moderator':
            return <AdminBoard/>;
        case 'user':
            return <UserBoard/>
        default:
            return <Navigate to='/login' replace/>
    }
}
