import React from 'react'
import { useSelector } from 'react-redux'

import { Navigate } from 'react-router-dom'


import DistanceUniversityLayout from '../Layout/SubLayout/DistanceUniversityLayout'

export default function DistanceRoutes() {
    const {selectedUniversity} = useSelector(state=>state.user)
  return (
    selectedUniversity?.university?.vertical === "DISTANCE" ? <DistanceUniversityLayout selectedUniversity={selectedUniversity} /> : <Navigate to ="/user/dashboard" />
  )
}
