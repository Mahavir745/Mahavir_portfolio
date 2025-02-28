
import React, { useEffect, useState } from 'react'
import { FaAngleDoubleUp,FaAngleDoubleDown, FaCss3, FaDatabase, FaHtml5, FaJs, FaPython, FaReact } from "react-icons/fa";
import { RiTailwindCssLine } from "react-icons/ri";
import { SiMongodb, SiNodedotjs } from "react-icons/si";

const ProfileSkills = () => {

  const [storeSkills, setStoreSkills] = useState([])
  const [arrayLength, setArrayLength] = useState(3)

  const skillData = [
    {
      icons: <FaHtml5 className='text-8xl' />,
      about: "HTML is the standard language used to create and design web pages. It structures the content on the web using a series of elements or 'tags' that define the structure of a page.",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      id: "html"
    },
    {
      icons: <FaCss3 className='text-8xl' />,
      about: "CSS is a style sheet language used for describing the presentation (look and feel) of a document written in HTML or XML. It controls the layout, design, colors, fonts, and other visual aspects of web pages.",
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      id: "css"
    },
    {
      icons: <RiTailwindCssLine className='text-8xl' />,
      about: "Tailwind CSS is a utility-first CSS framework that allows developers to design websites and applications quickly by applying pre-defined utility classes directly to HTML elements.",
      link: "https://tailwindcss.com/docs/installation",
      id: "tailwindcss"
    },
    {
      icons: <FaJs className='text-8xl' />,
      about: "JavaScript is a programming language that allows developers to create dynamic and interactive web pages. It is used for client-side (in the browser) and server-side (Node.js) development.",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      id: "javascript"
    },
    {
      icons: <FaReact className='text-8xl' />,
      about: "React is a JavaScript library for building user interfaces, particularly for single-page applications. It is maintained by Facebook and focuses on building reusable UI components. ",
      link: "https://react.dev/",
      id: "react"
    },
    {
      icons: <SiMongodb className='text-8xl' />,
      about: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It is designed for scalability, flexibility, and performance, making it popular for handling large amounts of unstructured or semi-structured data.",
      link: "https://www.mongodb.com/",
      id: "mongoDB"
    },
    {
      icons: <SiNodedotjs className='text-8xl' />,
      about: "Node.js is an open-source runtime that allows running JavaScript on the server-side, enabling fast, scalable applications. It uses an event-driven, non-blocking architecture, ideal for real-time, high-performance services.",
      link: "https://nodejs.org/api/documentation.html",
      id: "nodejs"
    },
    {
      icons: <FaPython className='text-8xl' />,
      about: "Python is a high-level, interpreted programming language known for its readability, simplicity, and versatility. It is widely used in web development, data science, automation, AI, and more.",
      link: "https://www.python.org/doc/",
      id: "python"
    },
  ]

  const handlemoreBtn = (value) => {
    if (arrayLength < skillData.length && value === "More") {
      setArrayLength(state => state + 3)
    }else{
      setArrayLength(3)
      
    }

    console.log(value)
  }

  useEffect(() => {
    let array = []
    for (let i = 0; i < arrayLength; i++) {
      if (i < skillData.length) {
        array.push(skillData[i])
      }
    }
    setStoreSkills(array)
  }, [arrayLength])

  return (
    <div className='w-full m-auto'>
      <h1 className='text-[40px] text-center mt-2 mb-2 p-2 text-white font-bold bg-gradient-to-tr to-purple-700 from-cyan-800'>Proficiencies: </h1>
      <p className='sm:text-xl text-center text-blue-900 font-medium text-[12px] m-4'>"Proficient in React, Tailwind CSS, Python, and MongoDB for building dynamic, scalable web applications."
      </p>
      <ul className='flex flex-wrap gap-10 m-auto p-4 justify-center items-center h-[auto]'>
        {storeSkills.map((item) => (
          <li className='w-[300px] h-[400px] p-4 flex-shrink-0 border shadow-lg rounded-xl flex flex-col gap-4 justify-center items-center' key={item.id}>
            {item.icons}
            <p className="text-gray-600 line-clamp-4">{item.about}</p>
            <a href={item.link} target='_blank' className='text-violet-600'>More Details..</a>
          </li>
        ))}
      </ul>
      <div className="relative">
        <button onClick={(e) => handlemoreBtn(e.target.innerText)} className=' pt-2 pb-2 pl-6 pr-6 text-violet-700 flex items-center hover:font-bold gap-1 bottom-0 bg-violet-200 m-auto mb-2 rounded-md upDownAnimate'
          id={arrayLength > skillData.length ? "Less":"More"} 
        >
          {arrayLength > skillData.length ? <span >Less</span> : <span >More</span>}
          {arrayLength > skillData.length ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
        </button>
      </div>
    </div>
  )
}

export default ProfileSkills