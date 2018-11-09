import React from 'react';

const Message = ({
  message, 
  toggleRead, 
  toggleStarred, 
  toggleSelected
}) => {

  const messageStarred = message.starred ? "star fa fa-star" : "star fa fa-star-o";
  const messageRead = message.read ? "unread" : "read";
  const messageSelected = message.selected ? "selected" : "";

  return (
    <div className={`row message ${messageRead} ${messageSelected}`}>
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input type="checkbox" onClick={toggleSelected}/>
        </div>
        <div className="col-xs-2">
          <i className={messageStarred} onClick={toggleStarred}></i>
        </div>
      </div>
    </div>
    <div onClick={toggleRead} className="col-xs-11">
      <a href="#">
        <div>
         <p>{message.subject}</p>
        </div>
      </a>
    </div>
  </div>
  )
}

export default Message;
