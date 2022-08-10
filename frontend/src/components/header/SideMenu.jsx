import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import french from "../../img/flag/france-flag.png";
import uk from "../../img/flag/uk-flag.png";
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../slices/projectsSlice';
import { changeSelectedLanguage } from '../../slices/languagesSlice';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import { ThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

import menu from "../../img/hamburger-menu.svg";

import logout from "../../img/logout.svg";
import settings from "../../img/settings.svg"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { logoutAction } from '../../slices/authSlice';

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

const getWindowWidthDimensions = () => {
    const { innerWidth: width } = window;
    return {
        width,
    };
}

const useWindowWidthDimensions = () => {
    const [windowDimensions, setWindowDimensions] = React.useState(
        getWindowWidthDimensions()
    );

    React.useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowWidthDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

export default function SideMenu() {
    const [state, setState] = React.useState({ left: false });
    let language = useSelector((state) => state.languages.language)
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const { toggleTheme, theme } = React.useContext(ThemeContext)
    const { width } = useWindowWidthDimensions();
    React.useEffect(() => {
        const languageInput = document.querySelector('.css-1d3z3hw-MuiOutlinedInput-notchedOutline');
        languageInput.id = "languageInputDrawer";
        const inputDrawer = document.getElementById('languageInputDrawer');
        inputDrawer.style.borderWidth = "0";
    }, []);
    const token = useSelector((state) => state.auth.token !== null ? state.auth.token : localStorage.getItem('token') !== null ? localStorage.getItem('token') : null);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const list = (anchor) => (
        <Box
            sx={{ width: width * (2 / 3), height: "100%" }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
            className={theme}
        >
            <List style={{ display: "flex", flexDirection: "column", rowGap: "2rem", padding: '2rem 1rem' }}>
                <Link to="/authentication" className='header__link'>
                    <li className='header__nav_element' onClick={toggleDrawer(anchor, false)} style={{ display: "flex", alignItems: "center" }}>
                        {t('contact')}
                    </li>
                </Link>
                <li className=' hover_none'>
                    <label htmlFor="translation">{t('language')}</label>
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
                                sx={{ height: "34px", borderRadius: "0", color: "white", fontWeight: '100', p: 0 }}
                                id='language_button_drawer'
                                IconComponent={() => null}
                                itemID="itemId"
                                labelId='labelId'
                                className='select_sidemenu'
                            >
                                <MenuItem value="fr" className="header__menuItem"><img className='header__flag' src={french} alt="french flag" id="french" /></MenuItem>
                                <MenuItem value="en" className="header__menuItem"><img className='header__flag' src={uk} alt="uk flag" id="uk" /></MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </li>

                <li className=' hover_none'>
                    <label htmlFor="theme">{theme === "dark" ? t('dark_theme') : t('light_theme')}</label>
                    <MaterialUISwitch sx={{ m: 0 }} checked={theme === "dark" ? true : false} onChange={toggleTheme} />
                </li>

                <li className="header__nav_element" onClick={toggleDrawer(anchor, false)} style={{ display: "flex", alignItems: "center" }}>
                    {t('about')}
                </li>

                {
                    token !== null && token ?
                    <li className='header__nav_element' onClick={handleClickOpen}>
                        <p style={{margin:"0", wordBreak:"break-word"}}>{t('settings')}</p>
                        <img src={settings}  alt="settings" id="settings" className='header__settings header__icon' />
                    </li>
                    : null                    
                }
                
                {
                    token !== null && token ?
                        <li className='header__nav_element' onClick={handleClickOpen}>
                            <p style={{margin:"0", wordBreak:"break-word"}}>{t('logout')}</p>
                            <img src={logout}  alt="logout" id="logout" className='header__logoutIcon header__icon' />
                        </li>
                        : null
                }

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
                        <Button style={{textTransform:"none"}} onClick={()=> {dispatch(logoutAction());handleClose()} }>{t('logout')}</Button>
                    </DialogActions>
                </Dialog>
            </List>

        </Box >
    );

    return (
        <div>
            <React.Fragment key="left">
                <img src={menu} alt="menu" className={`header__menu-btn menu-btn_${theme}`} onClick={toggleDrawer("left", true)} />
                <Drawer
                    anchor="left"
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                >
                    {list("left")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
