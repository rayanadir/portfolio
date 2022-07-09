import React from 'react';
import '../projects/Projects.scss'
import Project from '../../pages/project/Project';
import { PROJECTS } from '../../data/projects';

const Projects = () => {
  return (
    <section className="projects" id="projects">
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
  )
}

export default Projects