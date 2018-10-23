import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Toolbar from './Components/Toolbar';
import MessageList from './Components/MessageList';
import ComposeForm from './Components/ComposeForm';

class App extends Component {

  state = {
    messages: [],
    composeForm: false,
    composeFormBody: {
      subject: '',
      body: ''
    }
  };

  async componentDidMount() {
    const getMessages = await fetch('http://localhost:8082/api/messages');
    const messagesJSON = await getMessages.json();
    this.setState({ messages: messagesJSON });
  };

  readMessages = async (event, i) => {

    const readBody = {
      messageIds: [this.state.messages[i].id],
      command: 'read',
      read: !this.state.messages[i].read
    };

    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(readBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    this.componentDidMount();
  }

  toggleStarred = async (event, i) => {

    const starBody = {
      messageIds: [this.state.messages[i].id],
      command: 'star',
      star: this.state.messages[i].starred,
    };
    
    await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        body: JSON.stringify(starBody),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
     this.componentDidMount();
    }

  toggleSelected = async (event, i) => {
    const selectedState = [...this.state.messages];
    selectedState[i].selected = !selectedState[i].selected;
    this.setState ({ messages: selectedState});
  };

  markAsRead = async (event, i) => {

    const messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected ? [ ...ids, message.id ] : ids;
    }, []);

    const markBody = {
      messageIds,
      command: 'read',
      read: false,
    };

    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(markBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    this.componentDidMount();
  }
 
  markAsUnread = async (event, i) => {
    const messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected ? [ ...ids, message.id ] : ids;
    }, []);

    const markBody = {
      messageIds,
      command: 'read',
      read: true,
    };

    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(markBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    this.componentDidMount();
  }

  composeMessage = () => {
    let composeForm = this.state.composeForm
    this.setState({composeForm : !composeForm})
  }

  getMessageSubject = (event) => {
    const newSubject = event.target.value
    this.setState({ composeFormBody:{...this.state.composeFormBody,subject: newSubject}})
  }

  getMessageBody = (event) => {
    const newBody = event.target.value
    this.setState({ composeFormBody:{...this.state.composeFormBody,body: newBody}})
  }

  submitHandler = (event) => {
    event.preventDefault(); 

    
    // const messageBody = this.state.composeFormBody;
    // this.setState({ messageBody: messageBody})
    // console.log('this is it', messageBody)
  }

  render() {
    console.log('sub', this.state.composeFormBody.subject)
    console.log('bod', this.state.composeFormBody.body)
    return (
      <div className="container">
        <Navbar />
        <Toolbar
          messages={this.state.messages}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          composeMessage={this.composeMessage} />

        {this.state.composeForm ? <ComposeForm 
        getMessageSubject={this.getMessageSubject}
        getMessageBody={this.getMessageBody}
        submitHandler={this.submitHandler} /> : ''}

        <MessageList
          messages={this.state.messages}
          readMessages={this.readMessages}
          toggleStarred={this.toggleStarred}
          toggleSelected={this.toggleSelected}
        />
      </div>
    );
  }
}

export default App;
