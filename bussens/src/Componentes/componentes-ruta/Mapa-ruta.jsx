import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import camion from '../../parada.png';
import parada from '../../camion.png';
import '../../Estilos-vistas/Ruta_form.css';

const Map = (clave_ruta) => {

  const [mapLoaded, setMapLoaded]=useState(false);
    
  const mapContainerStyle = {
    width: '100%',
    height: '550px'
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
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA4i6wY6szEPVUtksKuIvL5R_QZFsbl5xc&libraries=places`;
        script.async = true;
        script.onload = () => {
          setMapLoaded(true);
  };
  document.body.appendChild(script);
        }, []);
    return (
      <div className='container_ruta'>
        <div className='mapa_ruta'>
            {mapLoaded && (
            <GoogleMap
              mapContainerStyle={{ ...mapContainerStyle, flex: '1' }}
              center={center}
              zoom={13}
            >
              {/* Mapea los marcadores de las paradas en el mapa */}
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
            )}
        </div>
        <div className="formulario_ruta">
          <h2>Información del marcador</h2>
          <p>Clave: {/*selectedMarker.clave*/}</p>
          <p>Latitud: {/*selectedMarker.latitud*/}</p>
          <p>Longitud: {/*selectedMarker.longitud*/}</p>
          {/* Agrega otros campos del formulario según tus necesidades */}
        </div>
    </div>
  );
};

export default Map;