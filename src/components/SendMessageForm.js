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
    console.log(this.state.message)
    //send a message//
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className ="send-message-form">
          <input
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
