import React from 'react';
import Message from './Message';

const MessageList = ({ 
  messages, 
  readMessages, 
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
          readMessages={(event) => {readMessages(event, i)}}
          toggleStarred={(event) => {toggleStarred(event, i)}}
          toggleSelected={(event) => {toggleSelected(event, i)}} />
        )
      })}
    </div>
  )
}

export default MessageList;