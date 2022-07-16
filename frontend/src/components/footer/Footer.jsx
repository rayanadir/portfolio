import React, { useContext } from 'react';
import '../footer/Footer.scss';
import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {
  const year = new Date().getFullYear();
  // eslint-disable-next-line no-unused-vars
  const { toggleTheme, theme } = useContext(ThemeContext)
  return (
    <footer className={`footer ${theme}`} id="footer">
        <p className='footer__element'>©{year}, Rayan Dahmena</p>
        <p className="footer__element"><a href="https://www.linkedin.com/in/rayan-dahmena/" className='footer__link'>LinkedIn</a></p>
        <p className='footer__element'><a href="https://github.com/rayanadir" className='footer__link'>Github</a></p>
        <p className='footer__element'>rayan.dahmena@gmail.com</p>
    </footer>
  )
}

export default Footer