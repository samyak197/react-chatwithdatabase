import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <h1>Select Model</h1>
      <div className="options">
        <Link to="/chat" className="option">Chat</Link>
        <Link to="/chatpdf" className="option">Chat with PDF</Link>
        <Link to="/chatdb" className="option">Chat with Database</Link>
      </div>
    </div>
  );
}

export default Home;
