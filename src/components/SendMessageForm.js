import React from "react";
//A controller component
class SendMessageForm extends React.Component {
  state = {
    messages: ""
  }

 //Writing the method this way avoids binding this.setstate to the handlechange function
  handleChange = (e) =>
  this.setState({
      message: e.target.value
  });

  handleSubmit = (e) => {
    e.preventDefault()
    //send a message//
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ""
    })
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className ="send-message-form">
          <input
            disabled={this.props.disabled}
            onChange={this.handleChange}
            value = {this.state.message}
            placeholder="Type your message and hit enter"
            type = "text"
          />
      </form>
    )
  }
}

export default SendMessageForm
