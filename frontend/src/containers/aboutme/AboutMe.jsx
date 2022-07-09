import React from 'react';
import '../aboutme/AboutMe.scss';
import { STACK } from '../../data/stack';
import Stack from '../../components/stack/Stack';

const AboutMe = () => {

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
      <h1 className='aboutme__title'>À propos de moi</h1>
      <h3 className='aboutme__name'>Rayan Dahmena, {getAge()} ans</h3>
      <p className='aboutme__text'>J'ai suivi la formation de développeur Front-End d'OpenClassrooms. Mon objectif est d'obtenir un poste de développeur Front-End React.js.</p>
      <p className='aboutme__text'>Ce portfolio est accompagné de plusieurs projets professionnalisants, ainsi que d'autres fonctionnalités.</p>
      <div className="aboutme__stack-container">
        <Stack key="front" title="Stack Front-End" stackArr={STACK.filter((stack)=> stack.type==="front")} />
        <Stack key="back" title="Stack Back-End" stackArr={STACK.filter((stack) => stack.type==="back")} />
        <Stack key="other" title="... et autres" stackArr={STACK.filter((stack) => stack.type==="other")} /> 
      </div>
    </section>
  )
}

export default AboutMe