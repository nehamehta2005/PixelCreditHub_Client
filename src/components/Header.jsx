import React from 'react'
import Navbar from './Navbar.jsx'
import Search from './Search.jsx'

function Header() {
  return (
    <div className='header'>
      <Navbar/>
      <Search/>
    </div>
  )
}

export default Header