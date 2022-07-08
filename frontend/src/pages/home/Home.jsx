import React from 'react';
import '../home/Home.scss'
import Background from '../../containers/background/Background';
import AboutMe from '../../containers/aboutme/AboutMe';
import Projects from '../../containers/projects/Projects';

const Home = () => {
  return (
    <main>
        <Background />
        <AboutMe />
        <Projects />
    </main>
  )
}

export default Home