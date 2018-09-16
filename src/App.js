import React from 'react';
import Chatkit from '@pusher/chatkit'
import logo from './logo.svg';
import './App.css';
import MessageList from "./components/MessageList";
import { tokenUrl, instanceLocator} from './config'

class App extends React.Component {
  state = {
    messages: []
  }
  //Triggered after render method
  componentDidMount() {
    //Create a new chatkit instance
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'AaronCur',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })
    //Then returns promise
    chatManager.connect().then (currentUser => {
      currentUser.subscribeToRoom({
        roomId: 15195580,
        hooks: {
          //Fetches messages from chatkit api
          onNewMessage: message => {
            console.log('message.text: ', message.text);
            this.setState({
              //... expands brakcets to fit in current brackets
              //Would look like [[this.state.messages], message]
              //Copies previous area adding new message to the end
              messages: [...this.state.messages, message]
            })
          }
        }
      })
    })
  }

  render() {
    console.log('this.state.,messages:', this.state.messages);
    return (
      <MessageList
        messages = {this.state.messages}
      />
    );
  }
}

export default App;
