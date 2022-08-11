import React, { useState, useEffect } from 'react';
import '../profileContact/ProfileContact.scss';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import conversation_service from '../../services/conversation.service';


const ProfileContact = ({ user }) => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    return (
        <article className='profileContact'>
            {
                user.isAdmin === false ?
                    <section>
                        {/*<p className='profileContact__noMessages'>Aucun message pour le moment</p>*/}
                            <h2 className='profileContact__title'>Derniers messages</h2>
                            <ul className='profileContact__list'>
                                <li className='profileContact__list__element' onClick={() => { navigate('/conversation/1') }}>
                                    <div className='profileContact__list__element__name-time'>
                                        <p className='profileContact__list__element__name-time__name'>Nom Prénom</p>
                                        <p className='profileContact__list__element__name-time__time'>Date</p>
                                    </div>
                                    <p className='profileContact__list__element__text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </li>
                            </ul>
                    </section>
                    :
                    <section>
                        <h2 className='profileContact__lastMessages'>Démarrez une conversation</h2>
                        <Button id="new_conversation" onClick={() => { conversation_service.newConversation(user.userId) }} style={{ textTransform: "none" }}>Lancer conversation</Button>

                        <h2 className='profileContact__title'>Suivre ma conversation</h2>
                        <li className='profileContact__list__element' onClick={() => { navigate('/conversation/1') }}>
                            <div className='profileContact__list__element__name-time'>
                                <p className='profileContact__list__element__name-time__name'>Nom Prénom</p>
                                <p className='profileContact__list__element__name-time__time'>Date</p>
                            </div>
                            <p className='profileContact__list__element__text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </li>
                    </section>
            }
        </article>
    )
}

export default ProfileContact