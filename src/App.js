import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './Chat';
import ChatWithPdf from './ChatWithPdf';
import ChatWithDbCJ from './ChatWithDbCJ';
import Home from './Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatpdf" element={<ChatWithPdf />} />
          <Route path="/chatdb" element={<ChatWithDbCJ />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
