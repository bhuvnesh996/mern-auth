import React from 'react'
import { useSelector } from 'react-redux'
import AdminLayout from '../Layout/AdminLayout'
import { Navigate } from 'react-router-dom'

export default function AdminRoutes() {
    const {currentUser} = useSelector(state=>state.user)
  return (
    currentUser?.userType === "admin" ? <AdminLayout /> : <Navigate to ="/user/dashboard" />
  )
}
