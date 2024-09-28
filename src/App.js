import React, { useEffect, useState } from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
import TapButton from './components/TapButton'

const App = () => {


  const [username, setUsername] = useState('Atul');
console.log('username',username)
  // useEffect(() => {
  //   // Retrieve Telegram username and log it to console
  //   if (window.Telegram?.WebApp) {
  //     const tg = window.Telegram.WebApp;
  //     const user = tg.initDataUnsafe?.user;

  //     if (user?.username) {
  //       setUsername(user.username);
  //       console.log(`Telegram Username: ${user.username}`);
  //     } else {
  //       setUsername(null); // Set to null if no username is found
  //       console.log('No Telegram username detected');
  //     }
  //   }
  // }, []);

  if (!username) {
    return (
      <div className="container-fluid bg-dark  d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <header className="text-white">
          <p>It looks like you don't have a username set in Telegram.</p>
          <p>To use this app, please set a username in your Telegram settings:</p>
          <ol>
            <li>Open Telegram and go to "Settings".</li>
            <li>Tap on "Username".</li>
            <li>Set your desired username.</li>
          </ol>
          <p>After setting a username, refresh this page.</p>
        </header>
      </div>
    );
  }


  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col justify-center items-center font-inter text-white'>

        <Routes>
            <Route path='/' element={<TapButton user={username} />} />
        </Routes>

    </div>
  )
}

export default App