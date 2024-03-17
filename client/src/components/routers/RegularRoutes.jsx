import React from 'react'
import { useSelector } from 'react-redux'

import { Navigate } from 'react-router-dom'

import RegularUniversityLayout from '../Layout/SubLayout/RegularUniversityLayout'

export default function RegularRoutes() {
    const {selectedUniversity} = useSelector(state=>state.user)
  return (
    selectedUniversity?.university?.vertical === "REGULAR" ? <RegularUniversityLayout selectedUniversity={selectedUniversity} /> : <Navigate to ="/user/dashboard" />
  )
}
