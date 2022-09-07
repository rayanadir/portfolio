import React, { useState, useContext, useEffect } from 'react';
import '../reset/Reset.scss'
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import auth_service from '../../services/auth.service';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress'

const Reset = () => {
    let { token } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isValidToken, setIsValidToken] = useState('')
    useEffect(() => {
        document.title = t('reset_password')
        if (!token) {
            setIsValidToken('invalid_token');
        }
        axios.post(process.env.REACT_APP_API_URL+"api/checkToken",{token})
        .then((res) => {
            setIsValidToken(res.data.code_msg)
        }).catch((err) => {
            setIsValidToken(err.response.data.code_msg)
        })

    }, [t,token,navigate])
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newPasswordField, showNewPassword] = useState(false);
    const [confirmNewPasswordField, showConfirmPassword] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);
    let resetState = useSelector((state) => state.auth.reset_password);
    let requestState = useSelector((state) => state.auth.request)

    const onSubmit = (e) => {
        e.preventDefault();
        auth_service.resetPassword(token,newPassword,confirmNewPassword)
    }
    const handleShowPassword = (field) => {
        if (field === "newPassword") {
            showNewPassword(!newPasswordField);
        } else if (field === "confirmNewPassword") {
            showConfirmPassword(!confirmNewPasswordField)
        }
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <main>
            <section className={`reset ${theme}`}>
                <div className="reset__wrapper">
                    {
                        isValidToken === "valid_token" ?
                        <form onSubmit={(e) => { onSubmit(e) }} className="reset__form">
                        <h1 className="reset__form__resetPassword">
                            {t('reset_password')}
                        </h1>
                        <h3 className="reset__form__newPassword">
                            {t('choose_new_password')}
                        </h3>

                        
                        <label htmlFor="newPassword">{t('new_password')}</label>
                        <OutlinedInput
                            id="newPassword"
                            variant='outlined'
                            type={newPasswordField ? 'text' : 'password'}
                            size="small"
                            className='reset__form__input'
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value) }}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => { handleShowPassword("newPassword") }}
                                        onMouseDown={(e) => { handleMouseDownPassword(e) }}
                                        edge='end'
                                        title={t('show_password')}
                                    >
                                        {newPasswordField ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                        <label htmlFor="confirmNewPassword">{t('confirm_new_password')}</label>
                        <OutlinedInput
                            id="confirmNewPassword"
                            variant='outlined'
                            type={confirmNewPasswordField ? 'text' : 'password'}
                            size="small"
                            className='reset__form__input'
                            value={confirmNewPassword}
                            onChange={(e) => { setConfirmNewPassword(e.target.value) }}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => { handleShowPassword("confirmNewPassword") }}
                                        onMouseDown={(e) => { handleMouseDownPassword(e) }}
                                        edge='end'
                                        title={t('show_password')}
                                    >
                                        {confirmNewPasswordField ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                        <em className="reset__form__bcrypt">{t('bcrypt')} <a href="https://www.npmjs.com/package/bcrypt" className="auth__form__form__bcrypt__link">bcrypt</a> </em>

                        <Button type="submit" variant="text" style={{ textTransform: "none" }}>{t('change')}</Button>

                        {requestState==="loading" ? <div style={{margin:"auto"}}> <CircularProgress color={theme==="dark" ? "inherit": theme==="light" ? "primary" : null} /> </div>: requestState==="none" ? null : null}

                        {resetState.status === 'fail' || resetState.status === 'success' ? 
                        <Chip 
                        style={{height:"auto", padding:".5rem"}}
                        label={<Box sx={{whiteSpace:"break-spaces",textAlign:"center"}}>{t(resetState.code_msg)} </Box>} 
                        color={resetState.status === "success" ? "success" : resetState.status === 'fail' ? "error" : null }/> 
                            : resetState.status === 'initial' ? null : null
                        }

                        {resetState.status === 'success' ? <Button variant="text" onClick={() => {navigate('/authentication')}} style={{ textTransform: "none" }}>{t('navigate_profile')}</Button> : null}
                        </form>
                        : isValidToken ==="invalid_token" ? 
                        <div className="reset__invalid">
                            <h1 className="reset__invalid__message">{t('invalid_link')}</h1>
                            <Button onClick={() => {navigate('/authentication')}} variant="text" style={{ textTransform: "none" }}>{t('back')}</Button>
                        </div> 
                        : null
                    }
                </div>
            </section>
        </main>
    )
}

export default Reset