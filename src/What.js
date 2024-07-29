import React, { useState } from 'react';
import axios from 'axios';
import Chatbot from './chatbot'; // Assuming Chatbot component is in a separate file

function Chat() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://172.19.160.1:7588/api/genai/', { query });
      const userMessage = { text: query, type: 'user', time: new Date().toLocaleTimeString() };
      const botMessage = { text: res.data.message, type: 'bot', time: new Date().toLocaleTimeString() };

      // Prepend new messages to maintain user message at the bottom
      setMessages([userMessage, botMessage, ...messages]);
      setQuery('');
    } catch (error) {
      setError('Error sending message');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="max-w-md w-full">
        <Chatbot
          messages={messages}
          onSubmit={handleSubmit}
          query={query}
          setQuery={setQuery}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}

export default Chat;
