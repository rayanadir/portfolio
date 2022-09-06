import React, { useContext } from 'react';
import '../contact/Contact.scss';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const { t } = useTranslation();
    const token = useSelector((state) => state.auth.token !== null ? state.auth.token : localStorage.getItem('token') !== null ? localStorage.getItem('token') : null);
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);


    return (
        <main>
            <section className={`contact ${theme}`}>
                <div className="contact__wrapper">
                    <h1 className="contact__title">{t('contact')}</h1>
                    <p className="contact__text">{t('contact_message')}</p>
                    <div className="contact__buttons">
                        <button className='contact__buttons__button message-btn' onClick={() => { navigate("/message") }}>{t('message')}</button>
                        <button className='contact__buttons__button conversation-btn' onClick={() => { navigate(token !== null && token ? "/profile" : "/authentication") }}>{t('conversation')}</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contact