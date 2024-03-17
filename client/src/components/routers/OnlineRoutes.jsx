import React from 'react'
import { useSelector } from 'react-redux'
import AdminLayout from '../Layout/AdminLayout'
import { Navigate } from 'react-router-dom'
import OnlineUniversityLayout from '../Layout/SubLayout/OnlineUniversityLayout'

export default function OnlineRoutes() {
    const {selectedUniversity} = useSelector(state=>state.user)
  return (
    selectedUniversity?.university?.vertical === "ONLINE" ? <OnlineUniversityLayout selectedUniversity={selectedUniversity} /> : <Navigate to ="/user/dashboard" />
  )
}
