import React from 'react'
import {useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/LocationEvents'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/locations/:locationId/events', // Dynamic locationId parameter
      element: <LocationEvents />
    }
  ]);
  console.log('Routes rendered:', element);

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>EventSphere</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App;