import React from 'react'

const Contact = () => {
  return (
    <form className='w-[500px] m-auto mt-8 mb-8 rounded border p-2'>
      <h1 className='text-2xl p-2 text-center text-white bg-teal-600'>Feedback & Comment</h1>
      <div className=' h-[106px] pl-6 mt-2'>
        <label htmlFor="username" className='block text-gray-700'>Name: </label>
        <input type="text" id='username' placeholder='enter your name' name='username' className='border border-sky-200 w-[90%] h-[60px] rounded pl-6 mt-2 text-gray-700 focus:outline-emerald-600 '/>
      </div>
      <div className=' h-[106px] pl-6 mt-2'>
        <label htmlFor="email" className='block text-gray-700'>Email: </label>
        <input type="email" id='email' placeholder='eg: abc123@gmail.com' name='email' className='border border-sky-200 w-[90%] h-[60px] rounded pl-6 mt-2 text-gray-700 focus:outline-emerald-600 '/>
      </div>      
      <div className=' h-[206px] pl-6 mt-2'>
        <label htmlFor="feedback" className='block text-gray-700'>Feedback & comments: </label>
        <textarea rows={5} cols={40} id='feedback' name='feedback' placeholder='Feel free :) ' className='border resize-none border-sky-200 pl-6 mt-2 pt-2 rounded text-gray-700 focus:outline-emerald-600'></textarea>
      </div>     
       <div className='border h-[106px] flex flex-col items-center p-2 bg-gray-600 text-white'>
        <button type='submit' className='bg-teal-600 text-white rounded pl-12 pr-12 pt-4 pb-4 w-[440px] focus:scale-95 hover:bg-teal-500'> Submit </button>
        <p className='text-center mt-2'>Comments and feedback are end-to-end encrypted.</p>
      </div>

      <p className=' p-4'>
        <span className='text-red-700 font-semibold'>Note:</span> All information is private. Please keep it confidential. For inquiries, use the feedback form. <br/>Thank you.<br/><span className='text-teal-600'>Managed by Mveer745.</span></p>
    </form>
  )
}

export default Contact