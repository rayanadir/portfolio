import React from 'react';
import '../projectPage/ProjectPage.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STACK } from '../../data/stack';
import { useTranslation } from 'react-i18next';
import responsive from "../../img/responsive.svg";
import check from '../../img/check.svg';
import uncheck from "../../img/uncheck.svg";
import fullscreen from "../../img/fullscreen.svg";
import Carrousel from '../../components/carrousel/Carrousel';

const ProjectPage = () => {
  let { id } = useParams();
  let projects = useSelector((state) => state.projects.projects);
  let project = projects.find(project => project.id === id);
  document.title = `Rayan Dahmena - ${project.title}`
  const { t } = useTranslation();
  if (!project) {
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
            return <li className="projectPage__stack__element" key={stack}>
              {
                // eslint-disable-next-line array-callback-return
                STACK.map((s) => {
                  if (s.name === stack) {
                    return <React.Fragment key={s.name}>
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
            <div className="projectPage__details__links">
              {
                project.github_repo_link.length > 0 ? <p className='projectPage__details__links__linkName'>
                  {t('github_repo_link')} : <a href={project.github_repo_link} className="projectPage__details__links__link">{project.github_repo_link}</a>
                </p> : null
              }
              {
                project.website_link.length > 0 ? <p className='projectPage__details__links__linkName'>
                  {t('website_link')} : <a href={project.website_link} className="projectPage__details__links__link">{project.website_link}</a>
                </p> : null
              }
            </div>
            <ul className="projectPage__details__paragraphers">
              {
                project.paragraphers.map((paragrapher, i) => {
                  return <li className="projectPage__details__paragraphers__paragrapher" key={"paragrapher_" + i}>
                    {t(paragrapher)}
                  </li>
                })
              }
            </ul>
          </div>
          <div className="projectPage__details__images">
              <img src={project.images[0]} alt="project" className='projectPage__details__images__image' />
          </div>
        </article>
        {
          Object.entries(project.other_links).length > 0 ?
            <ul className="projectPage__otherLinks">
              {
                Object.entries(project.other_links).map((link, i) => {
                  return <li className='projectPage__otherLinks__linkName' key={i}>
                    {t(link[0])} : <a href={link[1]} className="projectPage__otherLinks__link">{link[1]}</a>
                  </li>
                })
              }
            </ul>
            : null
        }
        <p className="projectPage__responsive">
          <img src={responsive} alt="responsive" className='projectPage__responsive__icon' id='responsive' /> {t('responsive')} : {project.responsive === true ?
            <img src={check} alt="check" className='projectPage__responsive__icon' id='check' />
            :
            <img src={uncheck} alt="uncheck" className='projectPage__responsive__icon' id='uncheck' />
          }
        </p>
      </section>
    </main>
  )
}

export default ProjectPage