import React from 'react'
import commingSoonImg from "../../assets/assest05.jpg"
import { RiLiveLine } from 'react-icons/ri'

const ProjectItems = () => {
  return (
  <div className='w-[400px] h-[500px] border rounded-xl  shadow-lg'>
    <div className='p-2 flex flex-col justify-center gap-2'>
      <h1 className='text-2xl text-center text-teal-900 font-semibold'>Project Title</h1>
      <details className='text-center text-blue-800 font-semibold text-[14px] h-[100px] cursor-pointer '>
        <p className='  text-[13px] overflowContainer p-4  text-gray-700'>Details</p>
      </details>
      <img src={commingSoonImg}className='h-[200px] rounded-md' alt="" />
      <div className='text-white flex justify-center items-center gap-6  p-5 h-[100px]' >
      <a href="" target='_blank'><button className='bg-teal-700 pl-8 pr-8 pt-2 pb-2 rounded flex items-center gap-2'>Live <RiLiveLine/></button></a>
      <a href="" target='_blank'><button className='bg-blue-700 pl-8 pr-8 pt-2 pb-2 rounded'>Source Code</button></a>
      </div>
    </div>
  </div>
  )
}

export default ProjectItems