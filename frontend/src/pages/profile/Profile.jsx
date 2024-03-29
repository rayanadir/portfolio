import React, { useState, useContext, useEffect } from 'react'
import '../profile/Profile.scss'
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import moment from 'moment/min/moment-with-locales';
import ProfileContact from '../../containers/profileContact/ProfileContact';

const Profile = () => {
    const { t } = useTranslation();
    document.title=t('profile')
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);
    const token = useSelector((state) => state.auth.token !== null ? state.auth.token : localStorage.getItem('token') !== null ? localStorage.getItem('token') : null);
    const changePasswordState = useSelector((state) => state.auth.change_password);
    useEffect(() => {
        if (token === null || !token) {
            navigate('/authentication')
        }

        axios.post(process.env.REACT_APP_API_URL+"api/getUser", { token }, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((res) => {
                setUser(res.data.user)
                sessionStorage.setItem('userId', res.data.user.userId)
            })
            .catch((err) => {
                //console.log(err);
            });
            document.querySelector('.header').style.display="block"
            document.querySelector('.footer').style.display="block"
    }, [navigate, token, changePasswordState.status])

    const formatDate = () => {
        const lang = localStorage.getItem('lang') || localStorage.getItem('i18nextLng')
        moment.locale(lang)
        return moment(user.last_login).format('LLLL')
    }


    return (
        <main>
            <section className={`profile ${theme}`}>
                {
                    user !== null ?
                        <div className="profile__wrapper">
                            <article className="profile__welcome">
                                <h1 className="profile__welcome__welcomeMessage">{t('welcome_username', { username: user.username })}</h1>
                                <p className="profile__welcome__lastlogin">{t('last_login')} : {formatDate()}</p>
                            </article>

                            <article className='profile__profile'>
                                <div className="profile__profile__contact">
                                    <ProfileContact user={user} />
                                </div>
                            </article>
                        </div>
                        : null
                }
            </section>
        </main>

    )
}

export default Profile