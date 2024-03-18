import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import DistanceForm from '../../components/Distance/DistanceForm'
import { fetchCourseByUniversity, fetchSessionByUniversity } from '../../redux/user/userSlice'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';

export default function DistanceApplyForm() {
    const dispatch = useDispatch()
    const universitySelect = useSelector(state=>state.user?.selectedUniversity?.university)
    const sessionByUniversity = useSelector(state=>state.user?.getSessionOnSelectUniversity)
    const {getCourseOnSelectUniversity }= useSelector(state=>state?.user)
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSession,setSelectedSession] = useState(null);
    const [formData, setFormData ] = useState({})
    
   
    // Function to handle course selection
    const handleCourseSelection = (event) => {
      setSelectedCourse(event.target.value);
    };
    useEffect(()=>{
        dispatch(fetchSessionByUniversity(universitySelect?._id))
        dispatch(fetchCourseByUniversity(universitySelect?._id))
    },[dispatch,universitySelect])
    console.log("sessionbyuni",getCourseOnSelectUniversity)
    const handleSubmit = (e)=>{
        e.preventDefault()
        const data = {
            university:universitySelect._id,

        }
        console.log("form data",formData)
    }
    return (
        <div className='p-5 m-5'>
         
            <div>
                <h2 className='text-2xl font-bold'>Applying For:</h2>
                <div className='grid grid-cols-4 gap-4'>
                    <div>
                        <label className='font-bold'>University:</label>
                        <input disabled value={universitySelect.universityName}  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"  />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>Session:</label>
                        <select className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                            {sessionByUniversity?.map((session)=>{
                                <option value="">Select a Session</option>
                                return (
                                <option value={session._id}>{session?.sessionName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='flex flex-row justify-evenly'>
                            <div className='flex flex-col'>
                                <label className='font-bold'>Courses:</label>
                                <select 
                                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    onChange={handleCourseSelection} // Call the handleCourseSelection function on change
                                >
                                    <option value="">Select a Course</option>
                                    {getCourseOnSelectUniversity?.course?.map((course) => (
                                    <option key={course._id} value={course._id}>{course.name}</option>
                                    ))}
                                </select>
                            </div>
                                {/* If a course is selected, render specialization select */}
                                {selectedCourse && (
                                    <div className='flex flex-col'>
                                        <label className='font-bold'>Specializations:</label>
                                        <select 
                                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            // You can map through specializations of the selected course here
                                        >
                                            {/* Map through specializations based on the selected course */}
                                            {getCourseOnSelectUniversity?.course?.find(course => course._id === selectedCourse)?.specializations?.map((specialization, index) => (
                                            <option key={index}>{specialization}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                        </div>
                 
                </div>
            </div>
            { !universitySelect ? <Loader /> :
                <div className='mt-6'>
                    {universitySelect?.form?.form?.map(data => (
                        <div>
                          
                                <div>
        
                                    <DistanceForm data={data} formData ={formData}  setFormData ={setFormData}/>
                                </div>
                           
                        </div>
                    ))}
                     <div className="flex justify-end mt-5 p-5">
                        <button className='bg-cyan-200 rounded-xl text-white font-bold px-8 py-3' onClick={(e)=>handleSubmit(e)}>Submit</button>
                    </div>
                </div>
            }
        </div>
    )
}
