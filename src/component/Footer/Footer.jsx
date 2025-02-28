import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='size-full h-40 flex justify-center bg-gradient-to-tr to-purple-700 from-cyan-800'>
      <div className='m-auto w-[40%] h-20 flex flex-col justify-center items-center'>
        <ul className='flex gap-4 justify-center items-center h-[40px] w-auto'>
          <li className='w-10 h-10 text-white flex items-center justify-center'><a target='_blank' href="https://github.com/Mahavir745"><FaGithub className='text-3xl'/></a></li>
          <li className='w-10 h-10 text-white flex items-center justify-center'><a target='_blank' href="https://www.linkedin.com/in/mahavir-kumar-mahato-4a6754297"><FaLinkedin className='text-3xl'/></a></li>
          <li className='w-10 h-10 text-white flex items-center justify-center'><a target='_blank' href="https://www.instagram.com/mveer745_ma"><FaInstagram className='text-3xl'/></a></li>
        </ul>
        <p className='text-center text-white'>Discover more of my work and connect with me on my social profiles.</p>
      </div>
    </div>
  )
}

export default Footer