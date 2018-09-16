import React from "react";
import ReactDOM from "react-dom"
import Message from './Message'

class MessageList extends React.Component {

//Autoscroll to bottom if you are close to bottom of the screen
//If you are far up the chat (catching up on messages) you wont be scrolled down
componentWillUpdate(){
  const node = ReactDOM.findDOMNode(this)
  this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >+ node.scrollHeight
}
componentDidUpdate(){
  if(this.shouldScrollToBottom)  {
    const node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }

}

  render() {
    return (
      <div className = "message-list">
        {this.props.messages.map((message, index) => {
          return(
            <Message
              key = {index}
              userName = {message.senderId}
              text = {message.text}
            />

          )
        })}
      </div>
    )
  }
}

export default MessageList
