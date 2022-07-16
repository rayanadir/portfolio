import React from 'react'
import '../stack/Stack.scss';

const Stack = ({title, stackArr, stack}) => {
  return (
        <article className="aboutme__stack" id={stack}>
          <h2 className="aboutme__stack__title">{title}</h2>
          <ul className='aboutme__stack__list'>
            {
                stackArr.map((stack) => {
                    return <li className='aboutme__stack__element' key={stack.id}>
                            <img src={stack.icon} alt={stack.id} className='aboutme__stack__icon'/>
                            <p className='aboutme__stack__name'>{stack.name}</p>
                        </li>
                })
            }
          </ul>
        </article>
  )
}

export default Stack