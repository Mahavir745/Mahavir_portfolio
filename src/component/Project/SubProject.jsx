import React, { useEffect, useState } from 'react'
import { DiJavascript1 } from 'react-icons/di'
import { FaReact } from 'react-icons/fa'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import upcoming from "../../assets/assest05.jpg"
import js1 from "../../assets/assest09.png"
import js2 from "../../assets/assest10.png"
import js3 from "../../assets/assest11.png"
import React1 from "../../assets/assest12.png"
import React2 from "../../assets/assest13.png"
import React3 from "../../assets/assest14.png"



const SubProject = ({ projectName }) => {

  const [toggleData,setToggleData] = useState([])
  const subProjectData = [
    {
      project_name: "TimeStramp",
      id: "js1",
      link: "https://mahavir745.github.io/Timestamp_convertor/",
      img: js1,
      section: "Javascript"
    },
    {
      project_name: "WeatherAPI",
      id: "js2",
      link: "https://mahavir745.github.io/Weather-API/",
      img: js2,
      section: "Javascript"
    },
    {
      project_name: "Trivia Game",
      id: "js3",
      link: "https://mahavir745.github.io/trivia_game/",
      img: js3,
      section: "Javascript"
    },
    {
      project_name: "TodoList",
      id: "React1",
      link: "https://todolist-phi-snowy.vercel.app/ ",
      img: React1,
      section: "React"
    },
    {
      project_name: "User Profile",
      id: "React2",
      link: "https://user-profile-three-sigma.vercel.app/",
      img: React2,
      section: "React"
    },
    {
      project_name: ",Post Generator",
      id: "React3",
      link: "https://post-generator-rho.vercel.app/",
      img: React3,
      section: "React"
    }
  ];

  useEffect(()=>{
    let data = subProjectData.filter((item)=> item.section === projectName)
    setToggleData(data)
  },[projectName])

  return (
    <div 
    className='h-auto w-full lg:justify-center p-4 flex mt-2 items-center gap-4 overflow-x-scroll pl-2 pr-2 removeScroll popupAnimation'>
      {
        toggleData.map((item) => (
          <div className='shadow-xl sm:w-[300px] bg-slate-100 sm:h-[340px] w-48 p-4 flex gap-4 flex-col items-center justify-center rounded-md relative flex-shrink-0' key={item.id}>
            <span className='absolute top-0 left-0 text-[18px] sm:text-[34px]'>
              {projectName === "React" ? <FaReact className='text-violet-600' /> : <DiJavascript1 className='text-violet-600' />}
            </span>
            <div className=' w-40 h-40 sm:w-[260px] sm:h-[240px]'>
              <img src={item.img} alt="" />
            </div>
            <p className='font-medium text-gray-500'>{item.project_name}</p>
            <a className='text-sky-400' href='/' target='_blank'>Demo</a>
          </div>
        ))
      }
      <div className='flex-shrink-0 shadow-xl'>
        <Link to={"/project"} className='flex items-center gap-2 bg-violet-400 p-2 pl-4 rounded-full'>
          <p className='font-medium text-white'>View all</p>
          <IoArrowForwardOutline />
        </Link>
      </div>
    </div>
  )
}

export default SubProject