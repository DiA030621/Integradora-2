import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';


const CarteraScreen = () => {
  const route = useRoute();
  const { clave } = route.params;
  const navigation = useNavigation();
  const [saldo, setSaldo] = useState(0.0);

  useFocusEffect(
    React.useCallback(() => {
    const fetchData = async () => {
    const formData = new FormData();
    formData.append('clave', clave);
    
    //console.log(formData);
    try {
      const response = await fetch('http://dtai.uteq.edu.mx/~diemar209/Integradora2/BACK/Usuarios/get_usuario', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.resultado) {
        const sald=data.usuarios[0].saldo;
        setSaldo(sald);
        console.log(saldo);
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
  }, [])
  );


  const handleButtonRecarga = () => {
    navigation.navigate('RecargaScreen', { clave: clave }); // Navegar a la pantalla de PagoScreen
  };
  const handleButtonPago = () => {
    navigation.navigate('PagoScreen', { clave: clave }); // Navegar a la pantalla de PagoScreen
  };
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.balance}>${saldo}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPago}>
        <Text style={styles.buttonText}>Recargar Saldo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleButtonRecarga}>
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flexstart',
    alignItems: 'center',
    padding: 50,
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 5,
    backgroundColor: '#f2cd00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  innerCircle: {
    width: 200,
    height: 200,
    borderRadius: 110,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11111f',
  },
});

export default CarteraScreen;
