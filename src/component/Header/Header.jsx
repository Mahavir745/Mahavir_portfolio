
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useAsyncError } from 'react-router-dom'
import profileLogo from "../../assets/assest04.svg"
import { MenuIcon } from 'lucide-react'
import { RxCross1 } from "react-icons/rx";

const Header = () => {

  const [menuState, setMenuState] = useState(false);
  const [foundWidth, setFoundWidth] = useState(window.outerWidth)
  const menuRef = useRef()
  const HandleToggle = () => {
    setMenuState(state => !state);
  }

  console.log(window.outerWidth)

  useEffect(() => {
    const HandleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuState(false);
      }
    };
    document.addEventListener("mousedown", HandleClickOutside);

    return () => {
      document.removeEventListener("mousedown", HandleClickOutside);
    }

  }, [])
  return (
    <div className='size-full h-40 bg-gray-900 flex items-center justify-between sm:justify-around p-2 text-white sticky top-0 z-50'>
      <div className=''>
        <img src={profileLogo} alt="" className='w-[200px] sm:w-[300px]' />
      </div>
      {foundWidth < 480 ?
      <div className='relative'>
        {!menuState ? <MenuIcon className='text-xl' onClick={HandleToggle} /> : <RxCross1 className='text-xl' onClick={HandleToggle} />}
        {menuState &&
          <ul className='flex gap-2 flex-col absolute bg-slate-300 p-2 right-[0px] w-[140px] rounded-md' ref={menuRef}>
            <NavLink className={({ isActive }) => `${isActive ? "text-gray-700" : "text-white"}`} to="/">
              <li className='font-bold hover:bg-slate-400 pl-4 pr-4 pt-2 pb-2 rounded-md'>Home</li>
            </NavLink>
            <NavLink className={({ isActive }) => `${isActive ? "text-gray-700" : "text-white"}`} to="/project">
              <li className='font-bold hover:bg-slate-400 pl-4 pr-4 pt-2 pb-2 rounded-md'>Project</li>
            </NavLink>          <NavLink className={({ isActive }) => `${isActive ? "text-gray-700" : "text-white"}`} to="/contact">
              <li className='font-bold hover:bg-slate-400 pl-4 pr-4 pt-2 pb-2 rounded-md'>Contact</li>
            </NavLink>
          </ul>}
      </div>
      : <div className='relative'>
        <ul className='flex gap-2 rounded-md'>
          <NavLink className={({ isActive }) => `${isActive ? "text-gray-700 bg-slate-200 rounded-md"  : "text-white"}`} to="/">
            <li className='font-bold hover:bg-gray-500 pl-4 pr-4 pt-2 pb-2 rounded-md'>Home</li>
          </NavLink>
          <NavLink className={({ isActive }) => `${isActive ? "text-gray-700 bg-slate-200 rounded-md" : "text-white"}`} to="/project">
            <li className='font-bold hover:bg-bg-gray-500 pl-4 pr-4 pt-2 pb-2 rounded-md'>Project</li>
          </NavLink>          <NavLink className={({ isActive }) => `${isActive ? "text-gray-700 bg-slate-200 rounded-md" : "text-white"}`} to="/contact">
            <li className='font-bold hover:bg-gray-500 pl-4 pr-4 pt-2 pb-2 rounded-md'>Contact</li>
          </NavLink>
        </ul>
      </div>}
    </div>
  )
}

export default Header