import React from 'react'
import { useSelector } from 'react-redux'

import { Navigate } from 'react-router-dom'

import CenterLayout from '../Layout/SubLayout/CenterLayout'

export default function UserRoutes() {
    const {currentUser} = useSelector(state=>state.user)
  return (
    currentUser?.userType === "user" ? <CenterLayout  /> : <Navigate to ="/" />
  )
}
