import React, { useState } from 'react'
import { FaJs, FaReact } from 'react-icons/fa'
import { IoArrowForwardOutline } from "react-icons/io5";
import { DiJavascript1 } from "react-icons/di";
import { Link } from 'react-router-dom';
import SubProject from '../Project/SubProject';

const ProjectSection = () => {

  const [state, setState] = useState(false);
  const [projectName, setProjectName] = useState("");

  const HandleProject = (project) => {
    if (project === projectName) {
      setState(false);
      setProjectName("");
    } else {
      setProjectName(project);
      setState(true);
    }
  };

  return (
    <div>
      <div>
        <h2 className='text-4xl font-bold text-center mb-4 bg-gradient-to-tr to-purple-700 from-cyan-800 text-white p-10'>Projects</h2>
        <div className=' h-48 flex justify-around items-center sm:justify-center sm:gap-10 sm:mt-10'>
          <div className='flex sm:w-[200px] sm:h-[220px] items-center flex-col justify-center p-4 rounded-sm shadow-xl  bg-slate-100 cursor-pointer hover:scale-95' style={{transition:"all .2s linear"}} onClick={() => { HandleProject("Javascript") }} id='javascipt'>
            <FaJs className='text-8xl text-violet-800' />
            <p className='font-medium text-gray-600'>Js Projects</p>
          </div>
          <div className='flex sm:w-[200px] sm:h-[220px] items-center p-4 rounded-sm bg-slate-100 shadow-xl  cursor-pointer hover:scale-95 flex-col justify-center' style={{transition:"all .2s linear"}} onClick={() => { HandleProject("React") }} id='react'>
            <FaReact className='text-8xl text-violet-800' />
            <p className='font-medium text-gray-600'>React Projects</p>
          </div>
        </div>
        <div className='text-center mt-10'>
          <p className='font-medium text-cyan-800 sm:w-[580px] m-auto sm:text-xl p-2'>Passionate about transforming innovative ideas into successful projects. With a focus on strategic leadership and collaboration, I drive impactful solutions that deliver measurable results and exceed expectations.</p>
        </div>
      </div>
      {state && <SubProject projectName={projectName}/>}
    </div>
  )
}

export default ProjectSection