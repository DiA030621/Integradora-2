import React, { useState } from 'react';
import LoginForm from './Vistas/LoginForm';
import Home from "./Vistas/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <BrowserRouter>
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