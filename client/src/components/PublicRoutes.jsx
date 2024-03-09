import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import Header from './Header'

export default function PublicRoute() {
    const {currentUser} = useSelector(state => state.user)
  return currentUser ?  <Navigate to='/'/> : <Outlet/>  
}
