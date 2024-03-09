import React, { useEffect } from 'react'
import AdminSessionTable from '../components/AdminSessionTable'
import { fetchSession, fetchSessionEnd, fetchSessionStart , fetchSessionSuccess} from '../redux/session/sessionSlice';
import { fetchUniversityFail, getAllUniversity } from '../redux/university/universitySlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';



export default function AdminSession() {
  const session = useSelector(state=>state.session?.Session)
  const SessionLoading = useSelector(state=>state.session?.loading)
  const university = useSelector(state => state?.university?.University);
  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(fetchSession())
    dispatch(getAllUniversity())
  }, [dispatch]);
  return (
    < div className='PageContainer'>
      { session ? <AdminSessionTable session={session}/>  : 
      
      <Loader /> 
    }
    </div>
  )
}

