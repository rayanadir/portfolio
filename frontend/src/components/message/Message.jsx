import React from 'react';
import '../message/Message.scss'

const Message = ({message, timestamp, isAuthor}) => {
  return (
    <article className="message" style={{alignItems: isAuthor ? "flex-end" : "flex-start"}}>
        <p className='message__bubble' style={{backgroundColor: isAuthor ? "deepskyblue" : "grey"}}>{message}</p>
        <span className='message__timestamp'>{timestamp}</span>
    </article>
  )
}

export default Message