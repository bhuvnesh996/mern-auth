import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import Admin from './pages/Admin';
import { useSelector } from 'react-redux';
import AdminNav from './components/AdminNav';
import AdminSidebar from './components/AdminSidebar';
import PublicRoute from './components/PublicRoutes';
import UserNav from './components/UserNav';
import UserSidebar from './components/UserSidebar';

import AdminDashboard from './pages/AdminDashboard';
import AdminCenter from './pages/AdminCenter';
import AdminCenterAdd from './pages/AdminCenterAdd';
import AdminUniversity from './components/AdminUniversity';
import AdminUniAdd from './pages/AdminUniAdd';
import AdminSession from './pages/AdminSession';
import AdminSessionCreate from './pages/AdminSessionCreate';
import AdminCourse from './pages/AdminCourse';
import AdminCourseCreate from './pages/AdminCourseCreate';
import Dashboard from './pages/User/dashboard';
import UserLayout from './components/Layout/UserLayout';
import { Children } from 'react';
import AdminLayout from './components/Layout/AdminLayout';

export default function App() {
  const { currentUser } = useSelector((state) => state.user);

  const RenderNavigation = () => {
    if (currentUser?.userType === 'admin') {
      return (
        < div className='template'>
            <AdminLayout>

            </AdminLayout>
        </div>
      );
    } else if (currentUser?.userType === 'user') {
      return (
        < div className=''>
            <UserLayout>

            </UserLayout>
        </div>
      );
    } else {
      return <div></div>; // Handle other user types or unauthenticated users
    }

  }

  return (
    <div>
    <BrowserRouter>

  
    
    <Routes>
      {/* Use PublicRoute for home */}
  
          
            {currentUser?.userType === 'admin' ? (
              <Route path='/' element={<Navigate to="/admin" />} />
            ) :  currentUser?.userType === 'user' ? (
                <Route path='/' element={< Navigate to="/user/dashboard" /> } />
            ):(
              <>
                <Route path='/' element={<SignIn />} />
                
              </>
            )}
         
      <Route path='/sign-up' element={<SignUp />} />     
      {currentUser?.userType === 'admin' ? 
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/university' element={<AdminUniversity/>} />
          <Route path = '/admin/university/add' element ={<AdminUniAdd />} />
          <Route path='/admin/center' element={<AdminCenter />} />
          <Route path='/admin/center/add' element= {<AdminCenterAdd />} />
          <Route path = '/admin/session' element = {<AdminSession />} />
          <Route path = '/admin/session/create' element ={<AdminSessionCreate />} />
          <Route path='/admin/course' element ={<AdminCourse />} />
          <Route path = '/admin/course/create' element = {<AdminCourseCreate />} />
        </Route> : null
      } 

      {currentUser?.userType === 'user' ?
          <Route element={<UserLayout />}>
            <Route path='/user/profile' element={<Profile />} />,
            <Route path = "/user/dashboard" element ={<Dashboard />} />
          </Route> : null
      }

           {/* Redirect admin if trying to access user route */}
           {currentUser?.userType === 'admin' && (
          <Route path='/user/*' element={<Navigate to="/admin" />} />
        )}

        {/* Redirect user if trying to access admin route */}
        {currentUser?.userType === 'user' && (
          <Route path='/admin/*' element={<Navigate to="/profile" />} />
        )}

        {/* Redirect to SignIn if no currentUser */}
        {!currentUser && <Route path='*' element={<Navigate to="/" />} />}

    </Routes>
   
  </BrowserRouter>
  </div>
  )
}
