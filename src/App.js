import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageList from "./components/MessageList";
import Chatkit from '@pusher/chatkit'
import { tokenUrl, instanceLocator} from './config'

class App extends Component {

  componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,

    })
  }

  render() {
    return (
      <MessageList/>
    );
  }
}

export default App;
