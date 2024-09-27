import React from 'react'
import "./App.css"
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
import TapButton from './components/TapButton'

const App = () => {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter text-white'>
    <TapButton/>
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        

      </Routes>
    </div>
  )
}

export default App