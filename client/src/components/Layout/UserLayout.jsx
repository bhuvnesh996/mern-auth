import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import ProfileButton from '../UI/ProfileButton';
import { HiOutlineCog, HiOutlineHome, HiOutlineUser } from 'react-icons/hi';
import { FaUniversity } from 'react-icons/fa';
import { SiSessionize } from 'react-icons/si';
import { FaBookJournalWhills } from 'react-icons/fa6';

export default function UserLayout({ children }) {
  const location = useLocation();

  return (
    <div className=' h-screen'>
      {/* Sidebar */}
      <div className= 'flex w-full h-full bg-[#9F70FD] text-white'>
                
        {/* Sidebar content */}
              <div className="w-[250px]" >
                <div className='h-[64px]'>
                  <image src="https://ih1.redbubble.net/image.559072294.6412/st,small,507x507-pad,600x600,f8f8f8.jpg" />
                  </div>
                        {/* Logo */}
                        
                        {/* Sidebar links */}
                        <ul className="py-2 mt-4 flex flex-col justify-around h-96">
                            <li className= { location.pathname ==='/user/dashboard' ?"px-4 py-2 text-gray-200 bg-[#FF8911]":"px-4 py-2 text-gray-200 hover:bg-gray-700" }>
                                <Link to="/user/dashboard" className={location.pathname === '/user/dashboard' ? 'bg-white-700 font-bold' : 'text-white'}>
                                  <HiOutlineHome className="h-6 w-6 inline mr-2" />
                                  Dashboard
                                </Link>
                            </li>
                            <li className="px-4 py-2 text-gray-200 hover:bg-gray-700">
                                <Link to="">
                                    <FaUniversity className="h-6 w-6 inline mr-2" />
                                    Change University
                                </Link>
                            </li>
                            <li className="px-4 py-2 text-gray-200 hover:bg-gray-700">
                                <Link to="">
                                    <SiSessionize className="h-6 w-6 inline mr-2" />
                                    Promotion Items
                                </Link>
                            </li>
                            <li className="px-4 py-2 text-gray-200 hover:bg-gray-700">
                                <Link to="">
                                    <FaBookJournalWhills className="h-6 w-6 inline mr-2" />
                                    Download Content
                                    {/* {!isOpen && <FaBookJournalWhills className='mr-45'/>} */}
                                </Link>
                            </li>
                            <li className="px-4 py-2 text-gray-200 hover:bg-gray-700">
                                <Link to="">
                                    <HiOutlineUser className="h-6 w-6 inline mr-2" />
                                    Ticket Genrate
                                </Link>
                            </li>
                            <li className="px-4 py-2 text-gray-200 hover:bg-gray-700">
                                <Link to="">
                                    <HiOutlineCog className="h-6 w-6 inline mr-2" />
                                    Help and Support
                                </Link>
                            </li>
                        </ul>
                  </div>
      {/* Main Content */}
      <div className='flex flex-col w-full bg-gray-200 relative'>
        {/* Navigation */}
        <nav className='bg-[#9F70FD] h-[80px] p-4'>
          <ul className='pt-2 flex justify-between items-center align-middle'>
            <li className='mx-4'>
                <input placeholder='seach' />
            </li>
            <li className='mx-4'>
              <Link to='/user/settings' className={location.pathname === '/user/settings' ? 'text-yellow-500 font-bold' : 'text-white'}>
                
              </Link>News letter
            </li>
            <li className='mx-4'>
                <ProfileButton />
              
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
        {/* Main Content */}
        <main className='p-4 overflow-auto h-full'>
          <Outlet />
        </main>
      </div>
    </div>
    </div>
  );
}
