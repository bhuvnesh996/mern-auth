import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/user/userSlice';

function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const {currentUser} = useSelector(state=>state.user)
  const dispatch =  useDispatch()
  const handleSignOut = async () => {
      try {
        await fetch('/api/auth/signout');
        dispatch(signOut())
      } catch (error) {
        console.log(error);
      }
    };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Dropdown button */}
      <button
        id="dropdownInformationButton"
        onClick={toggleDropdown}
        className="text-black font-bold bg-amber-200 hover:bg-amber-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
        type="button"
      >
        {currentUser.email}
        <svg
          className={`w-2.5 h-2.5 ms-3 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        id="dropdownInformation"
        className={`${
          isOpen ? 'block' : 'hidden'
        } z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Hello , {currentUser?.username}</div>
          <div className="font-medium truncate">{currentUser?.email}</div>
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Change Password</a>
          </li>
         
        </ul>
        <div className="py-2">
          <a href="#"onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
