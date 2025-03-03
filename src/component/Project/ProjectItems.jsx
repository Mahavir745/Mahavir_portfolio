import React from 'react'
import { RiLiveLine } from 'react-icons/ri'
import { FaReact } from 'react-icons/fa'
import { DiJavascript1 } from 'react-icons/di'

const ProjectItems = ({ project }) => {
  return (
    <div className='w-[400px] h-[500px] rounded-xl  shadow-xl relative'>
      <div className='absolute top-0 left-0 text-[18px] sm:text-[34px]'>
        {project.section === "react" ? <FaReact className='text-violet-600' /> : <DiJavascript1 className='text-violet-600' />}
      </div>
      <div className='p-2 flex flex-col justify-center gap-2'>
        <h1 className='text-2xl text-center text-teal-900 font-semibold'>{project.title}</h1>
        <details className='text-center text-blue-800 font-semibold text-[14px] h-[100px] cursor-pointer flex flex-col overflow-y-scroll overFlowControl' open>
          <p className='  text-[13px] p-4  text-gray-700'>{project.details}</p>
        </details>
        <img src={project.img} className='h-[200px] rounded-md' alt="" />
        <div className='text-white flex justify-center items-center gap-6  p-5 h-[100px] ' >
          <a href={project.live_link} target='_blank'><button className='bg-teal-700 pl-8 pr-8 pt-2 pb-2 rounded flex items-center gap-2'>Live <RiLiveLine /></button></a>
          <a href={project.source_link} target='_blank'><button className='bg-blue-700 pl-8 pr-8 pt-2 pb-2 rounded overflow-hidden'> Code</button></a>
        </div>
      </div>
    </div>
  )
}

export default ProjectItems