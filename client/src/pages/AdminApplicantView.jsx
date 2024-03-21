import React, { useEffect } from 'react'
import { AdminApplicantTable } from '../components/AdminApplicantTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchstudent } from '../redux/student/studentSlice'

export default function AdminApplicantView() {
     const dispatch  = useDispatch()
     const {student} = useSelector(state=>state?.student)
    useEffect(()=>{
        dispatch(fetchstudent())
    },[dispatch])
  return (
    <div className='PageContainer'>
        <div>
            <span className='text-2xl font-bold'>Applicaats Details</span>
        </div>

        <div>
            <AdminApplicantTable student ={student} />
        </div>
    </div>
  )
}
