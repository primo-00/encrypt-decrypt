import React, { useState } from 'react';
import './App.css';

function App() {
  const [method, setMethod] = useState('caesar');
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleRequest = async (decrypt) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/cipher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, text, decrypt }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setResult('Error communicating with the server!');
    }
  };

  return (
    <div className="app-container">
      <h1>Message Encryption and Decryption</h1>
      <div className="form-container">
        <label>Choose Cipher Method:</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="caesar">Caesar Cipher</option>
          <option value="vigenere">Vigenère Cipher</option>
          <option value="affine">Affine Cipher</option>
          <option value="reverse">Reverse Cipher</option>
          <option value="railfence">Rail Fence Cipher</option>
        </select>
      </div>

      <textarea
        placeholder="Enter your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-area"
      />

      <div className="button-container">
        <button onClick={() => handleRequest(false)} className="btn">Encrypt</button>
        <button onClick={() => handleRequest(true)} className="btn">Decrypt</button>
      </div>

      <div className="result-panel">
        <h3>Result:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default App;
