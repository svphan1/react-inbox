import React from "react";

const ComposeForm = ({
  composeForm,
  getMessageSubject,
  getMessageBody,
  sendForm
}) => {
  const toggleForm = composeForm ? "block" : "none";

  return (
    <div style={{ display: `${toggleForm}` }}>
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">
            Subject
          </label>
          <div className="col-sm-8">
            <input
              onChange={event => {
                getMessageSubject(event);
              }}
              type="text"
              className="form-control"
              id="subject"
              placeholder="Enter a subject"
              name="subject"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">
            Body
          </label>
          <div className="col-sm-8">
            <textarea
              onChange={event => {
                getMessageBody(event);
              }}
              name="body"
              id="body"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input
              onClick={sendForm}
              type="submit"
              value="Send"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComposeForm;
