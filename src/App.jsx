import React from 'react'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom'
import "./App.css"

const App = () => {
  return (
    <>
    <Header></Header>
    <Outlet/>
    <Footer></Footer>
    </>
  )
}

export default App