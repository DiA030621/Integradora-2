import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import camion from '../../parada.png';
import parada from '../../camion.png';
import '../../Estilos-vistas/Ruta_form.css';
import { MdDelete } from "react-icons/md";

const Map = (clave_ruta) => {

  const [selectedMarkerA, setSelectedMarkerA] = useState(null);
  const [selectedMarkerE, setSelectedMarkerE] = useState(null);

  const handleMarkerClickA = (marker) => {
    setSelectedMarkerA(marker);
    setSelectedMarkerE(null);
  };
  const handleMarkerClickE = (marker) => {
    setSelectedMarkerE(marker);
    setSelectedMarkerA(null);
  };

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

        const ClickAgregar = () => 
        {
          const form = new FormData();
          form.append('clave_ruta', clave_ruta.clave_ruta);
          form.append('clave_parada', selectedMarkerA.clave);
          fetch('http://localhost/Integradora-2/BACK/rutas/insert_tramo', {
          method: 'POST',
          body: form
          }).then(response => response.json())
          .then(data => {
              console.log(data);
          })
          .catch(error => console.log(error));
          window.location.reload();
        }

        const ClickEliminar = () => 
        {
          const form = new FormData();
          form.append('clave_ruta', clave_ruta.clave_ruta);
          form.append('clave_parada', selectedMarkerE.clave_parada);
          fetch('http://localhost/Integradora-2/BACK/rutas/delete_tramo', {
          method: 'POST',
          body: form
          }).then(response => response.json())
          .then(data => {
              console.log(data);
          })
          .catch(error => console.log(error));
          window.location.reload();
        }
        

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
                  onClick={() => handleMarkerClickA(parada)}
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
                  onClick={() => handleMarkerClickE(tramo)}
                />
              ))}
              {/* Mapea los marcadores de los tramos en el mapa */}

            </GoogleMap>
            )}
        </div>
        <div className="formulario_ruta">
          <h2>Información del marcador</h2>
          {selectedMarkerA && (
            <>
          <p>nombre: {selectedMarkerA.nombre}</p>
          <p>Latitud: {selectedMarkerA.latitud}</p>
          <p>Longitud: {selectedMarkerA.longitud}</p>
          <button onClick={ClickAgregar}>Agregar</button>
          {/* Agrega otros campos del formulario según tus necesidades */}
          </>
          )}
          {selectedMarkerE && (
            <>
          <p>clave: {selectedMarkerE.clave}</p>
          <p>Latitud: {selectedMarkerE.latitud}</p>
          <p>Longitud: {selectedMarkerE.longitud}</p>
          <button onClick={ClickEliminar}><MdDelete />Eliminar</button>
          {/* Agrega otros campos del formulario según tus necesidades */}
          </>
          )}
        </div>
    </div>
  );
};

export default Map;