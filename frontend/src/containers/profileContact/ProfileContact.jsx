import React, { useEffect, useContext } from 'react';
import '../profileContact/ProfileContact.scss';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import conversation_service from '../../services/conversation.service';
import moment from 'moment/min/moment-with-locales';
import useConversations from '../../pages/conversation/useConversations';
import useSingleConversation from '../../pages/conversation/useSingleConversation';
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeContext } from '../../context/ThemeContext';
import useMessages from "../../pages/simpleMessage/useMessages"


const ProfileContact = ({ user }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token !== null ? state.auth.token : localStorage.getItem('token') !== null ? localStorage.getItem('token') : null);
    const { conversations } = useConversations();
    const { conversation } = useSingleConversation();
    const { messages } = useMessages()

    useEffect(() => {
        if (user.isAdmin) {
            conversation_service.getConversations(user.userId)
        }
    }, [token, user.isAdmin, user.userId])

    const formatDate = (date) => {
        moment.locale(localStorage.getItem('lang'))
        return moment(date).format('ll')
    }

    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <article className='profileContact'>
            {
                user.isAdmin === true ?
                    <section>
                        {
                            conversations && conversations !== null && conversations !== undefined && conversations.length > 0 ?
                                <>

                                    <Accordion style={{
                                        background: theme === "dark" ? "#121212" : theme === "light" ? 'rgb(255, 255, 252)' : null,
                                        color: theme === "dark" ? "white" : theme === "light" ? 'black' : null
                                    }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ color: theme === "dark" ? "white" : theme === "light" ? "black" : null }} />}
                                            aria-controls="messages-content"
                                            id="messages-header"
                                        >
                                            <h2 className='profileContact__title'>{t('last_messages')}</h2>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <ul className="profileContact__list">
                                                {
                                                    messages.map((message, i) => {
                                                        return <li key={i} className='profileContact__list__element' onClick={() => { navigate(`/message/${message.id}`) }}>
                                                            <div className='profileContact__list__element__name-time'>
                                                                <p className='profileContact__list__element__name-time__name'>{message.username}</p>
                                                                <p className='profileContact__list__element__name-time__time'>{formatDate(message.date)}</p>
                                                            </div>
                                                            <p className='profileContact__list__element__text'>{message.message}</p>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion style={{
                                        background: theme === "dark" ? "#121212" : theme === "light" ? 'rgb(255, 255, 252)' : null,
                                        color: theme === "dark" ? "white" : theme === "light" ? 'black' : null
                                    }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ color: theme === "dark" ? "white" : theme === "light" ? "black" : null }} />}
                                            aria-controls="conversations-content"
                                            id="conversations-header"
                                        >
                                            <h2 className='profileContact__title'>{t('last_conversations')}</h2>
                                        </AccordionSummary>
                                        <AccordionDetails>

                                            <ul className='profileContact__list'>
                                                {
                                                    conversations.map((conversation, i) => {
                                                        const otherUser = conversation.users_arr.find(u => u.userId !== user.userId);
                                                        return <li key={i} className='profileContact__list__element' onClick={() => { navigate(`/conversation/${conversation.id}`) }}>
                                                            <div className='profileContact__list__element__name-time'>
                                                                <p className='profileContact__list__element__name-time__name'>{otherUser.username}</p>
                                                                <p className='profileContact__list__element__name-time__time'>{formatDate(conversation.messages[conversation.messages.length - 1].date)}</p>
                                                            </div>
                                                            <p className='profileContact__list__element__text'>{conversation.messages[conversation.messages.length - 1].userId === user.userId ? `${t('you')}` : ""}{conversation.messages[conversation.messages.length - 1].message}</p>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </AccordionDetails>
                                    </Accordion>



                                </>
                                : conversations && conversations.length === 0 ?
                                    <p className='profileContact__noMessages'>{t('no_message_yet')}</p>
                                    : !conversations || conversations === null || conversations === undefined ?
                                        <>
                                        </>
                                        : null
                        }
                    </section>
                    : user.isAdmin === false ?
                        <section>
                            {
                                conversation && conversation.code_msg === "no_conversation_started" ?
                                    <>
                                        <h2 className='profileContact__title'>{t('start_new_conversation')}</h2>
                                        <Button id="new_conversation" onClick={() => {
                                            const userId = user.userId
                                            axios.post(process.env.REACT_APP_API_URL + "api/newConversation", { userId })
                                                .then((res) => {
                                                    if (res.data.id) {
                                                        navigate(`/conversation/${res.data.id}`)
                                                    }
                                                    return res;
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                    return err;
                                                })
                                        }} style={{ textTransform: "none" }}>{t('new_conversation')}</Button>
                                    </>
                                    : conversation && conversation.messages.length > 0 ?
                                        <>
                                            <h2 className='profileContact__title'>{t('follow_conversation')}</h2>
                                            <li className='profileContact__list__element' onClick={() => { navigate(`/conversation/${conversation.id}`) }}>
                                                <div className='profileContact__list__element__name-time'>
                                                    <p className='profileContact__list__element__name-time__name'>{conversation.users_arr.find(u => u.userId !== user.userId).username}</p>
                                                    <p className='profileContact__list__element__name-time__time'>{formatDate(conversation.messages[conversation.messages.length - 1].date)}</p>
                                                </div>
                                                <p className='profileContact__list__element__text'>
                                                    {
                                                        conversation.messages[conversation.messages.length - 1].userId === user.userId ?
                                                            `${t('you')} : ` :
                                                            null
                                                    }
                                                    {conversation.messages[conversation.messages.length - 1].message}</p>
                                            </li>
                                        </>
                                        : conversation && conversation.messages.length === 0 ?
                                            <Button id="new_conversation" onClick={() => {
                                                navigate(`/conversation/${conversation.id}`)
                                            }} style={{ textTransform: "none" }}>{t('new_conversation')}</Button>
                                            : conversation && conversation.code_msg === "error" ?
                                                null : null
                            }
                        </section>
                        : null
            }
        </article>
    )
}

export default ProfileContact