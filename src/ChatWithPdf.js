import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming this is your base styling file

function ChatWithPdf() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(''); // Declare message state
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMessageSubmit = async (message) => {
    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('query', message);
    if (file) formData.append('file', file);

    try {
      const res = await axios.post('http://3.109.5.130/api/chatpdf/', formData);
      const botMessage = { text: res.data.message, type: 'bot' };
      setMessages([...messages, { text: message, type: 'user' }, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setError('Error sending message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-box">
          <h1>Chat with PDF</h1>
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleMessageSubmit(message); // Pass the current message state
              setMessage(''); // Reset message state after submission
            }}
            className="query-form"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="query-input"
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
            <button type="submit" className="submit-button">
              Send
            </button>
          </form>
          {error && <p className="error">Please Upload a Pdf..!</p>}
        </div>
      </div>
    </div>
  );
}

export default ChatWithPdf;
