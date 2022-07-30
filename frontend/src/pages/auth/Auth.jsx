import React, { useState, useContext } from 'react';
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

const Auth = () => {
    const [authType, setAuthType] = useState('login');
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
    const [checkbox, setCheckboxValue] = useState(false);
    const updateForm = (value, form) => {
        return form((prev) => {
            return { ...prev, ...value }
        })
    }
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);

    const { t } = useTranslation();

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

    const onSubmit = async (e) => {
        e.preventDefault();
        if (authType === "login") {
            await auth_service.login(loginForm.email,loginForm.password)
            setLoginForm({ email: "", password: "" })
        } else if (authType === "register") {
            await auth_service.register(registerForm.email,registerForm.username,registerForm.password,registerForm.confirmPassword)
            setRegisterForm({ email: "", username: "", password: "", confirmPassword: "" })
        }
    }

    return (
        <main>
            <section className={`auth ${theme}`}>
                <div className="auth__wrapper">
                    <form onSubmit={(e) => { onSubmit(e) }} className='auth__form'>

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
                                    <TextField
                                        id="passwordLogin"
                                        variant="outlined"
                                        type="password"
                                        className='auth__form__form__input'
                                        size="small"
                                        value={loginForm.password}
                                        onChange={(e) => { updateForm({ password: e.target.value }, setLoginForm) }}
                                    />

                                    <div className="auth__form__form__options">
                                        <div className="auth__form__form__options__remember">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox value={checkbox} onChange={(e) => { setCheckboxValue(e.target.checked) }} size="small" style={{ padding: 0, color: theme === "dark" ? "white" : "black" }} className="auth__form__form__options__remember__checkbox" />
                                                }
                                                label={t('remember')}
                                                style={{margin:0}}
                                            />
                                        </div>
                                        <div className="auth__form__form__options__forgot">
                                            <Button variant="text" style={{ color: theme === "dark" ? "white" : "black", textTransform: "none", fontWeight: 100 }}>{t('forgot')}</Button>
                                        </div>
                                    </div>



                                    <Button type="submit" variant="text" style={{ textTransform: "none" }}>{t('login')}</Button>

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
                                        <TextField
                                            id="createPasswordRegister"
                                            variant="outlined"
                                            type="password"
                                            size="small"
                                            className='auth__form__form__input'
                                            value={registerForm.password}
                                            onChange={(e) => { updateForm({ password: e.target.value }, setRegisterForm) }}
                                        />

                                        <label htmlFor="confirmPasswordRegister">{t('confirm_password')}</label>
                                        <TextField
                                            id="confirmPasswordRegister"
                                            variant="outlined"
                                            type="password"
                                            size="small"
                                            className='auth__form__form__input'
                                            value={registerForm.confirmPassword}
                                            onChange={(e) => { updateForm({ confirmPassword: e.target.value }, setRegisterForm) }}
                                        />

                                        <Button type="submit" variant="text" style={{ textTransform: "none" }}>{t('register')}</Button>

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