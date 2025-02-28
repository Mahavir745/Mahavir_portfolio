import React, { useState } from 'react'
import Container from './Container'
import upcomming from "../../assets/assest05.jpg"
import qrverify from "../../assets/assest08.png"
import surprise_gift from "../../assets/assest07.png"
import expense from "../../assets/assest15.png"
import taskManagement from "../../assets/assest16.png"

const Project = () => {

  const [screenSize, setScreenSize] = useState(window.outerWidth)
  const updateProjects = [
    {
      image: taskManagement,
      id: "UP1",
      updateDate: "Upcoming"
    },
    {
      image: qrverify,
      id: "UP2",
      updateDate: "Upcoming"
    },
    {
      image: surprise_gift,
      id: "UP3",
      updateDate: "Upcoming"
    },
    {
      image: expense,
      id: "UP4",
      updateDate: "Upcoming"
    },
    {
      image: taskManagement,
      id: "UP5",
      updateDate: "Upcoming"
    },
    {
      image: qrverify,
      id: "UP6",
      updateDate: "Upcoming"
    },
  ]

  return (
    <div>
      <h1 className='text-4xl text-center p-4 bg-gray-700 text-white'>Projects</h1>
      {screenSize > 480 && <div className='flex overflow-x-scroll removeScroll h-[500px] lg:h-[600px] w-full p-4'>
        {updateProjects.map(item => (
          <div className='flex h-full w-full p-4 flex-shrink-0 relative slideAnimate bg-gradient-to-br to-cyan-300 from-violet-500'>
            <img src={item.image} alt="" className=' border rounded w-full object-contain bg-gradient-to-tr to-violet-400 from-sky-100' key={item.id} />
            <label htmlFor="" className='absolute bg-violet-800 p-2 pl-4 pr-4 text-white -rotate-45 left-0 top-10 shadow-lg shadow-sky-600'>{item.updateDate}</label>
          </div>
        ))}
      </div>}
      <p className='text-center  text-teal-900 p-4 lg:w-[800px] lg:m-auto lg:font-medium '>
        This section features a showcase of my technical skills in React and JavaScript. The projects demonstrate the application of these technologies to create dynamic and interactive web applications. Future enhancements will involve the integration of backend services.
      </p>
      <Container />
    </div>
  )
}

export default Project