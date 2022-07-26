import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'



const ProtectedRoutes = ({ isLoggedIn }) => {
  return !isLoggedIn ? <Navigate to='/' /> : <Outlet />
}


export default ProtectedRoutes