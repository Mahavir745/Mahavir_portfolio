
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import React from 'react'

const ProfileKeys = () => {
  return (
    <div className=' mt-3 rounded-md bg-white'>
      <ul className='w-[300px] m-auto sm:w-[400px]'>
        <li className='border p-4 mt-2 rounded-2xl text-1xl bg-slate-700 text-white'>Welcome to my portfolio!</li>
        <li className='border p-4 mt-2 rounded-2xl text-1xl bg-teal-600 text-white'>I’m thrilled to share my creative journey and showcase the projects.</li>
        <li className='border p-4 mt-2 rounded-2xl text-1xl bg-slate-700 text-white'>
          Hi, I’m Mahavir Kumar Mahato, a developer who loves turning ideas into beautiful, interactive web experiences. I specialize in creating user-friendly, responsive websites and web applications using the latest technologies and design principles.
        </li>
        <li className='border p-4 mt-2 rounded-2xl m-auto bg-teal-500 text-white'>Dive in to explore my work and let’s connect to bring new ideas to life!</li>
      </ul>

      <ul className='flex gap-4 justify-center items-center h-[60px] w-auto mt-4 mb-4'>
        <li className='w-10 h-10 text-slate-900 flex items-center justify-center animate-pulse spinComponent'><a target='_blank' href="https://github.com/Mahavir745"><FaGithub className="text-4xl" /></a></li>
        <li className='w-10 h-10 text-slate-900 flex items-center justify-center animate-pulse spinComponent'><a target='_blank' href="https://www.linkedin.com/in/mahavir-kumar-mahato-4a6754297"><FaLinkedin className="text-4xl" /></a></li>
      </ul>
      <div className="w-full flex justify-center mb-4">
        <a href="https://rxresu.me/mahavir777kumar/mahavir-kumar-mahato" target="_blank" className="border p-2 pl-4 pr-4 rounded-md font-medium border-violet-400 shadow-md shadow-violet-600 block w-[140px] hover:scale-95"
        style={{
          transition:"all .2s linear"
        }}
        >Download CV</a>
      </div>
    </div>
  )
}

export default ProfileKeys