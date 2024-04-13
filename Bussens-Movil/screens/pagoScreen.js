import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CardField } from '@stripe/stripe-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

function PaymentScreen() {
  const route = useRoute();
  const { clave } = route.params;
  const [amount, setAmount] = useState('');
  const [isCardValid, setCardValid] = useState(false);
  const navigation = useNavigation();
  const [cambio, setCambio] = useState(true);

  const handleCardChange = (cardDetails) => {
    setCardValid(cardDetails?.complete ?? false);
  };

  const handlePayPress = () => 
  {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > 1000)
      {
        Alert.alert('Error', 'La cantidad debe estar entre 0 y 1000');
        return;
        
      }
      else 
      {
        if (!isCardValid)
          {
            Alert.alert('Error', 'Por favor, completa todos los campos del formulario');
            return;
          }
          else
          {
            //logica del pago
            console.log(`Monto a recargar: $${amount}`);
            Recarga(amount);
          }
      }
  };

  const Recarga = (monto) =>{
    const fetchData = async () => {
    const formD = new FormData();
    formD.append('clave', clave);
    formD.append('monto', monto);
    //console.log(formData);
    try {
      const response = await fetch('http://dtai.uteq.edu.mx/~diemar209/Integradora2/BACK/pago/insert_prepago', {
        method: 'POST',
        body: formD
      });

      const data = await response.json();
      if (data.resultado) {
        if (cambio){
          setCambio(false);
        }else{
          setCambio(true);
        }
        
        Alert.alert('La recarga se realizo correctamente');
        navigation.navigate('Cartera', { clave: clave, result: cambio });
      } else {
        // Las credenciales no son válidas: mostrar mensaje de error
        console.log('Error, intentelo mas tarde');
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar errores de red u otros errores
      Alert.alert('Error', 'Ocurrió un error al ingresar su saldo. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  fetchData();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recarga de Saldo</Text>
      <TextInput
        placeholder="Ingresa el monto"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={false} // Puedes habilitar o deshabilitar el campo de código postal según tus necesidades
        placeholder={{
          number: 'Número de tarjeta',
          expiry: 'MM/AA',
          cvc: 'CVC',
        }}
        style={styles.cardField}
        onCardChange={handleCardChange}
      />
      <TouchableOpacity style={styles.button} onPress={handlePayPress}>
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cardField: {
    width: '100%',
    height: 100, // Ajusta la altura según tus necesidades
    marginTop: 10,
    marginBottom: 10,
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

export default PaymentScreen;
