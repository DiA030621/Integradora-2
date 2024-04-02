import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CarteraScreen = () => {
  const navigation = useNavigation();
  const saldo = 1000;

  const handleButtonPress = () => {
    navigation.navigate('PagoScreen'); // Navegar a la pantalla de PagoScreen
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.balance}>{saldo}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Recargar Saldo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f2cd00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  balance: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#11111f',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#f2cd00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11111f',
  },
});

export default CarteraScreen;
