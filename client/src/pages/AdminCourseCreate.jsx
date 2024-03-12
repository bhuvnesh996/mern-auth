import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUniversity } from '../redux/university/universitySlice';
import Loader from '../components/Loader';
import { Option, Select } from '@material-tailwind/react';
import { FaMinus } from "react-icons/fa";



import { FaPlus } from "react-icons/fa";
import { CreateCourse } from '../redux/course/courseSlice';
import { useNavigate } from 'react-router-dom';

export default function AdminCourseCreate() {
   
    const createLoading = useSelector(state=>state.course.createLoading)
    const createStatus = useSelector(state=>state.course.createStatus)
    const [pageError,setPageError] = useState(false)
    const navigate = useNavigate()
    const {University,loading,error}  = useSelector(state=>state?.university)
    const [selectedUniversity,setSelectedUniversity] = useState()
    const [graduationType,setGraduationType] = useState("UG")
    const [specialization,setSpecialization] = useState([])
    const [nameError,setNameError] = useState()
    const [SpecializationError,setSpecializationError] = useState("")
    const [priceError,setPriceError] = useState("") 
    const [shortName,setShortName] = useState("")
    const [duration,setDuration] = useState(0)
    const [semester,setSemester] = useState(0)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllUniversity())
    },[dispatch])
   
    const handleSubmit = (e)=>{
        e.preventDefault();
        setNameError("")
        setSpecializationError("")
       

        const data= { 
            name:name,
            specializations:values,
            university:selectedUniversity._id,
            graducationLevel:graduationType,
            shortName:shortName,
            duration:duration,
            semester:semester,
            eligibility:checkedValues
        }
        if(name?.length ===0){
            console.log("in error")
            setNameError("Please Fill the name of course")
            return
        }
        if(values?.length === 0){
            setSpecializationError("Please add course specialization")
            return
        }
        if(price?.length ===0){
            setPriceError("Please add price to course")
            return
        }
        console.log("log data of course creation",data)

        dispatch(CreateCourse(data))

        }
        // Redirect after successful course creation
      
    
    const handleUniversityChange = (event)=>{
        setSelectedUniversity(event)
        console.log(selectedUniversity)
    }
    const handleGradType = (event) =>{
        setGraduationType(event)
    }
    const [inputValue, setInputValue] = useState('');
    const [values, setValues] = useState([]);
    const [name,setName] = useState("");
    const [price,setPrice] = useState()
    const handlePrice = (e)=>{
        setPrice(e.target.value)
    }
    
    const handleChangeName = (e)=>{
        setName(e.target.value)
    }
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };
    const handleShortNameChange = (e) => {
        setShortName(e.target.value);
      };
      
      const handleDurationChange = (e) => {
        setDuration(parseInt(e.target.value)); // Convert the input value to an integer
      };
      
      const handleSemesterChange = (e) => {
        setSemester(parseInt(e.target.value)); // Convert the input value to an integer
      };
  
    const handleAdd = () => {
      if (inputValue.trim() !== '') {
        setValues([...values, inputValue.trim()]);
        setInputValue('');
      }
    };
  
    const handleRemove = (index) => {
      setValues(values.filter((_, i) => i !== index));
    };

    const [checkedValues, setCheckedValues] = useState([]);

    const handleCheckboxChange = (value) => {
        // Check if the checkbox is already checked
        if (checkedValues.includes(value)) {
            // If it is checked, remove it from the array
            setCheckedValues(checkedValues.filter(item => item !== value));
        } else {
            // If it is not checked, add it to the array
            setCheckedValues([...checkedValues, value]);
        }
        
    };
    console.log("check value",checkedValues)
  return (
    <div  className="PageContainer">
         <span>Create COURSE</span>
        {loading ? <Loader /> : 
        
        <form class="w-full max-w-screen-lg mt-10" onSubmit={handleSubmit}>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Select University
                    </label>
                    <Select defaultValue="Null" placeholder='Select University' onChange={event => handleUniversityChange(event)}>
                            {University?.map((item, index) => (
                                <Option key={index} value={item}>
                                    {item.universityName}
                                </Option>
                            ))}
                    </Select>
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Course Name
                    </label>
                    <input value={name} onChange={(e)=>handleChangeName(e)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
                    <p className='text-red-800'>{nameError}</p>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Specialization
                    </label>
                    <div className='flex flex-row justify-center w-full'>
                    <input value={inputValue} onChange={handleChange} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                    
                        <button className='py-3 px-4 mb-3' onClick={handleAdd}>
                            <FaPlus color="green"/>
                        </button>
                    </div>
                    <p className='text-red-800'>{SpecializationError}</p>
                    <ul className='flex flex-col justify-between w-full'>
                        {values && values?.map((value, index) => (
                            <li className='text-green-700' key={index}>
                            {value}
                            <button className='py-3 px-4 mb-3' onClick={() => handleRemove(index)}><FaMinus color='red'/></button>
                            </li>
                        ))}
                     </ul>
                   

                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Course Type
                    </label>
                    <Select defaultValue={graduationType} onChange={event=>handleGradType(event)} >
                        <Option value ="PG">PG</Option>
                        <Option value="UG"> UG</Option>
                        <Option value="Diploma"> Diploma</Option>
                        <Option value="Diploma"> PG/Diploma</Option>
                    </Select>
                 
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Short Name
                    </label>
                    <input value={shortName} onChange={handleShortNameChange} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
               
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Duration
                    </label>
                    <input value={duration} onChange={handleDurationChange} 
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    id="grid-first-name" 
                    type="number" placeholder="Duration"/>
                 
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Number of sem
                    </label>
                    <input value={semester} onChange={handleSemesterChange} 
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    id="grid-first-name" type="number" placeholder="Number of semester"/>
                    
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 block">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Eligibility criteria
                    </label>
                    <div className='grid grid-cols-2 gap-1'>
                        <div className='flex flex-row justify-start items-center'>
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold" for="grid-first-name">
                                High School (10th)
                            </label>
                            <div className="flex-grow"></div>
                            <input 
                            id="high-school"
                            className="ml-2" 
                            type='checkbox'
                            onChange={() => handleCheckboxChange('high-school')}
                            checked={checkedValues.includes('high-school')}
                            />
                        </div>
                        <div className='flex flex-row justify-start'>
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold" for="grid-first-name">
                                Inter
                            </label>
                            <div className="flex-grow"></div>
                            <input 
                            id='Inter'
                            className="ml-2" 
                            type='checkbox' 
                            onChange={() => handleCheckboxChange('Inter')}
                            checked={checkedValues.includes('Inter')}
                            />
                        </div>
                        <div className='flex flex-row justify-start'>
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold" for="grid-first-name">
                                Diploma
                            </label>
                            <div className="flex-grow"></div>
                            <input
                             id='Diploma'
                             className="ml-2" 
                             onChange={() => handleCheckboxChange('Diploma')}
                             checked={checkedValues.includes('Diploma')}
                             type='checkbox' />
                        </div>
                        <div className='flex flex-row justify-start'>
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold" for="grid-first-name">
                                UG
                            </label>
                            <div className="flex-grow"></div>
                            <input 
                            id="UG"
                            className="ml-2" 
                            type='checkbox'
                            onChange={() => handleCheckboxChange('UG')}
                            checked={checkedValues.includes('UG')}
                            />
                        </div>
                        <div className='flex flex-row justify-start'>
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold" for="grid-first-name">
                                PG
                            </label>
                            <div className="flex-grow"></div>
                            <input 
                            id="PG"
                            className="ml-2" 
                            type='checkbox'
                            onChange={() => handleCheckboxChange('PG')}
                            checked={checkedValues.includes('PG')}
                            />
                        </div>
                        <div className='flex flex-row justify-start'>
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold" for="grid-first-name">
                                other
                            </label>
                            <div className="flex-grow"></div>
                            <input 
                            id="other"
                            className="ml-2" 
                            type='checkbox' 
                            onChange={() => handleCheckboxChange('other')}
                            checked={checkedValues.includes('other')}
                            />
                        </div>

                       
                    </div>
                </div>
                
        
           
            </div>
 
            <div className='flex flex-row justify-between mb-6 mt-10'>
               
                <button  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">RESET</button>
                { createLoading ? <Loader />   :
                <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">SUBMIT</button>
                }
                </div>        
        </form>}
    </div>
  )
}
