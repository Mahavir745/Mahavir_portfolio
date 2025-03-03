import React, { useEffect, useState } from 'react'
import ProjectItems from './ProjectItems'
import js1 from "../../assets/assest09.png"
import js2 from "../../assets/assest10.png"
import js3 from "../../assets/assest11.png"
import React1 from "../../assets/assest12.png"
import React2 from "../../assets/assest13.png"
import React3 from "../../assets/assest14.png"
import upcoming from "../../assets/assest05.jpg";
import expense from "../../assets/assest15.png"
import taskManagement from "../../assets/assest16.png"
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
      details: "I built a to-do list app using React. It lets users add and delete tasks easily. The app is simple to use and helps me practice React basics, like managing state and creating components. It’s a great project to learn how to make interactive web apps.",
      live_link: "https://todolist-phi-snowy.vercel.app/ ",
      source_link: "https://github.com/Mahavir745/todolist",
      img: React1,
      section: "react"
    },
    {
      id: "project5",
      title: "User-Profile",
      details: "login and signup system with user-friendly validation. It allows new users to register and existing users to log in securely. Upon successful login, users are redirected to their unique profile page. The project demonstrates authentication, form validation, and routing in React.",
      live_link: "https://user-profile-three-sigma.vercel.app/",
      source_link: "https://github.com/Mahavir745/userProfile",
      img: React2,
      section: "react"
    },
    {
      id: "project6",
      title: "Post Generator",
      details: "I created a post generator using React JS and Bootstrap, where users can easily add posts by filling out a form. The app also loads some default posts from an API, so users can see existing posts when they visit the site.",
      live_link: "https://post-generator-rho.vercel.app/",
      source_link: "https://github.com/Mahavir745/post-generator",
      img: React3,
      section: "react"
    },
    {
      id: "project7",
      title: "Expense Tracker",
      details: "I built an expense tracker app with React.js, featuring an attractive login/signup process and a user-friendly dashboard. Users can add money, track their expenses, and easily manage their finances through a simple input section.",
      live_link: "https://expense-tracker-gray-kappa.vercel.app/",
      source_link: "https://github.com/Mahavir745/expense_tracker",
      img: expense,
      section: "react"
    },
    {
      id: "project7",
      title: "Task Management",
      details: "I created a React.js task manager with features like adding, editing, deleting, and completing tasks, filtering by priority and status, progress tracking, and pagination for efficient task management.",
      live_link: "https://task-manager-swart-six.vercel.app/",
      source_link: "https://github.com/Mahavir745/task-manager",
      img: taskManagement,
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