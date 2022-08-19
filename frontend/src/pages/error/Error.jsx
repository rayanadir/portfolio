import React, {useContext} from 'react';
import '../error/Error.scss'
import sad from "../../img/sad.svg";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/ThemeContext';

const Error = () => {
  const { t } = useTranslation()
  // eslint-disable-next-line no-unused-vars
  const { toggleTheme, theme } = useContext(ThemeContext);
  document.title=t('error_404')
  return (
    <main>
        <section className={`error ${theme}`}>
            <img src={sad} alt="error" id='error_icon' className='error__icon'/>
            <h1 className='error__404'>404</h1>
            <h2 className='error__error'>{t('error')}</h2>
            <p className="error__notFound">{t('doesnt_exist')} </p>
            <Link to={'/'} className="error__link">
                <button className='error__link__button'>
                    {t('home_page')}
                </button>
            </Link>
        </section>
    </main>
  )
}

export default Error