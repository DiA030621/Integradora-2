import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalleRutaScreen = ({ route, navigation }) => {
  const { nombreRuta, descripcionRuta } = route.params; // Obtenemos los parámetros pasados desde la pantalla anterior

  useEffect(() => {
    navigation.setOptions({ title: "Ruta " + nombreRuta }); 
  }, [nombreRuta]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aquí se mostrará el mapa de la ruta</Text>
      <Text style={styles.description}>{descripcionRuta}</Text>
    </View>
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
