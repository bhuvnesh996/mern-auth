import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';
import { HiOutlineHome, HiOutlineUser, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';
import { FaUniversity } from "react-icons/fa";
import { SiSessionize } from "react-icons/si";
import { FaBookJournalWhills } from "react-icons/fa6";
import { MdAssignmentInd } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";


import { HiMenu } from 'react-icons/hi';
import { BsChevronDown } from 'react-icons/bs';

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [drop1,setDrop1] = useState(false)
    const dispatch = useDispatch();

    const handleToggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleSignOut = async () => {
        try {
          await fetch('/api/auth/signout');
          dispatch(signOut());
        } catch (error) {
          console.log(error);
        }
    };
    const handleDrop1 = async ()=>{
        setDrop1(!drop1)
    }

    return (
        <div className={`bg-sidebar-image bg-cover bg-center h-full fixed top-0 left-0 ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 overflow-x-hidden`}>
            <button 
                className="text-white absolute top-4 left-4 focus:outline-none"
                onClick={handleToggleSidebar}
            >
                {isOpen ? <HiMenu className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                
            </button>
          
            {/* Sidebar content */}
            <div className="py-2" style={{marginTop:"30px"}}>
                {/* Logo */}
               
                {/* Sidebar links */}
                <ul className= "py-2  mt-4">
                    <li className="px-2 py-2 text-gray-200 font-bold hover:bg-white hover:text-cyan-500">
                        <Link to="/admin">
                            {isOpen && <HiOutlineHome className="h-6 w-6 inline mr-5" />}
                            {isOpen && 'Dashboard'}
                            {!isOpen && <HiOutlineHome className="h-6 w-6" />}
                        </Link>
                    </li>
                    <li className="px-2 py-2 text-gray-200 font-bold hover:bg-white hover:text-cyan-500">
                        <Link to="/admin/university">
                            {isOpen && <FaUniversity className="h-6 w-6 inline mr-5" />}
                            {isOpen && 'University'}
                            {!isOpen && <FaUniversity className="h-6 w-6 inline" />}
                        </Link>
                    </li>
                    <li className="px-2 py-2 text-gray-200 font-bold hover:bg-white hover:text-cyan-500">
                        <Link to="/admin/university/form">
                            {isOpen && <FaWpforms className="h-6 w-6 inline mr-5" />}
                            {isOpen && 'University Form'}
                            {!isOpen && <FaWpforms className="h-6 w-6 inline" />}
                        </Link>
                    </li>
                    <li className="px-2 py-2 text-gray-200 font-bold hover:bg-white hover:text-cyan-500">
                        <Link to="/admin/session">
                            {isOpen && <SiSessionize className="h-6 w-6 inline mr-5" />}
                            {isOpen && 'Session'}
                            {!isOpen && <SiSessionize className="h-6 w-6 inline" />}
                        </Link>
                    </li>
                    <li className="px-2 py-2 text-gray-200 font-bold hover:bg-white hover:text-cyan-500">
                        <Link to="/admin/course">
                            {isOpen && <FaBookJournalWhills className="h-6 w-6 inline mr-5" />}
                            {isOpen && 'Course'}
                            {!isOpen && <FaBookJournalWhills className="h-6 w-6 inline" />}
 
                        </Link>
                    </li>
                    <li className="px-2 py-2 text-gray-200 font-bold hover:bg-white hover:text-cyan-500">
                        <Link to="/admin/center">
                            {isOpen && <HiOutlineUser className="h-6 w-6 inline mr-5" />}
                            {isOpen && 'Center'}
                            {!isOpen && <HiOutlineUser className="h-6 w-6 inline" />}
                        </Link>
                    </li>
                    <li className="px-2 py-2 text-gray-200 font-bold hover:bg-white hover:text-cyan-500">
                        <Link to="/admin/university/assign">
                            {isOpen && <MdAssignmentInd className="h-6 w-6 inline mr-5" />}
                            {isOpen && 'Assign University'}
                            {!isOpen && <MdAssignmentInd className="h-6 w-6 inline" />}
                        </Link>
                    </li>
                    <li className="px-2 py-2 text-gray-200 font-bold hover:bg-white hover:text-cyan-500">
                        <Link className='flex flex-row items-center'>
                            {isOpen && <PiStudent className="h-6 w-6 inline mr-5" />}
                            {isOpen && 'Admission Managment'}
                            {!isOpen && <PiStudent className="h-6 w-6 inline" />}
                            {!isOpen ? <BsChevronDown  className={`${!isOpen && "hidden"}`} onClick={handleDrop1}/> : <BsChevronDown  className={`${!isOpen && "hidden"}`} onClick={handleDrop1}/> }
                        </Link>
                    </li>
                    { drop1 &&
                    <ul>    
                        <li className='px-2 py-2 text-gray-200 font-bold hover:bg-white hover:text-cyan-500'>
                            <Link to ="/admin/applicant/view" className='flex flex-row items-center' >
                                     {isOpen && <FaRegEye className="h-6 w-6 inline mr-5" />}
                                     {isOpen && "Applicatant Views"}
                            </Link>
                        </li>
                    </ul>
                    }
                    <li className="px-2 py-2 text-gray-200 font-bold hover:bg-white hover:text-cyan-500">
                        <Link to="/admin/news">
                            {isOpen && <IoNewspaperOutline className="h-6 w-6 inline mr-5" />}
                            {isOpen && 'News'}
                            {!isOpen && <IoNewspaperOutline className="h-6 w-6 inline" />}
                        </Link>
                    </li>
                    <li className="px-2 py-2 text-gray-200 font-bold hover:bg-white hover:text-cyan-500">
                        <Link to="/settings">
                            {isOpen && <HiOutlineCog className="h-6 w-6 inline mr-5" />}
                            {isOpen && 'Settings'}
                            {!isOpen && <HiOutlineCog className="h-6 w-6 inline" />}
                        </Link>
                    </li>
                </ul>
                {/* Logout button */}
                <button 
                    className="text-white hover:text-gray-300 font-bold"
                    onClick={handleSignOut}
                >
                    {isOpen && <HiOutlineLogout className="h-6 w-6 inline mr-2" />}
                    {isOpen && 'Logout'}
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
