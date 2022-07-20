import React, {useEffect} from 'react';
import '../home/Home.scss'
import Background from '../../containers/background/Background';
import AboutMe from '../../containers/aboutme/AboutMe';
import Projects from '../../containers/projects/Projects';

const Home = () => {
  document.title="Rayan Dahmena - Portfolio"
  useEffect(() => {
    return () => { window.scrollTo(0,0) }
  })
  return (
    <main>
        <Background />
        <AboutMe />
        <Projects />
    </main>
  )
}

export default Home