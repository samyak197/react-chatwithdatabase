import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function ChatWithDbCJ() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://192.168.29.185:7588/api/chatdbcj/', { query });
      const userMessage = { text: query, type: 'user'};
      const botMessage = { text: res.data.message, type: 'bot', time: new Date().toLocaleTimeString() };

      // Prepend new messages to maintain user message at the bottom
      setMessages([...messages, userMessage, botMessage]);
      setQuery('');
    } catch (error) {
      setError('Error sending message');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-box">
          <h1>Chat</h1>
          <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}>
              <p className="message-text">{message.text}</p>
            </div>
          )).reverse()}

            
          </div>
          {isLoading && (
            <div className="loader">
              <div className="dot-flashing"></div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="query-form">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your message..."
              className="query-input"
            />
            <button type="submit" className="submit-button">Send</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default ChatWithDbCJ;
