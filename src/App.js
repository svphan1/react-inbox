import React, { Component } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Toolbar from "./Components/Toolbar";
import MessageList from "./Components/MessageList";
import ComposeForm from "./Components/ComposeForm";

class App extends Component {
  state = {
    messages: [],
    composeForm: false,
    composeFormMessage: {
      subject: "",
      body: ""
    }
  };

  async componentDidMount() {
    this.myMessages();
  }

  async myMessages() {
    const getMessages = await fetch("http://localhost:8082/api/messages");
    const newMessages = await getMessages.json();
    this.setState({ messages: newMessages });
  }

  toggleRead = async (event, i) => {
    const readBody = {
      messageIds: [this.state.messages[i].id],
      command: "read",
      read: !this.state.messages[i].read
    };

    await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(readBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    this.myMessages();
  };

  toggleStarred = async (event, i) => {
    const starBody = {
      messageIds: [this.state.messages[i].id],
      command: "star",
      star: this.state.messages[i].starred
    };

    await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(starBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    this.myMessages();
  };

  toggleSelected = async (event, i) => {
    const selectedState = [...this.state.messages];
    selectedState[i].selected = !selectedState[i].selected;
    this.setState({ messages: selectedState });
  };

  markAsRead = async (event, i) => {
    const messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected ? [...ids, message.id] : ids;
    }, []);

    const markBody = {
      messageIds,
      command: "read",
      read: false
    };

    await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(markBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    this.myMessages();
  };

  markAsUnread = async (event, i) => {
    const messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected ? [...ids, message.id] : ids;
    }, []);

    const markBody = {
      messageIds,
      command: "read",
      read: true
    };

    await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(markBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    this.myMessages();
  };

  composeFormHandler = event => {
    let newComposeForm = this.state.composeForm;
    newComposeForm = !newComposeForm;

    this.setState({
      ...this.state,
      composeForm: newComposeForm,
      composeFormMessage: {
        subject: "",
        body: ""
      }
    });
  };

  getMessageSubject = event => {
    const newSubject = event.target.value;
    this.setState({
      composeFormMessage: {
        ...this.state.composeFormMessage,
        subject: newSubject
      }
    });
  };

  getMessageBody = event => {
    const newBody = event.target.value;
    this.setState({
      composeFormMessage: { ...this.state.composeFormMessage, body: newBody }
    });
  };

  sendForm = async event => {
    event.preventDefault();

    const newMessage = this.state.composeFormMessage;
    if (!newMessage.subject || !newMessage.body) {
      return;
    }

    await fetch("http://localhost:8082/api/messages", {
      method: "POST",
      body: JSON.stringify(newMessage),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    this.setState({
      composeForm: true,
      composeFormMessage: {
        subject: "",
        body: ""
      }
    });
    this.myMessages();
  };

  render() {
    return (
      <div className="container">
        <Navbar />
        <Toolbar
          messages={this.state.messages}
          composeFormHandler={this.composeFormHandler}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          composeMessage={this.composeMessage}
        />

        <ComposeForm
          composeForm={this.state.composeForm}
          getMessageSubject={this.getMessageSubject}
          getMessageBody={this.getMessageBody}
          sendForm={this.sendForm}
        />

        <MessageList
          messages={this.state.messages}
          toggleRead={this.toggleRead}
          toggleStarred={this.toggleStarred}
          toggleSelected={this.toggleSelected}
        />
      </div>
    );
  }
}

export default App;
