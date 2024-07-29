import React, { useState } from 'react';
import axios from 'axios';
import './ChatWithDB.css';

function ChatWithDb() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState([]);
  const [excelUrl, setExcelUrl] = useState('');
  const [csvUrl, setCsvUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://3.109.5.130/api/chatdbcj/', { question: message });
      setResponse(res.data.message);
      setExcelUrl(res.data.excel_url);
      setCsvUrl(res.data.csv_url); // Assuming the backend provides a csv_url
    } catch (error) {
      setError('Error fetching response');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Query Results</h1>
        <div className="table-container">
          {response.length > 0 && (
            <table className="data-table">
              <thead>
                <tr>
                  {Object.keys(response[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {response.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {isLoading && (
          <div className="loader">
            <div className="dot-flashing"></div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="query-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question..."
            className="query-input"
            disabled={isLoading}
          />
          <button type="submit" className="submit-button" disabled={isLoading}>
            Send
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {excelUrl && (
          <a href={excelUrl} className="download-button" download="query_results.xlsx">
            Download Excel
          </a>
        )}
        {csvUrl && (
          <a href={csvUrl} className="download-button" download="query_results.csv">
            Download CSV
          </a>
        )}
      </div>
    </div>
  );
}

export default ChatWithDb;
