import { BrowserRouter, Routes, Route, Navigate, Outlet, redirect } from 'react-router-dom';
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
import Dashboard from './pages/User/Dashboard';
import UserLayout from './components/Layout/UserLayout';
import { Children } from 'react';
import AdminLayout from './components/Layout/AdminLayout';
import AdminAssignUni from './pages/AdminAssignUni';
import ChangeUniversity from './pages/User/ChangeUniversity';
import AdminNews from './pages/AdminNews';
import DistanceDashboard from './pages/Distance/DistanceDashboard';
import OnlineDashboard from './pages/Online/OnlineDashboard';
import RegularDashboard from './pages/Regular/RegularDashboard';
import AdminRoutes from './components/routers/AdminRoutes';
import UserRoutes from './components/routers/UserRoutes';
import OnlineRoutes from './components/routers/OnlineRoutes';
import RegularRoutes from './components/routers/RegularRoutes';
import DistanceRoutes from './components/routers/DistanceRoutes';
import Adminform from './pages/Adminform';
import AdminFormCreate from './pages/AdminFormCreate';
import DistanceApplyForm from './pages/Distance/DistanceApplyForm';

export default function App() {
  const { currentUser,selectedUniversity  } = useSelector((state) => state.user);
  console.log(selectedUniversity==null)
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
      
        <Route element={<AdminRoutes />}>
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/university' element={<AdminUniversity/>} />
          <Route path = '/admin/university/add' element ={<AdminUniAdd />} />
          <Route path= '/admin/university/form' element ={<Adminform />} />
          <Route path= '/admin/university/form/create' element ={<AdminFormCreate />} />
          <Route path='/admin/center' element={<AdminCenter />} />
          <Route path='/admin/center/add' element= {<AdminCenterAdd />} />
          <Route path = '/admin/session' element = {<AdminSession />} />
          <Route path = '/admin/session/create' element ={<AdminSessionCreate />} />
          <Route path='/admin/course' element ={<AdminCourse />} />
          <Route path = '/admin/course/create' element = {<AdminCourseCreate />} />
          <Route path='/admin/university/assign' element = {<AdminAssignUni />} />
          <Route path='/admin/news' element = {<AdminNews/>} />
        </Route> 
  

            
     
        <Route element ={< UserRoutes/>}>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/changeUniversity" element={<ChangeUniversity />} />
        </Route>
        <Route element ={< OnlineRoutes/>}>
            <Route path="/online/dashboard" element={<OnlineDashboard />} />
           
        </Route>
        <Route element ={< RegularRoutes/>}>
            <Route path="/regular/dashboard" element={<RegularDashboard/>} />
           
        </Route>
        <Route  element = {<DistanceRoutes />}>
              <Route path ="/distance/dashboard" element= {<DistanceDashboard />} />
              <Route path ="/distance/apply" element ={ <DistanceApplyForm />} />

        </Route>
        
     
          {selectedUniversity ? 
            <Route path='/user/*' element={<Navigate to={`/${selectedUniversity.university.vertical.toLowerCase()}/dashboard`} />} />
            : null
          }

           {currentUser?.userType === 'admin' && (
          <Route path='/user/*' element={<Navigate to="/admin" />} />
        )}

        {/* Redirect user if trying to access admin route */}
        {currentUser?.userType === 'user' && (
          <Route path='/admin/*' element={<Navigate to="/user/dashboard" />} />
        )}
    
        
        {/* Redirect to SignIn if no currentUser */}
        {!currentUser && <Route path='*' element={<Navigate to="/" />} />}

        

    </Routes>
   
  </BrowserRouter>
  </div>
  )
}
