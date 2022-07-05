import React from 'react';
import background2 from '../../img/main-background2.jpg';
import { PROJECTS } from '../../data/projects';
import Project from '../project/Project';
import '../home/Home.scss'

const Home = () => {
  const windowWidth= window.innerWidth;
  window.addEventListener('scroll', () => {
    let image =document.getElementById('home-background');
    var opacityVal;
    if(windowWidth<=767){
      opacityVal=300/window.scrollY;
      if(opacityVal > 2) opacityVal=2;
    }
    if(windowWidth>=768 && windowWidth<=1023){
      opacityVal=400/window.scrollY;
      if(opacityVal > 4) opacityVal=4;
    }
    if(windowWidth>=1024 && windowWidth<=1439){
      opacityVal=500/window.scrollY;
      if(opacityVal > 8) opacityVal=8;
    }
    if(windowWidth>=1440){
      opacityVal=600/window.scrollY;
      if(opacityVal > 10) opacityVal = 10;
    }
    if(opacityVal < 1) opacityVal = 0;
    image.style.filter=`blur(${opacityVal}px)`;
  })
  
  return (
    <main>
        <section className='background'>
            <img id='home-background' src={background2} alt="home-background" className='background__image'/>
        </section>
        <section className="projects">
          {PROJECTS.map((project) => {
            return <Project 
                      key={project.title}
                      description={project.description}
                      github_repo_link={project.github_repo_link}
                      images={project.images}
                      main_image={project.main_image}
                      other_links={project.other_links}
                      paragraphers={project.paragraphers}
                      responsive={project.responsive}
                      stack={project.stack}
                      title={project.title}
                      website_link={project.website_link}
                      /> 
          })}
        </section>
    </main>
  )
}

export default Home