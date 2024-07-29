import React from 'react';

const Chatbot = ({ messages, onSubmit, query, setQuery, isLoading, error }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 w-80">
      <div className="text-gray-100 font-bold text-lg mb-2">Chatbot</div>
      <div className="overflow-y-auto max-h-96">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.type === 'user' ? 'text-gray-200' : 'text-gray-100'} ${message.type === 'bot' ? 'text-left' : 'text-right'}`}>
            <div className="px-2 py-1 bg-gray-700 rounded-lg inline-block">
              {message.text}
              <div className="text-xs text-gray-400">{message.time}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your message..."
          className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 ml-2 focus:outline-none focus:ring focus:border-blue-300">
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Chatbot;
