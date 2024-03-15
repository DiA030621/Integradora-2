import React, { useState, useEffect } from 'react';

function FormLogin (props)
{
    const [correo, setUsername] = useState('');
    const [contra, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!correo.trim() || !contra.trim()) {
            setError('Usuario o contraseña vacíos.');
            return;
        }

        const formData = new FormData();
        formData.append('correo', correo);
        formData.append('contra', contra);

        try 
        {
            const response = await fetch('http://localhost/Integradora-2/BACK/Usuarios/acceso', {
            method: 'POST',
            body: formData
            });

            const data = await response.json();
            console.log('Mensaje de respuesta:', data.usuario[0]);
            if (!data.resultado) {
                setError(data.mensaje);
                return;
            }else
            {
                props.onLogin(data);
            }
    
        } catch (error) 
        {
            console.error('Error al realizar la solicitud:', error);
        }
        
        setUsername('');
        setPassword('');
        setError('');
    };
    return(
        <div className="box">
            <div className="form sign_in">
                <h3>Iniciar Sesión</h3>
                <span>Use su correo para iniciar</span>

                <form onSubmit={handleSubmit}>
                    <div className="type">
                        <input type="text" placeholder="Correo" value={correo} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="type">
                        <input type="password" placeholder="Contraseña" value={contra} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                
                    <button className="btn bkg" type="submit">Iniciar Sesión</button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default FormLogin;