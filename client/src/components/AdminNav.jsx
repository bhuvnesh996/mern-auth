import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
import { Outlet } from 'react-router-dom';
import Logo from '../public/Images/Logo.png'
const AdminNav = () => {
    const dispatch =  useDispatch()
    const handleSignOut = async () => {
        try {
          await fetch('/api/auth/signout');
          dispatch(signOut())
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
    <nav className="bg-sidebar-image bg-cover bg-center p-4">
      <div className="container mx-auto flex justify-between items-center">
       
        <img className='w-[100px] h-[30px]'  src={Logo} />
        {/* Add your navigation links here */}
        <ul className="flex space-x-4">
       
          <li className=''>
            <a href="#" className="text-white font-bold" onClick={handleSignOut}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
      <main><Outlet /></main>
    </div>
  );
};

export default AdminNav;
