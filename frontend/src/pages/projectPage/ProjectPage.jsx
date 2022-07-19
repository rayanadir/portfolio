import React from 'react';
import '../projectPage/ProjectPage.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STACK } from '../../data/stack';

const ProjectPage = () => {
  window.scrollTo(0,0)
  let {id}= useParams();
  let projects= useSelector((state) => state.projects.projects);
  let project = projects.find(project => project.id === id);
  if(!project){
    console.log("aucun projet trouvé");
    return null;
  }
  return (
    <main>
      <section className="projectPage">
        <h1 className='projectPage__title'>{project.title}</h1>
        <h2 className='projectPage__description'>{project.description}</h2>
        <ul className="projectPage__stack">
          {project.stack.map((stack) => {
          return <li className="projectPage__stack__element">
            {
              // eslint-disable-next-line array-callback-return
              STACK.map((s) => {
                if(s.name===stack){
                  return <React.Fragment>
                    <img className="projectPage__stack__element__icon" src={s.icon} alt={s.name} />
                    <p className="projectPage__stack__element__name">{s.name}</p>
                  </React.Fragment>
                }
              })
            }
          </li>
        })}
        </ul>
        <article className='projectPage__details'>
          <div className="projectPage__details__links_paragraphers">
            <div className="projectPage__details__links"></div>
            <ul className="projectPage__details__paragraphers"></ul>
          </div>
          <div className="projectPage__details__images">

          </div>
        </article>
        <ul className="projectPage__otherLinks"></ul>
      </section>
    </main>
  )
}

export default ProjectPage