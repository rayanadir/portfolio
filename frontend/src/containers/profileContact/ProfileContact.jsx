import React, { useState } from 'react';
import '../profileContact/ProfileContact.scss';
import arrow from "../../img/arrow.svg";
import TextField from '@mui/material/TextField';
import send from '../../img/send.svg';

const getWindowDimensions = () => {
    const { innerWidth:width,innerHeight: height } = window;
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

const ProfileContact = ({ user }) => {

    const [contact, setContact] = useState('list');
    const { height,width } = useWindowDimensions();

    const handleConversation = (action) => {
        if(action==='select'){
            setContact('selected');
            document.body.style.overflow="hidden";
            document.querySelector('.profile__welcome').style.display="none"
        }else if(action==='close'){
            setContact('list');
            document.body.style.overflow="auto";
            document.querySelector('.profile__welcome').style.display="flex"
        }
    }
    var conversationHeight;
    if(width>=768){
        document.querySelector('.header').style.display="block"
    }
    if(contact==='list'){
        document.querySelector('.header').style.display="block"
    }
    if(contact==="selected" && width<768){
        document.querySelector('.header').style.display="none"
        conversationHeight = height-50
    }
    if(contact==="selected" && width>=768){
        conversationHeight = height-200
    }

    return (
        <article className='profileContact'>
            {
                user.isAdmin ?
                    <>
                        

                        {/*<p className='profileContact__noMessages'>Aucun message pour le moment</p>*/}

                        {
                            contact === 'list' ?
                                <>
                                <h2 className='profileContact__lastMessages'>Derniers messages</h2>
                                <ul className='profileContact__list'>
                                    <li className='profileContact__list__element' onClick={() => {handleConversation('select')}}>
                                        <div className='profileContact__list__element__name-time'>
                                            <p className='profileContact__list__element__name-time__name'>Nom Prénom</p>
                                            <p className='profileContact__list__element__name-time__time'>Date</p>
                                        </div>
                                        <p className='profileContact__list__element__text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </li>
                                    <li className='profileContact__list__element' onClick={() => {handleConversation('select')}}>
                                        <div className='profileContact__list__element__name-time'>
                                            <p className='profileContact__list__element__name-time__name'>Nom Prénom</p>
                                            <p className='profileContact__list__element__name-time__time'>Date</p>
                                        </div>
                                        <p className='profileContact__list__element__text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </li>
                                    <li className='profileContact__list__element' onClick={() => {handleConversation('select')}}>
                                        <div className='profileContact__list__element__name-time'>
                                            <p className='profileContact__list__element__name-time__name'>Nom Prénom</p>
                                            <p className='profileContact__list__element__name-time__time'>Date</p>
                                        </div>
                                        <p className='profileContact__list__element__text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </li>
                                </ul>
                                </>
                            : contact === 'selected' ?
                                <section style={{height: `${conversationHeight}px`}} className="profileContact__messages">
                                    
                                    <header className="profileContact__messages__header">
                                        <img src={arrow} id="messages_back" alt="back" onClick={()=>{handleConversation('close')}} className='profileContact__messages__header__arrow' />
                                        <h1 className="profileContact__messages__header__username">Prénom nom</h1>
                                    </header>
                                    
                                    <div className="profileContact__messages__conversation">
                                    
                                    </div>

                                    <div className='profileContact__messages__footer'>
                                        <TextField 
                                            multiline
                                            maxRows={3}
                                            placeholder="Entrez un message"
                                            className='profileContact__messages__footer__input'
                                            size='small'
                                        />
                                        <img src={send} alt="send" id="send" className='profileContact__messages__footer__send' />
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