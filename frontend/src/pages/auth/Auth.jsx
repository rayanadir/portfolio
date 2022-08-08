import React, { useState, useContext, useEffect } from 'react';
import '../auth/Auth.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ThemeContext } from '../../context/ThemeContext';
import Tooltip from '@mui/material/Tooltip';
import information from '../../img/information.svg';
import { useTranslation } from 'react-i18next';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import auth_service from '../../services/auth.service';
import { useSelector } from "react-redux";
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const [authType, setAuthType] = useState('login');
    const token = useSelector((state) => state.auth.token);
    useEffect(()=> {
       document.title=t(authType);
        if(token!==null){
            navigate('/profile');
        }
    },[t,authType,navigate, token])
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });

    const [registerForm, setRegisterForm] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    })

    const [emailForgotPassword, setEmailForgotPassword] = useState('')

    const [loginPassword, showLoginPassword] = useState(false);
    const [registerPassword, showRegisterPassword] = useState(false);
    const [registerConfirmPassword, showRegisterConfirmPassword] = useState(false);

    const handleShowPassword = (field) => {
        if(field==="login"){
            showLoginPassword(!loginPassword);
        }else if(field==="register"){
            showRegisterPassword(!registerPassword);
        }else if(field==="confirm"){
            showRegisterConfirmPassword(!registerConfirmPassword)
        }
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [checkbox, setCheckboxValue] = useState(false);

    let loginError = useSelector((state) => state.auth.login_error);
    let registerError = useSelector((state) => state.auth.register_error);
    let forgotState = useSelector((state) => state.auth.forgot_password);

    const updateForm = (value, form) => {
        return form((prev) => {
            return { ...prev, ...value }
        })
    }
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);

    

    const active = {
        backgroundColor: "#d2d2d2",
        textTransform: "none"
    }


    const setButtonFocus = (button) => {
        if (button === "login") {
            const register = document.getElementById('register_select');
            const login = document.getElementById('login_select');
            login.setAttribute('active', true)
            register.removeAttribute("active");
        } else if (button === "register") {
            const register = document.getElementById('register_select');
            const login = document.getElementById('login_select');
            login.removeAttribute('active');
            login.style.backgroundColor = ""
            register.setAttribute('active', true)
        }
    }

    const tooltipText = t('tooltipText');

    const onSubmit =  (e) => {
        e.preventDefault();
        if (authType === "login") {
            auth_service.login(loginForm.email,loginForm.password)
        } else if (authType === "register") {
            auth_service.register(registerForm.email,registerForm.username,registerForm.password,registerForm.confirmPassword)
        }else if (authType === "forgot"){
            auth_service.forgotPassword(emailForgotPassword)
        }
    }

    return (
        <main>
            <section className={`auth ${theme}`}>
                <div className="auth__wrapper">
                    <form onSubmit={(e) => { onSubmit(e) }} className='auth__form' noValidate>

                        <div className="auth__form__selectAuth">
                            <Button id="login_select" onClick={() => { setAuthType('login'); setButtonFocus("login") }} style={active} className="auth__form__selectAuth__button" variant="text" >{t('login')}</Button>
                            <Button id="register_select" onClick={() => { setAuthType('register'); setButtonFocus("register") }} style={{ textTransform: "none" }} className="auth__form__selectAuth__button" variant="text" >{t('register')}</Button>
                        </div>

                        {
                            authType === "login" ?
                                <div className="auth__form__form" id="loginForm">
                                    <h1 className="auth__form__form__login-register">{t('login')}</h1>

                                    <label htmlFor="emailLogin">{t('email')}</label>
                                    <TextField
                                        id="emailLogin"
                                        variant="outlined"
                                        type="email"
                                        className='auth__form__form__input'
                                        size='small'
                                        value={loginForm.email}
                                        onChange={(e) => { updateForm({ email: e.target.value }, setLoginForm) }}
                                    />

                                    <label htmlFor="passwordLogin">{t('password')}</label>
                                    <OutlinedInput
                                        id="passwordLogin"
                                        variant="outlined"
                                        type={loginPassword ? 'text' : 'password'}
                                        className='auth__form__form__input'
                                        size="small"
                                        value={loginForm.password}
                                        onChange={(e) => { updateForm({ password: e.target.value }, setLoginForm) }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={()=>{handleShowPassword("login")}}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                title={t('show_password')}
                                              >
                                                {loginPassword ? <VisibilityOff /> : <Visibility />}
                                              </IconButton>
                                            </InputAdornment>
                                          }
                                    />

                                    <div className="auth__form__form__options">
                                        <div className="auth__form__form__options__remember">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox value={checkbox} onChange={(e) => { setCheckboxValue(e.target.checked) }} size="small" style={{ padding: 0, color: theme === "dark" ? "white" : "black" }} className="auth__form__form__options__remember__checkbox" />
                                                }
                                                label={<Box sx={{fontSize:"14px", letterSpacing:"0"}}>{t('remember')}</Box>}
                                                style={{margin:0}}
                                            />
                                        </div>
                                        <div className="auth__form__form__options__forgot">
                                            <Button onClick={() => {setAuthType('forgot')}} variant="text" style={{ color: theme === "dark" ? "white" : "black", textTransform: "none", fontWeight: 100 }}>{t('forgot')}</Button>
                                        </div>
                                    </div>

                                    <em className="auth__form__form__bcrypt">{t('bcrypt')} <a href="https://www.npmjs.com/package/bcrypt" className="auth__form__form__bcrypt__link">bcrypt</a> </em>

                                    <Button type="submit" variant="text" style={{ textTransform: "none" }}>{t('login')}</Button>

                                     {loginError.code_msg !== "" ? <Chip style={{height:"auto", padding:".5rem"}} label={<Box sx={{whiteSpace:"break-spaces",textAlign:"center"}}>{t(loginError.code_msg)}</Box>} color="error" /> : null}

                                </div>
                            : authType === "register" ?
                                    <div className="auth__form__form" id="registerForm">

                                        <div className="auth__form__form__login-register-about">
                                            <Tooltip title={tooltipText}
                                                componentsProps={{
                                                    tooltip: {
                                                        sx: {
                                                            fontWeight: "100",
                                                            fontSize: "12px",
                                                        }
                                                    }
                                                }}
                                                enterTouchDelay={0}
                                                leaveTouchDelay={5000}
                                            >
                                                <Button sx={{ m: 0, width: 32, height: 32, borderRadius: 20, padding: 0, minWidth: 32, minHeight: 32 }}>
                                                    <img src={information} alt="information" className="auth__form__form__login-register-about__icon" id="information" />
                                                </Button>
                                            </Tooltip>
                                            <h1 className="auth__form__form__login-register">{t('register')}</h1>
                                        </div>


                                        <label htmlFor="emailRegister">{t('email')}</label>
                                        <TextField
                                            id="emailRegister"
                                            variant="outlined"
                                            type="email"
                                            size="small"
                                            className='auth__form__form__input'
                                            value={registerForm.email}
                                            onChange={(e) => { updateForm({ email: e.target.value }, setRegisterForm) }}
                                        />

                                        <label htmlFor="usernameRegister">{t('username')}</label>
                                        <TextField
                                            id="usernameRegister"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            className='auth__form__form__input'
                                            value={registerForm.username}
                                            onChange={(e) => { updateForm({ username: e.target.value }, setRegisterForm) }}
                                        />

                                        <label htmlFor="createPasswordRegister">{t('create_password')}</label>
                                        <OutlinedInput
                                            id="createPasswordRegister"
                                            variant="outlined"
                                            type={registerPassword ? 'text' : 'password'}
                                            size="small"
                                            className='auth__form__form__input'
                                            value={registerForm.password}
                                            onChange={(e) => { updateForm({ password: e.target.value }, setRegisterForm) }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                  <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={()=>{handleShowPassword("register")}}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    title={t('show_password')}
                                                  >
                                                    {registerPassword ? <VisibilityOff /> : <Visibility />}
                                                  </IconButton>
                                                </InputAdornment>
                                              }
                                        />

                                        <label htmlFor="confirmPasswordRegister">{t('confirm_password')}</label>
                                        <OutlinedInput
                                            id="confirmPasswordRegister"
                                            variant="outlined"
                                            type={registerConfirmPassword ? 'text' : 'password'}
                                            size="small"
                                            className='auth__form__form__input'
                                            value={registerForm.confirmPassword}
                                            onChange={(e) => { updateForm({ confirmPassword: e.target.value }, setRegisterForm) }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                  <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={()=>{handleShowPassword("confirm")}}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    title={t('show_password')}
                                                  >
                                                    {registerConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                  </IconButton>
                                                </InputAdornment>
                                              }
                                        />

                                        <em className="auth__form__form__bcrypt">{t('bcrypt')} <a href="https://www.npmjs.com/package/bcrypt" className="auth__form__form__bcrypt__link">bcrypt</a> </em>
                                        
                                        <Button type="submit" variant="text" style={{ textTransform: "none" }}>{t('register')}</Button>

                                        {registerError.code_msg !== "" ? <Chip style={{height:"auto", padding:".5rem"}} label={<Box sx={{whiteSpace:"break-spaces",textAlign:"center"}}>{t(registerError.code_msg)}</Box>} color="error" /> : null}

                                    </div>
                            : authType === "forgot" ?
                                <div className="auth__form__form" id="forgotPasswordForm">
                                    <h1 className="auth__form__form__forgot">
                                        {t('forgot')}
                                    </h1>
                                    <h3 className="auth__form__form__send">
                                        {t('send_email')}
                                    </h3>
                                    <label htmlFor="emailForgot">{t('email')}</label>
                                        <TextField
                                            id="emailForgot"
                                            variant="outlined"
                                            type="email"
                                            size="small"
                                            className='auth__form__form__input'
                                            value={emailForgotPassword}
                                            onChange={(e) => { setEmailForgotPassword(e.target.value) }}
                                        />

                                <Button type="submit" variant="text" style={{ textTransform: "none" }}>{t('send')}</Button>

                                {forgotState.status === 'fail' || forgotState.status === 'success' ?
                                 <Chip 
                                    style={{height:"auto", padding:".5rem"}}
                                    label={<Box sx={{whiteSpace:"break-spaces",textAlign:"center"}}>{t(forgotState.code_msg)} </Box>} 
                                    color={forgotState.status === "success" ? "success" : forgotState.status === 'fail' ? "error" : null }/> 
                                 : forgotState.status === 'initial' ? null : null}
                                </div>
                            : null
                        }
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Auth