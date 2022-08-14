import React, { useContext } from 'react'
import '../header/Header.scss';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

// Importations select
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Importations traduction
import { useTranslation } from "react-i18next";
import i18next from 'i18next';

import french from "../../img/flag/france-flag.png";
import uk from "../../img/flag/uk-flag.png";

import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../slices/projectsSlice';
import { changeSelectedLanguage } from '../../slices/languagesSlice';

import { ThemeContext } from '../../context/ThemeContext';

import SideMenu from './SideMenu';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import arrow from "../../img/arrow.svg"
import logout from "../../img/logout.svg";
import settings from "../../img/settings.svg"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import auth_service from '../../services/auth.service.js'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));


const Header = () => {
  let language = useSelector((state) => state.languages.language)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  const token = useSelector((state) => state.auth.token !== null ? state.auth.token : localStorage.getItem('token') !== null ? localStorage.getItem('token') : null);

  React.useEffect(() => {
    const languageInput = document.querySelector('.css-1d3z3hw-MuiOutlinedInput-notchedOutline');
    languageInput.id = "languageInput";
    const input = document.getElementById('languageInput');
    input.style.borderStyle = "none";
  }, [])

  const { toggleTheme, theme } = useContext(ThemeContext);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <header className={`header header_${theme}`}>
      <div className="header__wrapper">
        {
          location.pathname === "/" ?
            <div className="header__name_frontend">
              <h1 className='header__name'>Rayan Dahmena</h1>
              <h3 className='header__frontend'>{t('frontend_developer')}</h3>
            </div>
            :
            <Link to="/" className='header__link'>
              <img src={arrow} alt="back home" id="back_home" className='header__back' />
            </Link>
        }

        <nav className='header__nav'>
          <ul className='header__nav_list'>
              <li className='header__nav_element' onClick={() => {navigate(token!==null  && token ? "/profile" : "/authentication")}}>
                {t('contact')}
              </li>


            <Box>
              <FormControl fullWidth>
                <Select
                  value={language}
                  onChange={(e) => {
                    localStorage.setItem('lang', e.target.value);
                    i18next.changeLanguage(e.target.value);
                    dispatch(changeLanguage())
                    dispatch(changeSelectedLanguage(e.target.value))
                  }}
                  sx={{ height: "34px", borderRadius: "0", color: "white", fontWeight: '100' }}
                  id='language_button'
                  IconComponent={() => null}
                  className="select_header"
                >
                  <MenuItem value="fr" className="header__menuItem"><img className='header__flag' src={french} alt="french flag" id="french" /></MenuItem>
                  <MenuItem value="en" className="header__menuItem"><img className='header__flag' src={uk} alt="uk flag" id="uk" /></MenuItem>
                </Select>
              </FormControl>
            </Box>

            <MaterialUISwitch sx={{ m: 0 }} checked={theme === "dark" ? true : false} onChange={toggleTheme} />

            <li className='header__nav_element'>
              {t('about')}
            </li>

            {
              token !==null && token ? 
              <li className="header__nav_element">
                <img src={settings} onClick={() => {navigate("/settings")}} alt="settings" id="settings" className='header__icon'/>
              </li>
              : null
            }

            {
              token !== null && token ?
                <li className='header__nav_element'>
                  <img src={logout} onClick={handleClickOpen} alt="logout" id="logout" className='header__icon' />
                </li>
                : null
            }
          </ul>
          <SideMenu />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {t('logout')}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              {t('logout_confirmation')}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button style={{textTransform:"none"}} onClick={handleClose}>{t('cancel')}</Button>
              <Button style={{textTransform:"none"}} onClick={()=>{handleClose(); auth_service.logout()}}>{t('logout')}</Button>
            </DialogActions>
          </Dialog>
        </nav>
      </div>
    </header>
  )
}

export default Header