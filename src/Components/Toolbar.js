import React from 'react';

const Toolbar = ({
  messages, 
  markAsRead, 
  markAsUnread, 
  composeMessage
}) => {

  let unreadCount = messages.filter(message => message.read);

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadCount.length}</span>
          unread messages
    </p>

        <a className="btn btn-danger" onClick={composeMessage}>
          <i className="fa fa-plus"></i>
        </a>

        <button className="btn btn-default">
          <i className="fa fa-minus-square-o"></i>
        </button>

        <button 
        className="btn btn-default" onClick={markAsRead}>Mark As Read</button>

        <button className="btn btn-default" onClick={markAsUnread}>Mark As Unread</button>

        <select className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar;