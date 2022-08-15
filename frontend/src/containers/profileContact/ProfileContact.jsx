import React, { useEffect } from 'react';
import '../profileContact/ProfileContact.scss';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import conversation_service from '../../services/conversation.service';
import moment from 'moment/min/moment-with-locales';


const ProfileContact = ({ user }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token !== null ? state.auth.token : localStorage.getItem('token') !== null ? localStorage.getItem('token') : null);
    const conversations = useSelector((state) => state.user.conversationsData);
    const conversation = useSelector((state) =>  state.user.conversationData);
    console.log(conversation)
    useEffect(() => {
        if (user.isAdmin) {
            conversation_service.getConversations(user.userId)
        } else {
            conversation_service.checkHasConversation(user.userId)
            
        }
    }, [token, user.isAdmin, user.userId])

    const formatDate = (date) => {
        moment.locale(localStorage.getItem('lang'))
        return moment(date).format('LLLL')
    }

    return (
        <article className='profileContact'>
            {
                user.isAdmin === true ?
                    <section>
                        {
                            conversations.conversations && conversations.conversations.length > 0 ?
                                <>
                                    <h2 className='profileContact__title'>Derniers messages</h2>
                                    <ul className='profileContact__list'>
                                        {
                                            conversations.conversations.map((conversation) => {
                                                return <li key={conversation.id} className='profileContact__list__element' onClick={() => { navigate(`/conversation/${conversation.id}`) }}>
                                                    <div className='profileContact__list__element__name-time'>
                                                        <p className='profileContact__list__element__name-time__name'>{conversation.username}</p>
                                                        <p className='profileContact__list__element__name-time__time'>{formatDate(conversation.updatedAt)}</p>
                                                    </div>
                                                    <p className='profileContact__list__element__text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                </li>
                                            })
                                        }

                                    </ul>
                                </>
                                : conversations.conversations && conversations.conversations.length === 0 ?
                                    <p className='profileContact__noMessages'>Aucun message pour le moment</p>
                                    : null
                        }
                    </section>
                    : user.isAdmin === false ?
                    <section>
                        {
                            conversation && conversation.code_msg === "no_conversation_started" ?
                                <>
                                    <h2 className='profileContact__title'>Démarrez une conversation</h2>
                                    <Button id="new_conversation" onClick={() => { navigate('/conversation/new');/*conversation_service.newConversation(user.userId)*/ }} style={{ textTransform: "none" }}>Lancer conversation</Button>
                                </>
                                : conversation && conversation.code_msg === "conversation_already_started" ?
                                    <>
                                        <h2 className='profileContact__title'>Suivre ma conversation</h2>
                                        <li className='profileContact__list__element' onClick={() => { navigate(`/conversation/${conversation.conversation.id}`) }}>
                                            <div className='profileContact__list__element__name-time'>
                                                <p className='profileContact__list__element__name-time__name'>{conversation.conversation.username}</p>
                                                <p className='profileContact__list__element__name-time__time'>{formatDate(conversation.conversation.messages[0].date)}</p>
                                            </div>
                                            <p className='profileContact__list__element__text'>
                                                {
                                                    conversation.conversation.messages[0].userId === user.userId ?
                                                    "Vous : ":
                                                    null
                                                } 
                                            {conversation.conversation.messages[0].message}</p>
                                        </li>
                                    </>
                                : null
                        }
                    </section>
                    : null
            }
        </article>
    )
}

export default ProfileContact