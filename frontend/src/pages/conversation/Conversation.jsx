import React, { useEffect, useState, useContext } from 'react';
import '../conversation/Conversation.scss'
import arrow from "../../img/arrow.svg";
import send from "../../img/send.svg"
import Message from "../../components/message/Message"
import TextField from '@mui/material/TextField';
import conversation_service from "../../services/conversation.service";
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { ThemeContext } from '../../context/ThemeContext';
import axios from "axios";

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

const useWindowDimensions = () => {
    const [dimensions, setDimensions] = React.useState(
        getWindowDimensions()
    );

    React.useEffect(() => {
        function handleResize() {
            setDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return dimensions;
}


const Conversation = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams()
    var conversationHeight;
    const { height, width } = useWindowDimensions();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('')
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);
    const token = useSelector((state) => state.auth.token !== null ? state.auth.token : localStorage.getItem('token') !== null ? localStorage.getItem('token') : null);

    const hideHeaderFooter = () => {
        document.querySelector('.header').style.display = "none"
        document.querySelector('.footer').style.display = "none"
    }

    const displayHeaderFooter = () => {
        document.querySelector('.header').style.display = "block"
        document.querySelector('.footer').style.display = "block"
    }


    useEffect(() => {

        if (token === null || !token) {
            navigate('/authentication')
        }

        axios.post("http://localhost:5000/api/getUser", { token }, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((res) => {
                setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err);
            });

        document.body.style.overflow = "hidden";
        if (width >= 768) {
            hideHeaderFooter()
        } else if (width < 768) {
            hideHeaderFooter()
        }
        return () => {
            document.body.style.overflow = "auto";
            if (width >= 768) {
                displayHeaderFooter()
            } else if (width < 768) {
                displayHeaderFooter()
            }
        }
    }, [navigate, token, width])

    if (width >= 768) {
        conversationHeight = height - 170;
    } else if (width < 768) {
        conversationHeight = height - 170;
    }


    return (
        <main>
            <section className={`conversation ${theme}`}>
                <div className="conversation__wrapper">
                    {
                        user !== null ?
                            <>
                                <header className="conversation__header" style={{backgroundColor: theme==="dark" ? "black" : "#e8e8e8"}}>
                                    <img src={arrow} id="messages_back" alt="back" onClick={() => { navigate('/profile') }} className='conversation__header__arrow' />
                                    <h1 className="conversation__header__username">Prénom nom</h1>
                                </header>

                                <div className="conversation__conversation" style={{ height: `${conversationHeight}px` }}>
                                    {/*<Message message="Bonjour" isAuthor={true} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={false} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={true} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={false} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={true} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={false} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={true} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={false} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={true} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={false} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={true} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={false} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={true} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={false} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={true} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={false} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={true} timestamp={new Date().toISOString()} />
                                    <Message message="Bonjour" isAuthor={false} timestamp={new Date().toISOString()} />*/}
                                    
                                </div>

                                <div className='conversation__footer' style={{backgroundColor: theme==="dark" ? "black" : "#e8e8e8"}}>
                                    <TextField
                                        multiline
                                        maxRows={3}
                                        placeholder="Entrez un message"
                                        className='conversation__footer__input'
                                        size='small'
                                        onChange={(e) => { setMessage(e.target.value) }}
                                    />
                                    <img onClick={() => { 
                                        //conversation_service.sendMessage(message, user.userId, id)
                                    }} 
                                    src={send} alt="send" id="send" className='conversation__footer__send' />
                                </div>
                            </>
                        : <div style={{height:height}}></div>
                    }
                </div>
            </section>
        </main>
    )
}

export default Conversation