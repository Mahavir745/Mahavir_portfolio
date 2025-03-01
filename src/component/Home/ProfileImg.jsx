import React from 'react'
import profileImage from '../../assets/adminPic4.png';

const ProfileImg = () => {
  return (
    <div className='flex w-auto items-center flex-col mt-4'>
      <div className='w-[300px] h-[300px]'>
        <img src={profileImage} alt="" className=' w-[100%] h-[100%] brightness-125 rounded-md' />
      </div>
      <div className='text-center p-3 w-[300px]'>
        <h1 className='text-4xl'>Mahavir Kumar Mahato</h1>
        <p className='text-right text-[20px] mt-4 text-indigo-900 font-semibold'>Frontend Developer</p>
      </div>
    </div>
  )
}

export default ProfileImg