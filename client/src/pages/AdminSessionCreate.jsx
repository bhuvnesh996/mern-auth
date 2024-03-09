import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUniversity } from '../redux/university/universitySlice';
import { Button, Checkbox, Input, Option, Select } from '@material-tailwind/react';
import Loader from '../components/Loader';
import { createSession } from '../redux/session/sessionSlice';
import { useNavigate } from 'react-router-dom';

export default function AdminSessionCreate() {
    const university = useSelector(state => state?.university?.University);
    const universityLoading =  useSelector(state=>state?.university?.loading )
    const [SelectUniversity,setSelectedUniversity ]= useState()
    const [sessionName ,setSessionName] = useState()
    const [status,setStatus] = useState(false)
    const dispatch = useDispatch();
    const navigate =  useNavigate()

    useEffect(() => { 
        dispatch(getAllUniversity());
    }, [dispatch]);

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
        navigate('/admin/session')
    };
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
            {universityLoading ?
             <Loader />
            
            :  <div> 
            <div className='flex flex-row justify-center w-60 mt-5'>
                <div className='text-2xl font-bold'>SESSION CREATION</div>
            </div>
            <div className='mt-5'>
                <form onSubmit={handleSubmit} className='w-70'>
                    <label className="block mb-2">Select University</label>
                    <div className='w-30'>
                        <Select defaultValue="Null" placeholder='Select University' onChange={event => handleUniversityChange(event)}>
                            {university?.map((item, index) => (
                                <Option key={index} value={item}>
                                    {item.universityName}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <label className="block mt-5 mb-2">Select Name</label>
                    <Input placeholder='SessionName' className="w-30"onChange={handleSessionName} value ={sessionName} />
                    <div className='flex flex-row justify-start items-center' >
                        <label className="block mt-5 mb-2">Acitve</label>
                        <Checkbox  value={status} onChange ={handleStatus}  color="blue"/>
                    </div>
                    <Button type='submit' className="mt-5" color='blue'> Submit</Button>


                </form>
            </div>
            </div>
            }
        </div>
    );
}
