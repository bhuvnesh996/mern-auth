import React from 'react'
import { signOut } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function UserNav() {
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
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-semibold">User Dashboard</h1>
        {/* Add your navigation links here */}
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">About</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300"onClick={handleSignOut} >Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

