import React from 'react'
import { HiOutlineUser } from 'react-icons/hi'
import { RecentTable } from '../components/UI/RecentTable'

export default function AdminDashboard() {
  return (
    <div className="PageContainer">
      <span className='text-4xl font-bold px-3 '>Dashboard</span>
      <div className='grid grid-cols-4 gap-4'>
          <div className='grid grid-cols-2 gap-4 m-3 p-3 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
              <div>
                <h1 className='text-black-400'>TOTAL CENTER</h1>
                <h1>0</h1>
              </div>
              <div className='flex justify-center items-center'>
                <HiOutlineUser className="h-12 w-12 inline" />
              </div>
              <div className='float-right'>
                <span>View All </span>
              </div>
          </div>
          <div className='grid grid-cols-2 gap-4 m-3 p-3 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
              <div>
                <h1 className='text-black-400'>TOTAL UNIVERSITY</h1>
                <h1>0</h1>
              </div>
              <div className='flex justify-center items-center'>
                <HiOutlineUser className="h-12 w-12 inline" />
              </div>
              <div className='float-right'>
                <span>View All </span>
              </div>
          </div>
          <div className='grid grid-cols-2 gap-4 m-3 p-3 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
              <div>
                <h1 className='text-black-400'>TOTAL STUDENT</h1>
                <h1>0</h1>
              </div>
              <div className='flex justify-center items-center'>
                <HiOutlineUser className="h-12 w-12 inline" />
              </div>
              <div className='float-right'>
                <span>View All </span>
              </div>
          </div>
          <div className='grid grid-cols-2 gap-4 m-3 p-3 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
              <div>
                <h1 className='text-black-400'>TOTAL ..</h1>
                <h1>0</h1>
              </div>
              <div className='flex justify-center items-center'>
                <HiOutlineUser className="h-12 w-12 inline" />
              </div>
              <div className='float-right'>
                <span>View All </span>
              </div>
          </div>
      </div>
      <div className='grid grid-cols-2 gap-4 m-3 p-3 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
          <div className='gap-4 m-3 p-3'>
            Recent Center
            <RecentTable />
          </div>
          <div className='gap-4 m-3 p-3'>
            Recent Admission
            <RecentTable />
          </div>
      </div>
    </div>
  )
}

