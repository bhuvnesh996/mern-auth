import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetWorkingUniversity } from '../../../redux/user/userSlice';
import { BsArrowLeftShort, BsChevronDown, BsSearch } from 'react-icons/bs';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { BsFillSendCheckFill } from "react-icons/bs";
import { MdOutlineScheduleSend } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { IoCloudOffline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa";



export default function DistanceUniversityLayout({selectedUniversity}) {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen,setIsOpen] = useState(false)
    const [Open,setOpen] = useState(false)
    const [showAdmissionDropdown, setShowAdmissionDropdown] = useState(false);
    const [showRRAdmissionDropdown, setShowRRAdmissionDropdown] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState({});
     const Menus = [
        {
            title:"Dashboard",
            icon:<MdDashboard />,
            path :"/distance/dashboard"
        
        },
        {
            title:"Apply Admission",
            icon: <IoSend />,
            submenu:true,
            submenuItems:[
                {
                    title:"Apply Fresh",
                    icon: <BsFillSendFill />,
                    path :"/distance/apply"
                },
                {
                    title:"Show Admission",
                    icon:< FaEye/>,
                    path: "/distance/show/applicants"
                },
            ],
        },{
            title:"Apply RR Admission",
            icon: <BsFillSendCheckFill />,
            submenu:true,
            submenuItems:[
                {
                    title:"Apply RR",
                    icon: <MdOutlineScheduleSend />
                },
                {
                    title:"Show RR Admission",
                    icon:<FaEye />
                },
            ]
        },{
            title:"Payment",
            icon: <FaMoneyCheck />,
            submenu:true,
            submenuItems:[
                {
                    title:"Online",
                    icon: <MdBookOnline />
                },
                {
                    title:"Offline",
                    icon: <IoCloudOffline />
                },
            ]
        },{
            title:"Download",
            icon: <FaDownload />

        },{
            title:"Bill Ledger",
            icon:<RiBillLine/>
            
        },{
            title:"Logistics",
            icon:<FaCarSide/>
            
        },{
            title:"News & Notification",
            icon: <FaNewspaper />
        }
        
        
        
     ]
    const handleReset = ()=>{
        console.log("i was reseted")
        dispatch(resetWorkingUniversity())
        navigate('/user/dashboard')
    }

    const handleSubmenu = (index) => {
        setSubmenuOpen({...submenuOpen, [index]: !submenuOpen[index]});
    }

    console.log("i was hit3",Open)
  return (
    <div className=''>
    {/* Sidebar */}
    <div className= 'flex  h-screen' >
        <div className='flex flex-col'>
      {/* Sidebar content */}
            <div className={`p-5 pt-8 ${isOpen ? "w-72":"w-20"} duration-300 relative flex flex-row`} >
                <GiHamburgerMenu  className={`bg-white text-grey text-3xl rounded-full absolute  border border-white cursor-pointer ${!isOpen && "absolute float-right"}`} onClick={()=>setIsOpen(!isOpen)}/>
                <div className='ml-[60px]' >
                    <img className={`w-[60px] ml-[60px] h-[50] object-fit ${!isOpen ? 'hidden':"" }`} src={selectedUniversity.university.UniLogo} />
                </div>
            </div>
            <div className={`p-5 pt-8 ${isOpen ? "w-72":"w-20"} duration-300 relative`} >
                <BsSearch className={`text-white text-lg block float-left cursor-pointer ${
                    isOpen && "mr-2"
                }`}/>
                    <input type={'search'}
                    placeholder='Search'
                    className={`text-base bg-grey w-full text-grey focus:outline-none ${!isOpen&&"hidden"}`}
                    />
                    
            </div>
                    <ul className={`pt-2 ${!isOpen} && ml-4`}>
                        {Menus.map((menu, index) => (
                                        <React.Fragment key={index}>
                                            <Link to={menu.path}>
                                            <li className='text-grey-300 text-sm flex items-center gap-x-4 cursor p-2 hover:bg-light-white rounded-md mt-2'>
                                                <span className='text-2xl block float-left duration-300'>{menu.icon}</span>
                                                <span className={`text-base font-medium flex-1 duration-300 ${!isOpen && "hidden"}`}>{menu.title}</span>
                                                {menu.submenu && (
                                                    <BsChevronDown  className={`${!isOpen && "hidden"}`} onClick={() => handleSubmenu(index)}/>
                                                )}
                                            </li>
                                            </Link>
                                            {submenuOpen[index] && menu.submenu && isOpen && (
                                               
                                                <ul>
                                                    {menu.submenuItems.map((subItem, subIndex) => (
                                                        <Link Link to={subItem.path}>
                                                        <li key={subIndex} className='text-grey-300 text-sm flex items-center gap-x-4 cursor p-2 px-5 hover:bg-light-white rounded-md mt-2'>
                                                             <span className={`text-2xl block float-left ${!isOpen&&'hidden'}`}>{subItem.icon}</span>
                                                            <span className={`text-base font-medium flex-1 duration-300 ${!isOpen && "hidden"}`}>{subItem.title}</span>
                                                        </li>
                                                        </Link>
                                                    ))}
                                                </ul>
                                            )}
                                        </React.Fragment>
                                    ))}
                    </ul>
    </div>

    {/* Main Content */}
    <div className='flex flex-col w-full h-screen  relative'>
      {/* Navigation */}
      <nav className='h-[80px] p-4 rounded-lg bg-gray-200'>
        <ul className='pt-2 flex justify-between items-center align-middle'>
          <li className='mx-4 w-[150px]'>
              <button className='bg-[#FF7F50] w-[150px] h-[40px] cursor-pointer rounded-lg 
                                transform transition duration-500 
                                hover:scale-110'> MODE-DISTANCE</button>
          </li>
          <li className='mx-4'>
            <Link to='/user/settings' className={'text-[#00FFFF]'}>
              
            </Link>News letter
          </li>
          <li className='mx-4'>
              <button onClick={handleReset} className='bg-[#FF7F50] w-[150px] h-[40px] border-2 border-white-600 
                                cursor-pointer rounded-lg 
                                transform transition duration-500 
                                hover:scale-110' >RESET UNIVERSITY</button>
            
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      {/* Main Content */}
      <main >
        <Outlet />
      </main>
    </div>
  </div>
  </div>
  )
}
