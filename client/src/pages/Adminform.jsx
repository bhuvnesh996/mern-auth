import React, { useEffect } from 'react'
import AdminFormeTable from '../components/AdminFormTable'
import { useDispatch, useSelector } from 'react-redux'
import { formFetch } from '../redux/form/formSlice'

export default function Adminform() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(formFetch())
  },[dispatch])
  const {Form}  = useSelector(state=>state?.form)
  return (
    <div className='PageContainer'>
        <div className='text-5xl font-bold'>
            University form
        </div>
        <div className='mt-5'>
            <AdminFormeTable Form = {Form} />
        </div>
        
    </div>
  )
}
