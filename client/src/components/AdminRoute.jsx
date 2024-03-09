import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import AdminNav from './AdminNav'

export default function AdminRoute() {
    const {currentUser} = useSelector(state => state.user)
  return currentUser.userType==="admin" ? <AdminNav > <Outlet/> </AdminNav> : <Navigate to='/sign-in'/>
}
