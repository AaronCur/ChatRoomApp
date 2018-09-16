import React from 'react';
import Chatkit from '@pusher/chatkit'
import logo from './logo.svg';
import './App.css';
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import { tokenUrl, instanceLocator} from './config'

class App extends React.Component {
  state = {
    messages: [],
    joinableRooms: [],
    joinedRooms: [],
    roomId: null
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
      this.currentUser = currentUser
      this.getRooms()

    })
    .catch(err => console.log('Error on connecting:', err))
  }

getRooms =() =>{
  this.currentUser.getJoinableRooms().then(joinableRooms => {
    this.setState({
      joinableRooms,
      joinedRooms: this.currentUser.rooms
    })
  })
  .catch(err => console.log('Error on joinableRooms:', err))
}

subscribeToRoom =(roomId) =>{
  this.setState({
    //Clear the chat when switching to new chat room
    messages: []
  })
  this.currentUser.subscribeToRoom({
    roomId: roomId,
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
  //Update the joinable and joined rooms array when you subscribe to a new room
  .then(room => {
    this.setState({
      roomId: room.id
    })
    this.getRooms()
  })
  .catch(err => console.log('error subscribing to room: ', err))
}
sendMessage =(text) => {
  this.currentUser.sendMessage({
    text,
    roomId: this.state.roomId
  });
}
  render() {
    console.log('this.state.,messages:', this.state.messages);
    return (
      ///... is the spread operator
      <div>
        <RoomList
          roomId = {this.state.roomId}
          rooms ={[...this.state.joinableRooms, ...this.state.joinedRooms]}
          subscribeToRoom = {this.subscribeToRoom}
        />
        <MessageList
          messages = {this.state.messages}
        />
        <SendMessageForm
          sendMessage = {this.sendMessage}
        />
      </div>


    );
  }
}

export default App;
