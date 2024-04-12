import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const MainScreen = () => {
  const route = useRoute();
  const { clave } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.message}>¡Agrega rutas a frecuentes para visualizarlas aquí!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainScreen;
