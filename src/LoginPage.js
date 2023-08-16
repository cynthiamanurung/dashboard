import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://34.101.145.49:8004/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoginSuccessful(true);
      } else {
        console.error('Login gagal');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src="/logo.jpg" alt="Logo" className="logo" />
      </div>
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-form">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-button-container">
          <button className="login-button" type="submit">
            Login
          </button>
        </div>
      </form>
      {isLoginSuccessful && (
        <div>
          <Link to="/master-data">Ke Halaman Master Data</Link>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
