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
import moment from 'moment/min/moment-with-locales';

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
    let { id } = useParams() || undefined;
    var conversationHeight;
    const { height, width } = useWindowDimensions();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('')
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);
    const token = useSelector((state) => state.auth.token !== null ? state.auth.token : localStorage.getItem('token') !== null ? localStorage.getItem('token') : null);
    const conversation = useSelector((state) =>  state.user.conversationData)
    const adminUser = useSelector((state) => state.user.adminUsername)
    const messageState = useSelector((state) => state.user.messageState);
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
                    conversation_service.getAdminUsername()
                    conversation_service.checkHasConversation(res.data.user.userId)
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

    conversationHeight = height - 168;

    const formatDate = (date) => {
        moment.locale(localStorage.getItem('lang'))
        return moment(date).format('LLLL')
    }

    return (
        <main>
            <section className={`conversation ${theme}`}>
                <div className="conversation__wrapper">
                    {
                        user !== null ?
                            <>
                                <header className="conversation__header" style={{backgroundColor: theme==="dark" ? "black" : "#e8e8e8"}}>
                                    <div className="conversation__conversation__wrapper" id='header_wrapper'>
                                        <img src={arrow} id="messages_back" alt="back" onClick={() => { navigate('/profile') }} className='conversation__header__arrow' />
                                        <h1 className="conversation__header__username">
                                            {
                                                conversation && conversation.code_msg === "no_conversation_started" ?
                                                    adminUser
                                                : conversation && conversation.code_msg === "conversation_already_started" ?
                                                    conversation.conversation.username
                                                : null
                                            }
                                        </h1>
                                    </div>
                                </header>

                                <div className="conversation__conversation" style={{ height: `${conversationHeight}px` }}>
                                    <div className="conversation__conversation__wrapper" id="chat_section">
                                        {
                                            conversation && conversation.code_msg === "no_conversation_started" ?
                                                <div className="conversation__conversation__wrapper__container">
                                                    <h2 className="conversation__conversation__wrapper__container__welcome">Bienvenue sur la page de conversation privée</h2>
                                                    <p className="conversation__conversation__wrapper__container__send">Envoyez à {adminUser} un premier message</p>
                                                </div>
                                            : conversation && conversation.code_msg === "conversation_already_started" ?
                                            <>
                                                {
                                                    conversation.conversation.messages.map((conversation) => {
                                                        return <Message 
                                                                message={conversation.message}
                                                                isAuthor={conversation.userId === user.userId ? true : false}
                                                                timestamp={formatDate(conversation.date)}
                                                                key={conversation.id}
                                                                />
                                                    })
                                                }
                                            </>
                                            : null
                                        }
                                    </div>
                                </div>

                                <div className='conversation__footer' style={{backgroundColor: theme==="dark" ? "black" : "#e8e8e8"}}>
                                    <div className="conversation__conversation__wrapper">
                                    <TextField
                                        multiline
                                        maxRows={3}
                                        placeholder="Entrez un message"
                                        className='conversation__footer__input'
                                        size='small'
                                        onChange={(e) => { setMessage(e.target.value) }}
                                        value={message}
                                    />
                                    <img onClick={() => { 
                                        if(conversation && conversation.code_msg === "no_conversation_started"){
                                            conversation_service.sendMessage(message, user.userId, id=undefined)
                                            if(messageState.code_msg==='first_message_sent'){
                                                navigate(`/conversation/${messageState.id}`)
                                            }
                                        }else if(conversation && conversation.code_msg === "conversation_already_started"){
                                            conversation_service.sendMessage(message, user.userId, id)
                                        }
                                        setMessage('')
                                    }} 
                                    src={send} alt="send" id="send" className='conversation__footer__send' />
                                    </div>
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