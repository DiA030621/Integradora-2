import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const RegistroScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('ap', primerApellido);
        formData.append('am', segundoApellido);
        formData.append('correo', email);
        formData.append('contra', password);
    try {
      const response = await fetch('http://192.168.3.18/Integradora-2/BACK/Usuarios/insert_usuario', {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
  
      // Manejar la respuesta del backend
      if (data.resultado) {
        // Éxito: Mostrar mensaje de éxito al usuario
        console.log(data.mensaje);
        navigation.navigate('Login');
      } else {
        // Error: Mostrar mensaje de error al usuario
        console.error(data.mensaje);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formText}>Registro</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su nombre(s)"
            onChangeText={(text) => setNombre(text)}
            value={nombre}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Primer Apellido</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su primer apellido"
            onChangeText={(text) => setPrimerApellido(text)}
            value={primerApellido}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Segundo Apellido</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su segundo apellido"
            onChangeText={(text) => setSegundoApellido(text)}
            value={segundoApellido}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su correo electrónico"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su contraseña"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
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
});

export default RegistroScreen;
