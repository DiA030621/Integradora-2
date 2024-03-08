// LoginForm.js
import React, { useState } from 'react';
import './Form.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError('Usuario o contraseña vacíos.');
            return;
        }

        console.log('Username:', username);
        console.log('Password:', password);

        setUsername('');
        setPassword('');
        setError('');
    };

    return (
        <div class="background">
            <div class="container">
                <div class="box">
                    <div className="form sign_in">
                        <h3>Iniciar Sesión</h3>
                        <span>use su nombre de usuario para iniciar</span>

                        <form onSubmit={handleSubmit}>
                            <div className="type">
                                <input type="text" placeholder="Nombre de Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="type">
                                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        
                            <button className="btn bkg" type="submit">Iniciar Sesión</button>

                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
