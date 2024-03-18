import Ruta from '../Componentes/componentes-ruta/Ruta';
import React, { useEffect, useState } from 'react';
import Titulo from '../Componentes/Titulo';

const Rutas = () => {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    // Realizar la solicitud HTTP a la API
    fetch('http://localhost/Integradora-2/BACK/rutas/get_rutas')
      .then(response => response.json())
      .then(data => {
        if (data.resultado) {
          setRutas(data.rutas);
        }
      })
      .catch(error => {
        console.error('Error al obtener las rutas:', error);
      });
  }, []);

  return (
    <div>
        <Titulo
        text="Gestión de rutas"/>
      {rutas.map(ruta => (
        <Ruta key={ruta.clave} clave={ruta.clave} nombre={ruta.nombre} />
      ))}
    </div>
  );
};

export default Rutas;