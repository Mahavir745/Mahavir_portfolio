import React from 'react'
import ProfileImg from './ProfileImg'
import ProfileKeys from './ProfileKeys'
import ProfileAbout from './ProfileAbout'
import ProfileSkills from './ProfileSkills'
import ProjectSection from './ProjectSection'

const Home = () => {
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:justify-center sm:gap-10'>
        <ProfileImg />
        <ProfileKeys />
      </div>
      <div>
        <ProfileAbout />
      </div>
      <div>
        <ProjectSection/>
      </div>
      <div className='gap-40 mt-20'>
        <ProfileSkills />
      </div>
    </>
  )
}

export default Home