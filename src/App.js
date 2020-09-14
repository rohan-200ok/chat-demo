import React, { Component } from 'react'
import { ChatFeed } from 'react-bell-chat'
import './App.css'

class App extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      messages: [
        {
          id: 1,
          authorId: 1,
          message: "Sample message",
          createdOn: new Date(),
          isSend: true
        },
        {
          id: 2,
          authorId: 2,
          message: "Second sample message",
          createdOn: new Date(),
          isSend: true
        },
      ],
      authors: [
        {
          id: 1,
          name: 'Buyer',
          isTyping: true,
          lastSeenMessageId: 2,
          bgImageUrl: undefined
        },
        {
          id: 2,
          name: 'Seller',
          isTyping: false,
          lastSeenMessageId: 2,
          bgImageUrl: undefined
        },
        {
          id: 3,
          name: 'Admin',
          isTyping: false,
          lastSeenMessageId: 0,
          bgImageUrl: undefined
        }
      ],
      textInput : "",
      currentAuthorID : 1,
      messageCount : 2
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.updateSender = this.updateSender.bind(this);
  }
  
  formSubmit(event) {
    event.preventDefault();

    let authors = this.state.authors.map(author => {
      if (author.id === this.state.currentAuthorID) {
        author.lastSeenMessageId = this.state.messageCount + 1
      }
      return author;
    });

    this.setState({
      authors,
      messages : [...this.state.messages, 
        {
          id: this.state.messageCount + 1,
          authorId: this.state.currentAuthorID,
          message: this.state.textInput,
          createdOn: new Date(),
          isSend: true 
        }
      ],
      messageCount: this.state.messageCount + 1,
      textInput: ""
    })
  }

  updateSender(event) {
    let value = event.target.value
    let currentAuthorID = this.state.currentAuthorID
    if(value === 'seller') {
      currentAuthorID = 2
    } else if(value === 'buyer') {
      currentAuthorID = 1
    }
    
    let authors = this.state.authors.map(author => {
      if (author.id === this.state.currentAuthorID) {
        author.lastSeenMessageId = this.state.messageCount + 1
      }
      return author;
    });

    this.setState({ currentAuthorID : currentAuthorID, authors })
  }

  render() {
    return (
      <div className="app">
      <ChatFeed
        showDateRow
        showRecipientLastSeenMessage
        showRecipientAvatar
        messages={this.state.messages} // Array: list of message objects
        authors={this.state.authors} // Array: list of authors
        yourAuthorId={this.state.currentAuthorID} 
      />

      <form className="app__form" onSubmit={this.formSubmit}>
        <div className="app__formSender" onChange={this.updateSender}>
          <div>
          <input type="radio" name="sender" id="buyer" value="buyer" defaultChecked />
          <label htmlFor="buyer"> Buyer </label>
          </div>
          <div>
          <input type="radio" name="sender" id="seller" value="seller" /> 
          <label htmlFor="seller"> Seller </label>
          </div>
        </div>        
        <input type="text" className="app__formInput" placeholder="Please Enter Your Message..." value={this.state.textInput} onChange={event => this.setState({ textInput : event.target.value })} />
        
        <button className="app__formSubmit">Submit</button>
      </form>
      </div>
    )
  }
}

export default App
