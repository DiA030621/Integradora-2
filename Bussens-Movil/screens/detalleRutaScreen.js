import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from '@expo/vector-icons/Ionicons';

const DetalleRutaScreen = ({ route, navigation }) => {
  const clave = route.params.claveRuta;
  const nombre= route.params.nombreRuta;
  const [tramos, setTramos] = useState([]);
  const [location, setLocation] = useState(null);
  

  const waypoints = tramos.map(tramo => ({
    latitude: parseFloat(tramo.latitud),
    longitude: parseFloat(tramo.longitud),
  }));

  useEffect(() => {
    navigation.setOptions({ title: "Ruta " + nombre }); 

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();

    const fetchData = async () => {
      const formData = new FormData();
      formData.append('clave_ruta', clave);
      
      //console.log(formData)
      try {
        const response = await fetch('http://192.168.3.18/Integradora-2/BACK/rutas/get_tramo', {
          method: 'POST',
          body: formData
        });
  
        const data = await response.json();
        if (data.resultado) {
          setTramos(data.tramos);
        } else {
          // Las credenciales no son válidas: mostrar mensaje de error
          console.log('Error, intentelo mas tarde');
        }
      } catch (error) {
        console.error('Error:', error);
        // Manejar errores de red u otros errores
        Alert.alert('Error', 'Ocurrió un error al intentar ver su saldo. Por favor, inténtalo de nuevo más tarde.');
      }
    };
    
  fetchData();

  //console.log(tramos[0].latitud);

  }, [route]);




  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      region={{
        latitude: location ? location.coords. latitude : 20.65110207377884,
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
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default DetalleRutaScreen;
