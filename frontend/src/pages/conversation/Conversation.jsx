import React, { useEffect, useState, useContext, useRef } from 'react';
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
import useConversation from './useConversation';

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
    let { id } = useParams();
    sessionStorage.setItem("conversationId", id)
    var conversationHeight;
    const { height, width } = useWindowDimensions();
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

    const addMainProperties = () =>{
        let main = document.querySelector('main')
        main.style.position="fixed";
        main.style.width="100%"
    }

    const removeMainProperties = () => {
        let main = document.querySelector('main')
        main.style.position="initial";
        main.style.width="100%"
    }

    const formatDate = (date) => {
        moment.locale(localStorage.getItem('lang'))
        return moment(date).format('LLLL')
    }

    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    const messageRegex = /^[0-9a-zA-Z\-éëàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇÆæœ]{1,}$/;
    const messageTest = messageRegex.test(message);
    
    let style= {};

    if(!messageTest){
         style ={
            cursor:"auto",
            filter: "invert(0.4)"
        }
    }else if(messageTest){
         style ={
            cursor:"pointer",
            filter: "invert(1)"
        }
    }

    const conversation = useSelector((state) => state.user.conversationData)
    const adminUser = useSelector((state) => state.user.adminUsername)
    const { messages, sendMessage } = useConversation();
    const bottomRef = useRef(null);

    useEffect(() => {

        if (token === null || !token) {
            navigate('/authentication')
        }

        axios.post(process.env.REACT_APP_API_URL+"api/getUser", { token }, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((res) => {
                setUser(res.data.user)
                conversation_service.getAdminUsername()
                conversation_service.checkHasConversation(res.data.user.userId);
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
        addMainProperties()
        return () => {
            sessionStorage.removeItem('conversationId')
            document.body.style.overflow = "auto";
            removeMainProperties()
            if (width >= 768) {
                displayHeaderFooter()
            } else if (width < 768) {
                displayHeaderFooter()
            }
        }

    }, [navigate, token, width, id])

    conversationHeight = height - 168;



    const handleSendMessage = (e) => {
        e.preventDefault();
        if(user!==null){
            const userId = user.userId
            const date = new Date().toISOString()
            sendMessage(message,userId,date,id);
            setMessage('');
        }
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'auto'});
      }, [messages]);


    return (
        <main>
            <section className={`conversation ${theme}`}>
                <div className="conversation__wrapper">
                    {
                        user !== null && user !== undefined && user ?
                            <>
                                <header className="conversation__header" style={{ backgroundColor: theme === "dark" ? "black" : "#e8e8e8" }}>
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
                                            messages.length === 0 ?
                                            <div className="conversation__conversation__wrapper__container">
                                                <h2 className="conversation__conversation__wrapper__container__welcome">{t('conversation_welcome')}</h2>
                                                <p className="conversation__conversation__wrapper__container__send">{t('conversation_send', {adminUser})}</p>
                                            </div>
                                            : messages.length > 0 ?
                                            <>
                                            {
                                                messages.map((message,i) => {
                                                    return <Message
                                                            isAuthor={message.userId === user.userId ? true : false}
                                                            message={message.message}
                                                            timestamp={formatDate(message.date)}
                                                            key={i}
                                                    />
                                                })
                                            }
                                            </>
                                            : null
                                        }
                                        <div ref={bottomRef} />
                                    </div>
                                </div>

                                <div className='conversation__footer' style={{ backgroundColor: theme === "dark" ? "black" : "#e8e8e8" }}>
                                    <div className="conversation__conversation__wrapper">
                                        <TextField
                                            multiline
                                            maxRows={3}
                                            placeholder={t('enter_message')}
                                            className='conversation__footer__input'
                                            size='small'
                                            onChange={(e) => { setMessage(e.target.value) }}
                                            value={message}
                                        />
                                        <img style={style} onClick={(e) => { 
                                            if(messageTest){
                                                handleSendMessage(e)
                                            }
                                         }}
                                            src={send} alt="send" id="send" className='conversation__footer__send' />
                                    </div>
                                </div>
                            </>
                            : <div style={{ height: height }}></div>
                    }
                </div>
            </section>
        </main>
    )
}

export default Conversation