import React from 'react'
import ProjectItems from './ProjectItems'

const Container = () => {

  const projectList = [
    {
      id:"project1",
      title:"",
      details:"",
      live_link:"",
      sorce_code:""
    },
    {
      id:"project2",
      title:"",
      details:"",
      live_link:"",
      sorce_code:""
    },
    {
      id:"project3",
      title:"",
      details:"",
      live_link:"",
      sorce_code:""
    },
    {
      id:"project4",
      title:"",
      details:"",
      live_link:"",
      sorce_code:""
    },
    {
      id:"project5",
      title:"",
      details:"",
      live_link:"",
      sorce_code:""
    }

  ]

  return (
    <div className='h-[auto] flex gap-3 justify-center m-4 flex-wrap'>
      {projectList.map((item,index) => <ProjectItems key={index}/>)}
    </div>
  )
}

export default Container