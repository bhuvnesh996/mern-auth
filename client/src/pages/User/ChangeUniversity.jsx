import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { fetchCenterDetailsFromUser, selectWorkingUniversity } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function ChangeUniversity() {
    const user = useSelector(state=>state?.user?.currentUser)
    const Assignuniversity = useSelector(state=>state.user?.centerDetail?.AssignUniversity)

    const dispatch= useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        const data = {
            centerID : user.center
        }
        dispatch(fetchCenterDetailsFromUser(data.centerID))
    },[])
    console.log("assigneduni ",Assignuniversity)
    const universitySelect = (item)=>{
      console.log("my item",item)
        dispatch(selectWorkingUniversity(item))
        navigate(`/${item.university.vertical.toLowerCase()}/dashboard`)
    }
  return (
    <div className='flex flex-col'>
      <div className='text-amber-700 font-bold m-2 p-2'>
          ASSIGNED UNIVERSITY
      </div>
      <div>
        <div className='grid grid-cols-4 gap-6 m-2 p-2 justify-evenly'>
        
              {Assignuniversity?.map((item=>{
                return (
                  <div onClick={()=>universitySelect(item)} className='shadow-[16px_2px_40px_22px_#fcd34d,-5px_-15px_32px_38px_#0279860C] flex flex-col h-[180px] w-[220px] text-black border border-white-900 p-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-sky-700  hover:scale-105 transition-all duration-300 rounded-lg' key={item.university._id}>
                      <div > 
                        <img className='h-[160px] w-[300px] self-center cursor-pointer  object-contained' src={item?.university?.UniLogo} />
                      </div>  
                      <div className='flex flex-1 mt-[10px] justify-center font-bold'>
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
