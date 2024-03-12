import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import { fetchCenterDetailsFromUser } from '../../redux/user/userSlice';


export default function ChangeUniversity() {
    const user = useSelector(state=>state?.user?.currentUser)
    const Assignuniversity = useSelector(state=>state.user?.centerDetail?.AssignUniversity)

    const dispatch= useDispatch()
    useEffect(()=>{
        const data = {
            centerID : user.center
        }
        dispatch(fetchCenterDetailsFromUser(data.centerID))
    },[])
    console.log("assigneduni ",Assignuniversity)

  return (
    <div className='flex flex-col'>
      <div className='text-red-700  m-5 p-5'>
          ASSIGNED UNIVERSITY
      </div>
      <div>
        <div className='flex flex-wrap m-2 p-2 justify-evenly'>
        
              {Assignuniversity?.map((item=>{
                return (
                  <div className='flex flex-col text-black border border-white-900 p-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-sky-700  hover:scale-105 transition-all duration-300 rounded-lg' key={item.university._id}>
                      <div className='h-[200px] w-[300px]'> 
                        <img className='h-[200px] w-[300px] self-center cursor-pointer  object-contained' src={item.university.UniLogo} />
                      </div>  
                      <div className='mt-[10px]'>
                        {item?.university?.univserityShortName}-{item?.university?.vertical}
                      </div>
                    
        
                  </div>
                )
              }))}
         
        </div>
      </div>
    </div>
  )
}
