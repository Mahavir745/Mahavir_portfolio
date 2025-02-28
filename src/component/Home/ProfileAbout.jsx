import React from 'react'
import { FaSchool } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { BiSolidSchool } from "react-icons/bi";

const ProfileAbout = () => {
  return (
    <div className=' text-white p-8 bg-gradient-to-tr to-teal-400 from-violet-600'>
      <h1 className='text-4xl text-center font-bold mb-4'>About us:</h1>
      <p className='text-center'>Explore the various stages and significant events that have defined my journey and contributed to my growth.</p>
      <ul className='w-[300px] sm:w-full lg:justify-center m-auto flex justify-evenly p-2 mt-8 gap-6 overflow-x-auto removeScroll'>
        <li style={{transition:"all .2s linear"}} className='w-[240px] h-[240px] rounded-2xl text-6xl text-center flex flex-col hover:scale-105 cursor-pointer items-center justify-center gap-20 bg-white text-gray-900 flex-shrink-0'>30+ <br /><span className='text-xl'>Projects</span></li>
        <li style={{transition:"all .2s linear"}} className='w-[240px] h-[240px] rounded-2xl text-6xl text-center flex flex-col hover:scale-105 cursor-pointer items-center justify-center gap-20 bg-gray-900 flex-shrink-0'>100+ <br /><span className='text-xl'>Responses</span></li>
        <li style={{transition:"all .2s linear"}} className='w-[240px] h-[240px] rounded-2xl text-6xl text-center flex flex-col hover:scale-105 cursor-pointer items-center justify-center gap-20 bg-white text-gray-900 flex-shrink-0'>100+ <br /><span className='text-xl'>Codechef Questions</span></li>
        <li style={{transition:"all .2s linear"}} className='w-[240px] h-[240px] rounded-2xl text-6xl text-center flex flex-col hover:scale-105 cursor-pointer items-center justify-center gap-20 bg-gray-900 flex-shrink-0 '>1.5+ <br /><span className='text-xl'>Year</span></li>
      </ul>
      
      {/* college life */}
      <div className='mt-20 w-full sm:w-[520px] sm:m-auto sm:mt-40 sm:bg-gradient-to-tr to-violet-200 from-violet-600 sm:shadow-lg sm:shadow-white p-4 rounded-md'>
        <h2 className='text-center text-4xl font-bold mt-8 mb-8'>Education:</h2>
         <div className='flex sm:w-full sm:h-40 sm:p-10 sm:right-20 items-center justify-between w-auto p-2 mb-4 bg-slate-100 rounded relative hover:scale-95 right-4' style={{transition:"all .2s linear"}}>
          <div>
            <FaSchool className='text-8xl text-violet-500'/>
          </div>
          <div className='font-bold'>
            <p className='text-2xl text-violet-500'>Matriculation</p>
            <p className='text-violet-500'>Year: 2020</p>
          </div>
         </div>
         <div className='flex sm:w-full sm:h-40 sm:p-10 sm:left-24 items-center justify-between w-auto p-2 mb-4 bg-violet-500 rounded relative hover:scale-95 left-6' style={{transition:"all .2s linear"}}>
          <div className='font-bold'>
            <p className='text-2xl text-slate-100'>Intermediate</p>
            <p>Year: 2022</p>
          </div>
          <div>
            <BiSolidSchool className='text-8xl'/>
          </div>
         </div>
         <div className='flex sm:w-full sm:h-40 sm:p-10 sm:right-20 items-center justify-between w-auto p-2 mb-4 bg-slate-100 rounded relative hover:scale-95 right-4' style={{transition:"all .2s linear"}}>
          <div>
            <IoSchool className='text-8xl text-violet-500'/>
          </div>
          <div className='font-bold'>
            <p className='text-2xl text-violet-500'>Graduation</p>
            <p className='text-violet-500'>Pursuing</p>
          </div>
         </div>
      </div>
    </div>
  )
}

export default ProfileAbout