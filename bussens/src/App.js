import React, { useState, useEffect } from 'react';
import LoginForm from './Vistas/LoginForm';
import Home from "./Vistas/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => 
  {
    const token = localStorage.getItem('token');
    if (token&& token!=='') 
    {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => 
  {
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <BrowserRouter onLogout={handleLogout}>
        <Navbar />
          <Routes>
            <Route path='/home' exact component={Home} />
          </Routes>
        </BrowserRouter>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;