import React, { useState, useContext } from 'react';
import '../messagePage/MessagePage.scss';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
//import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import message_service from '../../services/message.service';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import axios from "axios";
import { messageResult } from '../../slices/messageSlice';

const MessagePage = () => {
    const { t } = useTranslation();
    //const token = useSelector((state) => state.auth.token !== null ? state.auth.token : localStorage.getItem('token') !== null ? localStorage.getItem('token') : null);
    //const navigate = useNavigate();
    const dispatch = useDispatch();
    const messageState = useSelector((state) => state.message)
    const [messageForm, setMessageForm] = useState({
        username: "",
        email: "",
        message: "",
    })
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);

    const setValueForm = (value) => {
        return setMessageForm((current) => {
            return { ...current, ...value }
        })
    }

    const submit = (email,message,username) => {
        const emailTrim = email.trim();
        const messageTrim= message.trim();
        const usernameTrim = username.trim()
        axios.post(process.env.REACT_APP_API_URL+"api/simpleMessage", {email: emailTrim,message: messageTrim,username: usernameTrim})
        .then((res) => {
            dispatch(messageResult(res.data))
            setMessageForm({email:"",message:"",username:""})
            return res;
        })
        .catch((err) => {
            dispatch(messageResult(err.response.data))
            return err;
        })
    }
    
    return (
        <main>
            <section className={`messagePage ${theme}`}>
                <div className="messagePage__wrapper">
                    <form onSubmit={(e) => {e.preventDefault();submit(messageForm.email,messageForm.message,messageForm.username)}} className='messagePage__form' noValidate>
                        <h1 className="messagePage__form__text">{t('send_simple_message')}</h1>

                        <div className="messagePage__form__label-input">
                            <label htmlFor="usernameMessage">{t('name')}</label>
                            <TextField
                                id="usernameMessage"
                                variant="outlined"
                                className="messagePage__form__input"
                                type="text"
                                size="small"
                                value={messageForm.username}
                                onChange={(e) => { setValueForm({ username: e.target.value }) }}
                            />
                        </div>

                        <div className="messagePage__form__label-input">
                            <label htmlFor="emailMessage">{t('email')}</label>
                            <TextField
                                id="emailMessage"
                                variant="outlined"
                                className="messagePage__form__input"
                                type="email"
                                size="small"
                                value={messageForm.email}
                                onChange={(e) => { setValueForm({ email: e.target.value }) }}
                            />
                        </div>

                        <div className="messagePage__form__label-input">
                            <label htmlFor="messageMessage">{t('message')}</label>
                            <TextField
                                id="messageMessage"
                                variant="outlined"
                                className="messagePage__form__input"
                                type="text"
                                size="small"
                                multiline
                                rows={4}
                                value={messageForm.message}
                                onChange={(e) => { setValueForm({ message: e.target.value }) }}
                            />
                        </div>

                            <Button type="submit" variant="text" style={{ textTransform: "none" }}>{t('send')}</Button>

                        {
                            messageState.status === "fail" || messageState.status === "success" ? 
                                <Chip
                                style={{ height: "auto", padding: ".5rem" }}
                                label={<Box sx={{ whiteSpace: "break-spaces", textAlign: "center" }}>{t(messageState.code_msg)} </Box>}
                                color={messageState.status === "success" ? "success" : messageState.status === 'fail' ? "error" : null} />
                            : messageState.status === 'initial' ? null : null
                        }

                    </form>
                </div>
            </section>
        </main>
    )
}

export default MessagePage