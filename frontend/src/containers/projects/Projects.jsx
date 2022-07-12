import React from 'react';
import '../projects/Projects.scss'
import Project from '../../components/project/Project';
import { PROJECTS } from '../../data/projects';

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <h1 className='projects__title'>Mes projets</h1>
      <div className="projects__list">
        {PROJECTS.map((project) => {
            return <Project 
                      key={project.title}
                      description={project.description}
                      main_image={project.main_image}
                      stack={project.stack}
                      title={project.title}
                      id={project.id}
                      /> 
          })}
      </div>

        </section>
  )
}

export default Projects