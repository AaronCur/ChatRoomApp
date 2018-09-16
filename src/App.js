import React from 'react';
import Chatkit from '@pusher/chatkit'
import logo from './logo.svg';
import './App.css';
import MessageList from "./components/MessageList";
import { tokenUrl, instanceLocator} from './config'

class App extends React.Component {

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
          onNewMessage: message => {
            console.log('message.text: ', message.text);
          }
        }
      })
    })
  }

  render() {
    return (
      <MessageList/>
    );
  }
}

export default App;
