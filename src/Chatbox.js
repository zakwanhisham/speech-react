import { useState } from "react";
import "./ChatBox.css";

function ChatBox() {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    setChatHistory([...chatHistory, { message: inputValue, from: "user" }]);
    setInputValue("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-history">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chatbox-message ${
              chat.from === "user" ? "user-message" : "bot-message"
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

export default ChatBox;
