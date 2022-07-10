import React from 'react';
import '../project/Project.scss';
import { STACK } from '../../data/stack';

const Project = ({
  title,
  description,
  github_repo_link,
  website_link,
  main_image,
  stack,
  paragraphers,
  other_links,
  responsive,
  images
}) => {
  /*const project = {
    title,
    description,
    github_repo_link,
    website_link,
    main_image,
    stack,
    paragraphers,
    other_links,
    responsive,
    images
  }
  console.log(project);*/
  return (
    <article className="project">

        <div className="project__image_informations">
          <img className='project__mainImage' src={main_image} alt={title} />
          <div className="project__top_info">
            <h2 className='project__title'>{title}</h2>
            <p className='project__description'>{description}</p>
          </div>          
        </div>

          <div className="project__bottom_info">
            <ul className='project__list'>
            {
              stack.map((element) => {
                return <li className='project__list__element' key={element}>
                  {
                    STACK.map((s) => {
                      if(s.name===element){
                        return <img src={s.icon} alt={s.id} key={s.id} className='project__list__icon'/>
                      }
                    })
                  }
                </li>
              })
            }
            </ul>
            <p className='project__access'>Voir le projet</p>    
          </div>
    </article>
  )
}

export default Project