import React, { useContext, useEffect, useState } from 'react';
import '../simpleMessage/SimpleMessage.scss'
import { ThemeContext } from '../../context/ThemeContext';
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment/min/moment-with-locales';

const SimpleMessage = () => {
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);
    let { id } = useParams();
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token !== null ? state.auth.token : localStorage.getItem('token') !== null ? localStorage.getItem('token') : null);
    const [message, setMessage] = useState({})
    
    useEffect(() => {
        if (token === null || !token) {
            navigate('/authentication')
        }

        axios.post(process.env.REACT_APP_API_URL+"api/getUser", {token}, {
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then((res) => {
            if(res.data.user.isAdmin === false){
                navigate('/profile')
            }
        })
        .catch(err => {
            navigate('/profile')
        })

        axios.post(process.env.REACT_APP_API_URL+"api/message", {id})
        .then((res) => {
            setMessage(res.data.messageData)
        })
        .catch((err) => {
            navigate('*')
        })
        
    },[id,navigate,token, setMessage])

    const formatDate = (date) => {
        moment.locale(localStorage.getItem('lang'))
        return moment(date).format('LLLL')
    }

    return (
        <main>
            <section className={`simpleMessage ${theme}`}>
                <div className="simpleMessage__wrapper">
                    {
                        message && message !== null && message !== undefined ?
                        <article className="simpleMessage__message">
                            <p className="simpleMessage__message__name">{message.username}</p>
                            <p className="simpleMessage__message__email">{message.email}</p>
                            <p className="simpleMessage__message__date">{formatDate(message.date)}</p>
                            <p className="simpleMessage__message__message">{message.message}</p>
                        </article>
                        :null
                    }
                </div>
            </section>
        </main>
    )
}

export default SimpleMessage