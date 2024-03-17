import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUniversity } from '../redux/university/universitySlice';
import { Button, Checkbox, Input, Option, Select } from '@material-tailwind/react';
import Loader from '../components/Loader';
import { createSession, resetCreateSession } from '../redux/session/sessionSlice';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../components/UI/SnackBar';

export default function AdminSessionCreate() {
    const university = useSelector(state => state?.university?.University);
    const universityLoading =  useSelector(state=>state?.university?.loading )
    const {SessionCreation} = useSelector(state=>state.session)
    const [SelectUniversity,setSelectedUniversity ]= useState()
    const [sessionName ,setSessionName] = useState()
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    
    const [status,setStatus] = useState(false)
    const dispatch = useDispatch();
    const navigate =  useNavigate()

    useEffect(()=>{
        console.log("shoud run 2 time",SessionCreation)
        if (SessionCreation) {
            setSnackbarOpen(true);
            setSnackbarMessage('Session added successfully!');
            setSnackbarSeverity('success');

        }
    },[SessionCreation])
    useEffect(() => { 
        dispatch(resetCreateSession())
        dispatch(getAllUniversity());
    }, [dispatch]);

   
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleSubmit = (event) => {
        console.log("check",1)
        event.preventDefault();
        const data = { 
            sessionName:sessionName,
            status:status,
            universityID:SelectUniversity
        }
        console.log("my data")
        dispatch(createSession(data))
        console.log("Sending data",data)
      
        setTimeout(()=>{
            navigate('/admin/session')
        },5000)
    }
    const handleUniversityChange = (event) => {
        console.log("event",event._id)
        setSelectedUniversity(event._id);
    }
    const handleSessionName = (event) =>{
        setSessionName(event.target.value)
    }
    const handleStatus = (event) => {
        setStatus(event.target.value)
    }
    return (
        <div className='PageContainer'>
                <Snackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
            {universityLoading ?
             <Loader />
            
            :  <div> 
            <div className='w-60 mt-5'>
                <div className='text-2xl font-bold'>SESSION CREATION</div>
            </div>
            <div className='mt-5'>
                <form onSubmit={handleSubmit} className='w-[600px] h-[300px] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-4'>
                    <label className="block mb-2 font-bold">Select University</label>
                    <div className=''>
                        <Select defaultValue="Null" placeholder='Select University' onChange={event => handleUniversityChange(event)}>
                            {university?.map((item, index) => (
                                <Option key={index} value={item}>
                                    <div className='flex flex-row items-center'>
                                        {<div><img className='w-[30px]' src={item.UniLogo} /></div> }  {item.universityName}-{item.vertical}
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <label className="block mt-5 mb-2 font-bold">Select Name of Session</label>
                    <Input placeholder='SessionName' className="w-30"onChange={handleSessionName} value ={sessionName} required />
                    {/* <div className='flex flex-row justify-start items-center' >
                        <label className="block mt-5 mb-2">Acitve</label>
                        <Checkbox  value={status} onChange ={handleStatus}  color="blue"/>
                    </div> */}
                    <Button type='submit' className="mt-10 float-right" color='blue'> Submit</Button>


                </form>
            </div>
            </div>
            }
          
        </div>
    );
}
