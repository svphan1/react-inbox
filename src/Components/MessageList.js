import React from 'react';
import Message from './Message';

const MessageList = ({ 
  messages, 
  toggleRead, 
  toggleStarred, 
  toggleSelected
 }) => {

  return (
    <div>
      { messages.map((message, i) => {
        return (
          <Message
          key={i}
          message={message}
          toggleRead={(event) => {toggleRead(event, i)}}
          toggleStarred={(event) => {toggleStarred(event, i)}}
          toggleSelected={(event) => {toggleSelected(event, i)}} />
        )
      })}
    </div>
  )
}

export default MessageList;