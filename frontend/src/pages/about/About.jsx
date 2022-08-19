import React, { useContext } from 'react';
import '../about/About.scss';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <main>
            <section className={`about ${theme}`}>
                <div className="about__wrapper">
                    <h1 className="about__about">{t('about')}</h1>
                    <p className='about__text'>{t('about_text')}</p>
                    <a className="about__link" href="https://github.com/rayanadir/portfolio">{t('github_link')}</a>
                </div>
            </section>
        </main>
    )
}

export default About