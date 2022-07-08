import React from 'react'
import '../footer/Footer.scss'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='footer' id="footer">
        <p className='footer__element'>©{year}, Rayan Dahmena</p>
        <p className="footer__element">LinkedIn : <a href="https://www.linkedin.com/in/rayan-dahmena-5687b2244/" className='footer__link'>Rayan Dahmena</a></p>
        <p className='footer__element'>Email : rayan.dahmena@gmail.com</p>
        <p className='footer__element'>Github : <a href="https://github.com/rayanadir" className='footer__link'>https://github.com/rayanadir</a> </p>
    </footer>
  )
}

export default Footer