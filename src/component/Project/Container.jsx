import React, { useEffect, useState } from 'react'
import ProjectItems from './ProjectItems'
import js1 from "../../assets/assest09.png"
import js2 from "../../assets/assest10.png"
import js3 from "../../assets/assest11.png"
import React1 from "../../assets/assest12.png"
import React2 from "../../assets/assest13.png"
import React3 from "../../assets/assest14.png"
import upcoming from "../../assets/assest05.jpg";
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'


const Container = () => {
  const [storeSkills, setStoreSkills] = useState([])
  const [arrayLength, setArrayLength] = useState(5)

  const projectList = [
    {
      id: "project1",
      title: "TimeStamp Convertor",
      details: "",
      live_link: "https://mahavir745.github.io/Timestamp_convertor/",
      source_link: "https://github.com/Mahavir745/Timestamp_convertor",
      img: js1,
      section: "javascript",
    },
    {
      id: "project2",
      title: "Weather api",
      details: "",
      live_link: "https://mahavir745.github.io/Weather-API/",
      source_link: "https://github.com/Mahavir745/Weather-API",
      img: js2,
      section: "javascript",
    },
    {
      id: "project3",
      title: "Trivia Game",
      details: "",
      live_link: "https://mahavir745.github.io/trivia_game/",
      source_link: "https://github.com/Mahavir745/trivia_game",
      img: js3,
      section: "javascript",
    },
    {
      id: "project4",
      title: "TodoList",
      details: "",
      live_link: "https://todolist-phi-snowy.vercel.app/ ",
      source_link: "https://github.com/Mahavir745/todolist",
      img: React1,
      section: "react"
    },
    {
      id: "project5",
      title: "User-Profile",
      details: "",
      live_link: "https://user-profile-three-sigma.vercel.app/",
      source_link: "https://github.com/Mahavir745/userProfile",
      img: React2,
      section: "react"
    },
    {
      id: "project6",
      title: "Post Generator",
      details: "",
      live_link: "https://post-generator-rho.vercel.app/",
      source_link: "https://github.com/Mahavir745/post-generator",
      img: React3,
      section: "react"
    },
    {
      id: "project7",
      title: "Expense Tracker",
      details: "",
      live_link: "",
      source_link: "",
      img: upcoming,
      section: "react"
    },
    {
      id: "project7",
      title: "Task Management",
      details: "",
      live_link: "",
      source_link: "",
      img: upcoming,
      section: "react"
    },
    {
      id: "project8",
      title: "Surprise Gift",
      details: "",
      live_link: "",
      source_link: "",
      img: upcoming,
      section: "react"
    },
    {
      id: "project9",
      title: "QR Verify",
      details: "",
      live_link: "",
      source_link: "",
      img: upcoming,
      section: "react"
    }

  ]

  const handlemoreBtn = (value) => {
    if (arrayLength < projectList.length && value === "More") {
      setArrayLength(state => state + 5)
    } else {
      setArrayLength(5)

    }
  }

  useEffect(() => {
    let array = []
    for (let i = 0; i < arrayLength; i++) {
      if (i < projectList.length) {
        array.push(projectList[i])
      }
    }
    setStoreSkills(array)
  }, [arrayLength])

  return (
    <>
      <div className='h-[auto] flex gap-3 justify-center m-4 flex-wrap'>
        {storeSkills.map((item, index) => <ProjectItems key={index} project={item} />)}
      </div>
      <div className="relative">
        <button onClick={(e) => handlemoreBtn(e.target.innerText)} className=' pt-2 pb-2 pl-6 pr-6 text-violet-700 cursor-pointer flex items-center hover:font-bold gap-1 bottom-0 bg-violet-200 m-auto mb-2 rounded-md upDownAnimate'
          id={arrayLength > projectList.length ? "Less" : "More"}
        >
          {arrayLength >= projectList.length ? <span >Less</span> : <span >More</span>}
          {arrayLength >= projectList.length ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
        </button>
      </div>
    </>
  )
}

export default Container