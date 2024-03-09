import React, { useEffect } from 'react';
import UniTable from './UniTable';
 // Assuming this is a function to fetch university data
import { useDispatch, useSelector } from 'react-redux';

import { fetchUniversityFail, fetchUniversityStart, fetchUniversitySuccess,getAllUniversity } from '../redux/university/universitySlice';





export  const fetchUniversity = async ()=>{
  const res= await fetch('/api/admin/university/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    
  });
  const data = await res.data
  console.log("my data",data)
  return data
}

export default function AdminUniversity() {
  const university = useSelector(state => state?.university?.University);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getAllUniversity())
  
  }, [dispatch]); // Removed university from dependency array

  return (
    <div className="PageContainer">
      <UniTable university={university} />
    </div>
  );
}
