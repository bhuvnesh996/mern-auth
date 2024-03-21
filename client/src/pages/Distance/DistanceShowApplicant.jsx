import React, { useEffect } from 'react'
import { DistanceShowApplicantTable } from '../../components/Distance/DistanceShowApplicantTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFreshApplicant } from '../../redux/student/studentSlice'


export default function DistanceShowApplicant() {
    const { studentFresh  }= useSelector(state=>state?.student)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchFreshApplicant())
    },[dispatch])
  return (
    <div>
        <div className='p-4'>
            <span className='text-3xl font-bold'>Show Fresh Application</span>
        </div>
        <div className='p-4'>
            <DistanceShowApplicantTable  studentFresh ={studentFresh}/>
        </div>

    </div>
  )
}
