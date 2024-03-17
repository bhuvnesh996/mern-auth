import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import ProfileButton from '../../UI/ProfileButton';
import { HiOutlineCog, HiOutlineHome, HiOutlineUser } from 'react-icons/hi';
import { FaUniversity } from 'react-icons/fa';
import { SiSessionize } from 'react-icons/si';
import { FaBookJournalWhills } from 'react-icons/fa6';
import Logo from '../../../public/Images/Logo.png'

export default function CenterLayout () {
    const location = useLocation();
  return (
    <div className=' h-screen'>
      {/* Sidebar */}
      <div className= 'bg-gradient-to-t from-amber-600 to-amber-200 flex w-full h-full  text-white'>
            
        {/* Sidebar content */}
              <div className="w-[250px]" >
                    <div className='h-[64px]'>
                        <img className='w-[200px] p-2' src={Logo} />
                  </div>
                        {/* Logo */}
                        
                        {/* Sidebar links */}
                        <ul className="py-2 mt-4 flex flex-col justify-around h-96">
                            <li className=  "px-4 py-2 hover:bg-red hover:bg-[#FF8911] hover:text-[#FAF9F6]">
                                <Link to="/user/dashboard" className='text-black font-bold flex flex-row '>
                                    <HiOutlineHome className="h-6 w-6 inline mr-2" />
                                    <h1 >Dashboard</h1>
                                </Link>
                            </li>
                            <li className=  "px-4 py-2 hover:bg-red hover:bg-[#FF8911] hover:text-[#FAF9F6]">
                                <Link to="/user/changeUniversity" className='text-black font-bold flex flex-row ' >
                                    <FaUniversity className="h-6 w-6 inline mr-2" />
                                    Change University
                                </Link>
                            </li>
                            <li className=  "px-4 py-2 hover:bg-red hover:bg-[#FF8911] hover:text-[#FAF9F6]">
                                <Link to="/user/changeUniversity" className='text-black font-bold flex flex-row ' >
                                    <FaUniversity className="h-6 w-6 inline mr-2" />
                                    Promotion Items
                                </Link>
                            </li>
                            <li className=  "px-4 py-2 hover:bg-red hover:bg-[#FF8911] hover:text-[#FAF9F6]">
                                <Link to="/user/changeUniversity" className='text-black font-bold flex flex-row ' >
                                    <FaUniversity className="h-6 w-6 inline mr-2" />
                                    Download Content
                                </Link>
                            </li>
                            <li className=  "px-4 py-2 hover:bg-red hover:bg-[#FF8911] hover:text-[#FAF9F6]">
                                <Link to="/user/changeUniversity" className='text-black font-bold flex flex-row ' >
                                    <FaUniversity className="h-6 w-6 inline mr-2" />
                                    Ticket Raise
                                </Link>
                            </li>
                            <li className=  "px-4 py-2 hover:bg-red hover:bg-[#FF8911] hover:text-[#FAF9F6]">
                                <Link to="/user/changeUniversity" className='text-black font-bold flex flex-row ' >
                                    <FaUniversity className="h-6 w-6 inline mr-2" />
                                    Help and Support
                                </Link>
                            </li>
                    
                        </ul>
                  </div>
      {/* Main Content */}
      <div className='flex flex-col w-full bg-gray-200 relative'>
        {/* Navigation */}
        <nav className='bg-gradient-to-r from-amber-200 to-amber-600 h-[80px] p-4'>
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
  )
}
