import React from 'react'
import '../header/Header.scss'

const Header = () => {
  return (
    <header className='header'>
      <div className="header__wrapper">
        <div className="header__name_frontend">
          <h1 className='header__name'>Rayan Dahmena</h1>
          <h3 className='header__frontend'>Développeur Front-End React.js</h3>
        </div>
        <nav className='header__nav'>
          <ul>
            <li className='header__nav_element'>
              Contact
            </li>
            <li className='header__nav_element'>
              À propos
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header