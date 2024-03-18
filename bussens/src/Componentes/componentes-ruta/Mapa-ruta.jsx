import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import camion from '../../parada.png';
import parada from '../../camion.png';

const Map = (clave_ruta) => {
    
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 20.6536, // Latitud de la ubicación central del mapa
    lng: -100.4036 // Longitud de la ubicación central del mapa
  };

  const [paradas, setParadas] = useState([]);
  const [tramos, setTramos] = useState([]);
  useEffect(() => {

    const formData = new FormData();
        formData.append('clave_ruta', clave_ruta.clave_ruta);
    // Llamada a la primera API para obtener las paradas
    fetch('http://localhost/Integradora-2/BACK/rutas/get_parada_tramo',{
      method: 'POST',
        body: formData
    })
  .then(response => response.json())
  .then(data => {
    console.log(data.paradas);
    setParadas(data.paradas);
  })
  .catch(error => console.log(error));

        fetch('http://localhost/Integradora-2/BACK/rutas/get_tramo', {
        method: 'POST',
        body: formData
        })
        .then(response => response.json())
        .then(data => {
            setTramos(data.tramos);
        })
        .catch(error => console.log(error));
        }, []);

    return (
    <LoadScript googleMapsApiKey="AIzaSyA4i6wY6szEPVUtksKuIvL5R_QZFsbl5xc">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        
        {/* Mapea los marcadores de las paradas en el mapa*/}
        {paradas.map(parada => (
          <Marker
            key={parada.clave}
            position={{ lat: parseFloat(parada.latitud), lng: parseFloat(parada.longitud) }}
            label={parada.clave}
            icon={{
                url: camion, // Utilizar la imagen del marcador personalizado
                scaledSize: new window.google.maps.Size(20, 20), // Tamaño personalizado del marcador
              }}
          /> 
        ))}
        
      
        {tramos.map(tramo => (
          <Marker
            key={tramo.clave}
            position={{ lat: parseFloat(tramo.latitud), lng: parseFloat(tramo.longitud) }}
            label={tramo.clave}
            icon={{
                url: parada, // Utilizar la imagen del marcador personalizado
                scaledSize: new window.google.maps.Size(20, 20), // Tamaño personalizado del marcador
              }}
          />
        ))}
        {/* Mapea los marcadores de los tramos en el mapa */}

      </GoogleMap>
    </LoadScript>
  );
};

export default Map;