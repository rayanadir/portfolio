import React, { useContext } from 'react';
import '../message/Message.scss';
import { ThemeContext } from '../../context/ThemeContext';

const Message = ({ message, timestamp, isAuthor }) => {
  // eslint-disable-next-line no-unused-vars
  const { toggleTheme, theme } = useContext(ThemeContext);
  const bubbleColor = isAuthor && theme==="dark" ? "deepskyblue" 
                    : isAuthor && theme==="light" ? "#3583DD"
                    : isAuthor === false && theme === "dark" ? "grey"
                    : isAuthor === false && theme === "light" ? "#606060"
                    : null;
  const color = theme === "dark" ? "black" : theme === "light" ? "white" : "null"
  
  return (
    <div style={{width:"100%"}}>
      <article className="message" style={{ alignItems: isAuthor ? "flex-end" : "flex-start" }}>
        <p className='message__bubble' style={{ backgroundColor: bubbleColor, color }}>{message}</p>
        <span className='message__timestamp'>{timestamp}</span>
      </article>
    </div>

  )
}

export default Message