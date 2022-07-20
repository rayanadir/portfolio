import React from 'react';
import '../project/Project.scss';
import { STACK } from '../../data/stack';
import { Link } from "react-router-dom"

const Project = ({ id, title, description, main_image, stack }) => {
  const projectAccess = () => {
    window.removeEventListener('scroll',()=>{}) 
  }
  return (
    <article className="project" id={id}>
        <div className="project__image_informations">
          <Link to={`/project/${id}`} className="project__link" onClick={projectAccess}>
            <img className='project__mainImage' src={main_image} alt={title} />
          </Link>
          <div className="project__informations">
            <div className="project__title_desc">
              <Link to={`/project/${id}`} className='project__link' onClick={projectAccess}>
                <h2 className='project__title'>{title}</h2>
              </Link>
              <p className='project__description'>{description}</p>              
            </div>
            <div className="project__bottom_info">
            <ul className='project__list'>
            {
              stack.map((element) => {
                return <li className='project__list__element' key={element}>
                  {
                    // eslint-disable-next-line array-callback-return
                    STACK.map((s) => {
                      if(s.name===element){
                        return <img src={s.icon} alt={s.id} key={s.id} className='project__list__icon' title={s.name}/>
                      }
                    })
                  }
                </li>
              })
            }
            </ul>   
          </div>
          </div>          
        </div>
    </article>
  )
}

export default Project