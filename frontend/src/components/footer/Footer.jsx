import React from 'react'
import '../footer/Footer.scss'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='footer' id="footer">
        <p className='footer__element'>©{year}, Rayan Dahmena</p>
        <p className="footer__element"><a href="https://www.linkedin.com/in/rayan-dahmena/" className='footer__link'>LinkedIn</a></p>
        <p className='footer__element'><a href="https://github.com/rayanadir" className='footer__link'>Github</a></p>
        <p className='footer__element'>rayan.dahmena@gmail.com</p>
    </footer>
  )
}

export default Footer