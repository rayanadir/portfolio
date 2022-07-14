import React from 'react';
import '../aboutme/AboutMe.scss';
import { STACK } from '../../data/stack';
import Stack from '../../components/stack/Stack';
import { useTranslation } from "react-i18next"

const AboutMe = () => {

  const { t } = useTranslation();

  const getAge = () => {
    const birthdate = new Date('01-27-2000')
    let diff= Math.floor(new Date().getTime() - birthdate.getTime());
    let day = 1000 * 60 * 60 * 24;
    let days = Math.floor(diff/day);
    let years = Math.floor(days/365.25);
    return years;
  }

  return (
    <section className="aboutme">
      <h1 className='aboutme__title'>{t('aboutme')}</h1>
      <h3 className='aboutme__name'>{t('age', {age:getAge()})}</h3>
      <p className='aboutme__text'>{t('formation')}</p>
      <p className='aboutme__text'>{t('portfolio_projects')}</p>
      <div className="aboutme__stack-container">
        <Stack key="front" stack="front" title={t('frontend_stack')} stackArr={STACK.filter((stack)=> stack.type==="front")} />
        <Stack key="back" stack="back" title={t('backend_stack')} stackArr={STACK.filter((stack) => stack.type==="back")} />
        <Stack key="other" stack="other" title={t('other_stack')} stackArr={STACK.filter((stack) => stack.type==="other")} /> 
      </div>
    </section>
  )
}

export default AboutMe