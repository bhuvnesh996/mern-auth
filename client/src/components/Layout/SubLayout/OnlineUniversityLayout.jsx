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



export default function OnlineUniversityLayout({selectedUniversity}) {
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
            icon:<MdDashboard />
        
        },
        {
            title:"Lead",
            icon: <IoSend />,
            submenu:true,
            submenuItems:[
                {
                    title:"Create Lead",
                    icon: <BsFillSendFill />
                },
                {
                    title:"Show Lead",
                    icon:< FaEye/>
                },
            ],
        },{
            title:"Admission",
            icon: <BsFillSendCheckFill />,
            submenu:true,
            submenuItems:[
                {
                    title:"Apply Admission",
                    icon: <MdOutlineScheduleSend />
                },
                {
                    title:"Show Admission",
                    icon:<FaEye />
                },
            ]
        }
        ,{
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
    <div className= 'flex h-screen' >
        <div className='flex bg-kyz flex-col'>
      {/* Sidebar content */}
            <div className={`transition-[width] duration-500 ease-in-out p-5 pt-8 ${isOpen ? "w-72":"w-20"}  relative flex flex-row`} >
                <GiHamburgerMenu  className={`text-white text-3xl rounded-full absolute cursor-pointer ${!isOpen && "absolute float-right"}`} onClick={()=>setIsOpen(!isOpen)}/>
                <div className='ml-[60px]' >
                    <img className='w-[60px] ml-[60px] h-[50] object-fit' src={selectedUniversity.university.UniLogo} />
                </div>
            </div>
            <div className={`p-5 pt-8 ${isOpen ? "w-72":"w-20"} duration-300 relative`} >
                {/* <BsSearch className={`text-white text-lg block float-left cursor-pointer ${
                    isOpen && "mr-2"
                }`}/>
                    <input type={'search'}
                    placeholder='Search'
                    className={`text-base bg-grey w-full text-grey focus:outline-none ${!isOpen&&"hidden"}`}
                    /> */}
                    
            </div>
                    <ul className={`pt-2 ${!isOpen} && ml-4`}>
                        {Menus.map((menu, index) => (
                                        <React.Fragment key={index}>
                                            <li className='text-white text-sm flex items-center gap-x-4 cursor p-2 hover:bg-white rounded-l-lg mt-2 hover:text-kyz'>
                                                <span className='text-2xl block float-left transition-[width] duration-500 ease-in-out '>{menu.icon}</span>
                                                <span className={`text-base font-medium flex-1 transition-[width] duration-500 ease-in-out  ${!isOpen && "hidden"}`}>{menu.title}</span>
                                                {menu.submenu && (
                                                    <BsChevronDown  className={`${!isOpen && "hidden"}`} onClick={() => handleSubmenu(index)}/>
                                                )}
                                            </li>
                                            {submenuOpen[index] && menu.submenu && isOpen && (
                                                <ul>
                                                    {menu.submenuItems.map((subItem, subIndex) => (
                                                        <li key={subIndex} className='text-white text-sm flex items-center rounded-l-lg gap-x-4 cursor p-2 px-5 hover:bg-white rounded-md mt-2  hover:text-indigo-500'>
                                                             <span className={`text-2xl   block float-left ${!isOpen&&'hidden'}`}>{subItem.icon}</span>
                                                            <span className={`text-base font-medium flex-1 duration-300 ${!isOpen && "hidden"}`}>{subItem.title}</span>
                                                        </li>
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
      <nav className='h-[80px] p-4  bg-white'>
        <ul className='pt-2 flex justify-between items-center align-middle'>
          <li className='mx-4 w-[150px]'>
              <button className='bg-kyz text-white w-[150px] h-[40px] cursor-pointer rounded-lg 
                                transform transition duration-500 font-bold
                                hover:scale-110'> MODE-REGULAR</button>
          </li>
          <li className='mx-4'>
            <Link to='/user/settings' className={'text-[#00FFFF]'}>
              
            </Link>News letter
          </li>
          <li className='mx-4'>
              <button onClick={handleReset} className='bg-kyz text-white w-[150px] font-bold h-[40px] border-2 border-white-600 
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
