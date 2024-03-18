import React, { useState, useEffect } from 'react';
import LoginForm from './Vistas/LoginForm';
import {Home} from './Vistas/Home';
import Rutas from './Vistas/Rutas';
import Rutas_paradas from './Vistas/Rutas-paradas';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';

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
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <BrowserRouter>
        <Navbar  onLogout={handleLogout} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/rutas" element={<Rutas />} />
            <Route path="/rutas/paradas" element={<Rutas_paradas />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;