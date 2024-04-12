import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { latitude, longitude } from './firebase';

const DetalleRutaScreen = ({ route, navigation }) => {
  const clave = route.params.claveRuta;
  const nombre = route.params.nombreRuta;
  const [tramos, setTramos] = useState([]);
  const [location, setLocation] = useState(null);
  
  const waypoints = tramos.map(tramo => ({
    latitude: parseFloat(tramo.latitud),
    longitude: parseFloat(tramo.longitud),
  }));

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append('clave_ruta', clave);
      
      try {
        const response = await fetch('http://dtai.uteq.edu.mx/~diemar209/Integradora2/BACK/rutas/get_tramo', {
          method: 'POST',
          body: formData
        });
  
        const data = await response.json();
        if (data.resultado) {
          setTramos(data.tramos);
        } else {
          console.log('Error, inténtelo más tarde');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Ocurrió un error al intentar ver su saldo. Por favor, inténtelo de nuevo más tarde.');
      }
    };

    const interval = setInterval(fetchData, 1000); // Llama a fetchData cada 10 segundos
    fetchData(); // Llama a fetchData al principio

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente

  }, [clave]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Establecer el nombre de la ruta en el header
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Ruta ' + nombre });
  }, [nombre, navigation]);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      region={{
        latitude: location ? location.coords.latitude : 20.65110207377884,
        longitude: location ? location.coords.longitude : -100.40409103978239,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      {waypoints.map((waypoint, index) => (
        <Marker
          key={index}
          coordinate={waypoint}
          title={`Marcador ${index + 1}`}
        >
          <Image source={require('../buses.png')} style={{height: 35, width: 35}} />
        </Marker>
      ))}
      {location && (
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Mi posición">
          <Image source={require('../usuario.png')} style={{height: 35, width: 35}} />
        </Marker>
      )}
      {/* Agregar el nuevo marcador */}
      <Marker
        coordinate={{
          latitude: latitude, // Utiliza la variable latitude
          longitude: longitude, // Utiliza la variable longitude
        }}
        title="Nuevo marcador">
        {/* Puedes personalizar la apariencia del nuevo marcador si lo deseas */}
        <Image source={require('../animal-gato.png')} style={{height: 35, width: 35}} />
      </Marker>
    </MapView>
  );
};

export default DetalleRutaScreen;
