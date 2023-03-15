import React from 'react';
import {useState} from 'react';
import './ChatBox.css';

/**
* Chatbox.
* This function creates a `chatbox`
* @return {jsx}
*/
export default function ChatBox() {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    const userMessage = {
      message: inputValue,
      from: 'user',
    };
    setChatHistory([...chatHistory, userMessage]);
    setInputValue('');
    setTimeout(() => {
      const botMessage = {
        message: `I'm sorry, I didn't understand what you said.`,
        from: 'bot',
      };
      switch (inputValue.trim().toLowerCase()) {
        case 'hello':
          botMessage.message = 'Hi there! I am Speech Bot';
          break;
        case 'how are you':
          botMessage.message = 'I\'m doing well, thanks for asking.';
          break;
        case 'what is your name':
          botMessage.message = 'My name is Speech Bot';
          break;
        case 'what can you do':
          botMessage.message = `You can press the microphone icon and say 
'instruction'`;
          break;
        default:
          botMessage.message = `I'm sorry, I didn't understand what you said.`;
          break;
      }
      setChatHistory([...chatHistory, userMessage, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`chatbox-container ${isOpen ? 'open' : 'closed'}`}>
      {!isOpen && (
        <div className="chatbox-avatar">
          <img src="./logo.svg" alt="placeholder logo" />
        </div>
      )}
      <div className="chatbox-header">
        <div className="chatbox-title">Chat</div>
        <div className="chatbox-buttons">
          <button className="open-button" onClick={handleOpen}>
            Open
          </button>
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>       <div className="chatbox-history">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chatbox-message ${
              chat.from === 'user' ? 'user-message' : 'bot-message'
            } ${
              index > 0 &&
              chatHistory[index - 1].from === chat.from &&
              'same-sender'
            }`}
          >
            {chat.message}
          </div>
        ))}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
