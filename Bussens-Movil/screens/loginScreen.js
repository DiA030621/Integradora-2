import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const formData = new FormData();
        formData.append('correo', email);
        formData.append('contra', password);
    try {
      const response = await fetch('http://192.168.0.101/5toCuatrimestre/Repositorio-Integradora/BACK/Usuarios/acceso', {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
  
      // Manejar la respuesta del backend
      if (data.resultado) {
        // Las credenciales son válidas: navegar a la pantalla principal
        const userType = data.usuario[0].tipo; // Obtener el tipo de usuario
        navigation.navigate(userType === 'admin' ? 'AdminScreen' : 'Main');
      } else {
        // Las credenciales no son válidas: mostrar mensaje de error
        Alert.alert('Error', 'Correo o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar errores de red u otros errores
      Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Registro'); // Aquí debes especificar el nombre de la pantalla de registro
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formText}>Inicia Sesión con tu cuenta</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Correo electrónico</Text>
          <TextInput
            style={[styles.input, {backgroundColor: 'white'}]}
            placeholder="Ingrese su correo electrónico"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <TextInput
            style={[styles.input, {backgroundColor: 'white'}]}
            placeholder="Ingrese su contraseña"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate ahora.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11111f',
  },
  form: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  button: {
    height: 40,
    width: '100%',
    backgroundColor: '#f2cd00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#999', // Color más claro para el texto de no tienes una cuenta
    fontSize: 14,
    marginTop: 10,
  },
});

export default LoginScreen;
