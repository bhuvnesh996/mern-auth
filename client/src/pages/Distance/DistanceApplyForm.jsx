import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import DistanceForm from '../../components/Distance/DistanceForm'

export default function DistanceApplyForm() {
    const universitySelect = useSelector(state=>state.user?.selectedUniversity?.university)
  
    return (
        <div className='p-5 m-5'>
            <div>
                <h1 className='text-5xl font-bold'>Apply Fresh Admission</h1>
            </div>

            { !universitySelect ? <Loader /> :
                <div className='mt-6'>
                    {universitySelect?.form?.form?.map(data => (
                        <div>
                          
                                <div>
        
                                    <DistanceForm data={data} />
                                </div>
                           
                        </div>
                    ))}
                     <div className="flex justify-end mt-5 p-5">
                        <button className='bg-cyan-200 rounded-xl text-white font-bold px-8 py-3' type="submit">Submit</button>
                    </div>
                </div>
            }
        </div>
    )
}
