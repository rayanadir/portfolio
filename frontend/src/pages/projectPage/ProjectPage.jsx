import React, {useState, useContext} from 'react';
import '../projectPage/ProjectPage.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STACK } from '../../data/stack';
import { useTranslation } from 'react-i18next';
import responsive from "../../img/responsive.svg";
import check from '../../img/check.svg';
import uncheck from "../../img/uncheck.svg";
import arrow from "../../img/arrow.svg";
import { ThemeContext } from '../../context/ThemeContext';

const ProjectPage = () => {
  let { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { toggleTheme, theme } = useContext(ThemeContext)
  const [activeIndex,setActiveIndex] = useState(0) 
  let projects = useSelector((state) => state.projects.projects);
  let project = projects.find(project => project.id === id);
  document.title = `Rayan Dahmena - ${project.title}`
  const { t } = useTranslation();
  if (!project) {
    console.log("aucun projet trouvé");
    return null;
  }

  

  const previousImage = () => {
    setActiveIndex((index) => index - 1 < 0 ? project.images.length - 1 : index - 1)
  }

  const nextImage = () => {
    setActiveIndex((index) => index + 1 > project.images.length - 1 ? 0 : index + 1 )
  }
  
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const onClickUrl = (url) => {
    return () => openInNewTab(url)
  }

  return (
    <main>
      <section className={`projectPage ${theme}`}>
        <div className="projectPage__wrapper">
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
              <div className="projectPage__details__images__image_count">
                <img src={project.images[activeIndex]} alt="project" className='projectPage__details__images__image_count__image' onClick={onClickUrl(project.images[activeIndex])}/>
                <p className='projectPage__details__images__image_count__count'>
                  {project.images.length > 1 ? <img src={arrow} alt="previous" onClick={previousImage} className="projectPage__details__images__image_count__count__icon" id='prev'/> : null}
                    {activeIndex+1}/{project.images.length}
                  {project.images.length > 1 ? <img src={arrow} alt="next" onClick={nextImage} className="projectPage__details__images__image_count__count__icon" id='next' /> : null}
                </p>
              </div>
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
        </div>
      </section>
    </main>
  )
}

export default ProjectPage