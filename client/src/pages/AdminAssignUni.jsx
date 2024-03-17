import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchCenter } from '../redux/center/centerSlice'
import Loader from '../components/Loader'
import PopUpFrom from '../components/UI/PopUpFrom'
import AdminAssignedUniTable from '../components/AdminAssignedUniTable'

export default function AdminAssignUni() {
  const [open,setOpen] = useState(false)
  const handleClose = ()=>{
    setOpen(false)
  }
 
  const dispatch = useDispatch()
  const data = useSelector(state=>state?.center?.searchCenter)
  const searchloading =  useSelector(state=>state.center.seacrchCenterLoading)
  const [CenterCode,setCenterCode] = useState("")
  const handleChange = (e)=>{
      setCenterCode(e.target.value)
  }
  const seachHandle = (e)=>{
    e.preventDefault(); // Prevent the default form submission behavior
    dispatch(searchCenter(CenterCode));
  }

  return (
    <div className='PageContainer'>
      <div className='flex justify-center flex-col'>
        <form onSubmit={seachHandle} class="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                <input 
                type="text" 
                placeholder="Search Center Code" 
                onChange={e=>handleChange(e)}
                value ={CenterCode}
                class="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" />
                    <button  
                    class="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3" 
                    type='submit' >
                    Search
                </button>
        </form>

        {searchloading ? (
          <Loader />
        ) : (
          Array.isArray(data) ? (
            <div className='flex justify-center items-middle m-10 p-10 text-red-700'>
              No data found on this center code
            </div>
          ) : (
                
                  <div className='m-10 p-10 flex flex-col'>
                    <div className='flex flex-row'>
                        <div className='m-2 p-2'>
                            <span class="text-sm font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle">InsitutionName -</span>
                            <span class="text-sm font-medium py-1 px-2 rounded text-red-800 align-middle">{data?.InsitutionName}</span>
                        </div> 
                        <div className='m-2 p-2'>
                          <span class="text-sm font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle">OwnerName -</span>
                          <span class="text-sm font-medium py-1 px-2 rounded text-red-800 align-middle">{data?.OwnerName}</span>
                        </div>
                        <div className='m-2 p-2'>
                          <span class="text-sm font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle">city -</span>
                          <span class="text-sm font-medium py-1 px-2 rounded text-red-800 align-middle">{data?.city}</span>
                        </div>
                        <div className='m-2 p-2'>
                          <span class="text-sm font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle">state -</span>
                          <span class="text-sm font-medium py-1 px-2 rounded text-red-800 align-middle">{data?.state}</span>
                        </div>
                        <div className='m-2 p-2'>
                          <span class="text-sm font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle">Center Code -</span>
                          <span class="text-sm font-medium py-1 px-2 rounded text-red-800 align-middle">{data.CenterCode}</span>
                        </div>
                        
                    </div>
                    
                    <AdminAssignedUniTable centerID ={data?._id} university={data?.AssignUniversity} />
                    {/* <div className='flex flex-col  m-10 p-10'>
                      <div>
                        ASSIGNED UNIVERSITIES
                      </div>
                      <div> 
                          {data.AssignUniversity.length === 0 ? 
                            <div>
                              No University assigned 
                            </div>: 
                            <div> 
                              {data.AssignUniversity.map((item)=>{
                                return (
                                <ul key={item._id}>
                                    <li>{item.universityName}</li>
                                </ul>
                                )
                              })}
                            </div>
                          }
                       </div> 
                       <div>
                            
                        </div>
                    </div> */}
                  </div>
        
        
               )) }
      </div>
        
    </div>
  )
}
