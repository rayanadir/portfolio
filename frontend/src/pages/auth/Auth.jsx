import React, { useState, useContext } from 'react';
import '../auth/Auth.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ThemeContext } from '../../context/ThemeContext';

const Auth = () => {
    const [authType, setAuthType] = useState('login')
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);

    const active={
        backgroundColor:"#d2d2d2",
        textTransform:"none"
    }
    

        const setButtonFocus= (button) => {
            if(button==="login"){
                const register= document.getElementById('register_select');
                const login = document.getElementById('login_select');
                login.setAttribute('active',true)
                register.removeAttribute("active");
            }else if(button==="register"){
                const register= document.getElementById('register_select');
                const login = document.getElementById('login_select');
                login.removeAttribute('active');
                login.style.backgroundColor=""
                register.setAttribute('active',true)
            }
        }

    
    return (
        <main>
            <section className={`auth ${theme}`}>
                <div className="auth__wrapper">
                    <form action="" className='auth__form'>

                        <div className="auth__form__selectAuth">
                            <Button id="login_select" onClick={() => { setAuthType('login'); setButtonFocus("login")}} style={active} className="auth__form__selectAuth__button"  variant="text" >Connexion</Button>
                            <Button id="register_select" onClick={() => { setAuthType('register'); setButtonFocus("register") }} style={{textTransform:"none"}} className="auth__form__selectAuth__button" variant="text" >Inscription</Button>
                        </div>

                        {
                            authType === "login" ?
                                <div className="auth__form__form" id="loginForm">
                                    <h1 className="auth__form__form__login-register">Connectez-vous</h1>

                                    <label htmlFor="emailLogin">Email</label>
                                    <TextField
                                        required
                                        id="emailLogin"
                                        variant="outlined"
                                        type="email"
                                        className='auth__form__form__input'
                                        size='small'
                                    />

                                    <label htmlFor="passwordLogin">Mot de passe</label>
                                    <TextField
                                        required
                                        id="passwordLogin"
                                        variant="outlined"
                                        type="password"
                                        className='auth__form__form__input'
                                        size="small"
                                    />

                                    <Button variant="text" style={{textTransform:"none"}}>Connexion</Button>

                                </div>
                                : authType === "register" ?
                                    <div className="auth__form__form" id="registerForm">

                                        <h1 className="auth__form__form__login-register">Inscrivez-vous</h1>

                                        <label htmlFor="emailRegister">Email</label>
                                        <TextField
                                            required
                                            id="emailRegister"
                                            variant="outlined"
                                            type="email"
                                            size="small"
                                            className='auth__form__form__input'
                                        />

                                        <label htmlFor="usernameRegister">Nom d'utilisateur</label>
                                        <TextField
                                            required
                                            id="usernameRegister"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            className='auth__form__form__input'
                                        />

                                        <label htmlFor="createPasswordRegister">Créer mot de passe</label>
                                        <TextField
                                            required
                                            id="createPasswordRegister"
                                            variant="outlined"
                                            type="password"
                                            size="small"
                                            className='auth__form__form__input'
                                        />

                                        <label htmlFor="confirmPasswordRegister">Confirmer mot de passe</label>
                                        <TextField
                                            required
                                            id="confirmPasswordRegister"
                                            variant="outlined"
                                            size="small"
                                            className='auth__form__form__input'
                                        />

                                        <Button variant="text" style={{textTransform:"none"}}>Inscription</Button>

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