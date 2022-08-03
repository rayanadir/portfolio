import React, { useEffect } from 'react'
import '../background/Background.scss';
import background2 from '../../img/main-background2.jpg';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

const Background = () => {
    useEffect(() => {
        const windowWidth = window.innerWidth; 
            const setBlur = () => {
                let image = document.getElementById('home-background');
                var opacityVal;
                if (windowWidth <= 424) {
                    opacityVal = 120 / window.scrollY;
                    if (opacityVal > 4) opacityVal = 4;
                }
                if (windowWidth >= 425 && windowWidth <= 767) {
                    opacityVal = 300 / window.scrollY;
                    if (opacityVal > 4) opacityVal = 4;
                }
                if (windowWidth >= 768 && windowWidth <= 1023) {
                    opacityVal = 400 / window.scrollY;
                    if (opacityVal > 4) opacityVal = 4;
                }
                if (windowWidth >= 1024 && windowWidth <= 1439) {
                    opacityVal = 500 / window.scrollY;
                    if (opacityVal > 8) opacityVal = 8;
                }
                if (windowWidth >= 1440) {
                    opacityVal = 600 / window.scrollY;
                    if (opacityVal > 10) opacityVal = 10;
                }
                if (opacityVal < 1) opacityVal = 0;
                image.style.filter = `blur(${opacityVal}px)`;
            }
        window.addEventListener('scroll', setBlur)
        return () => {
            window.removeEventListener('scroll', setBlur)
        }
    }, [])


    const { t } = useTranslation()

    return (
        <section className='background'>
            <div className="background__welcome">
                <h1 className='background__welcome__text welcome'>{t('welcome_portfolio')} </h1>
                <h3 className='background__welcome__text project_contact'>{t('take_a_look')}</h3>
                <div className="background__welcome__buttons">
                    <button onClick={() => { 
                        document.querySelector('.projects').scrollIntoView({behavior:"smooth"}) 
                        }} className="background__welcome__button" id="projects_button">{t('projects')}</button>
                    <Link to="/authentication">
                        <button className="background__welcome__button" id="contact_button">{t('contact')}</button>
                    </Link>
                </div>
            </div>
            <img id='home-background' src={background2} alt="home-background" className='background__image' />
        </section>
    )
}

export default Background