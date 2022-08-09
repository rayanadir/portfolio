import React, { useState } from 'react';
import '../profileContact/ProfileContact.scss';
import arrow from "../../img/arrow.svg"

const ProfileContact = ({ user }) => {

    const [contact, setContact] = useState('list');

    return (
        <article className='profileContact'>
            {
                user.isAdmin ?
                    <>
                        <h2 className='profileContact__lastMessages'>Derniers messages</h2>

                        {/*<p className='profileContact__noMessages'>Aucun message pour le moment</p>*/}

                        {
                            contact === 'list' ?
                                <ul className='profileContact__list'>
                                    <li className='profileContact__list__element' onClick={() => {setContact('selected')}}>
                                        <div className='profileContact__list__element__name-time'>
                                            <p className='profileContact__list__element__name-time__name'>Nom Prénom</p>
                                            <p className='profileContact__list__element__name-time__time'>Date</p>
                                        </div>
                                        <p className='profileContact__list__element__text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </li>
                                    <li className='profileContact__list__element'>
                                        <div className='profileContact__list__element__name-time'>
                                            <p className='profileContact__list__element__name-time__name'>Nom Prénom</p>
                                            <p className='profileContact__list__element__name-time__time'>Date</p>
                                        </div>
                                        <p className='profileContact__list__element__text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </li>
                                    <li className='profileContact__list__element'>
                                        <div className='profileContact__list__element__name-time'>
                                            <p className='profileContact__list__element__name-time__name'>Nom Prénom</p>
                                            <p className='profileContact__list__element__name-time__time'>Date</p>
                                        </div>
                                        <p className='profileContact__list__element__text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </li>
                                </ul>
                            : contact === 'selected' ?
                                <section className="profileContact__messages">
                                    <header className="profileContact__messages__header">
                                        <img src={arrow} id="messages_back" alt="back" onClick={()=>{setContact('list')}} className='profileContact__messages__header__arrow' />
                                        <h1 className="profileContact__messages__header__username">Prénom nom</h1>
                                    </header>
                                    <div className="profileContact__messages__conversation">

                                    </div>
                                    <div className='profileContact__messages__footer'>

                                    </div>
                                </section> 
                            : null
                        }



                    </>

                    : ""
            }
        </article>
    )
}

export default ProfileContact