import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PerfilScreen = () => {
  const route = useRoute();
  const { clave } = route.params;
  const [userData, setUserData] = useState(null);
  const [registroMensaje, setRegistroMensaje] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const formData = new FormData();
        formData.append('clave', clave);
        const response = await fetch('http://dtai.uteq.edu.mx/~diemar209/Integradora2/BACK/Usuarios/get_usuario', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.usuarios && data.usuarios.length > 0) {
          setUserData(data.usuarios[0]); // asumiendo que el endpoint devuelve un solo usuario
          fetchRegistro(data.usuarios[0].clave);
        } else {
          console.error('Error fetching user data: No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [clave]);

  useEffect(() => {
    if (userData) {
      console.log('clave: ' + userData.clave_usuario)
      fetchRegistro(userData.clave_usuario);
    }
  }, [userData]);

  const fetchRegistro = async (claveUsuario) => {
    try {
      const formData = new FormData();
      formData.append('clave', claveUsuario);
      console.log(claveUsuario);
      const response = await fetch('http://dtai.uteq.edu.mx/~diemar209/Integradora2/BACK/Usuarios/get_registro_usuario', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.resultado) {
        const registro = data.registro[0];
        const mensaje = `Usuario ${claveUsuario} registrado con éxito el día ${registro.fecha_registro}`;
        setRegistroMensaje(mensaje);
      } else {
        //console.error('Error fetching registro data:', data.mensaje);
      }
    } catch (error) {
      console.error('Error fetching registro data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del Usuario</Text>
      {registroMensaje && (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{registroMensaje}</Text>
        </View>
      )}
      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.data}>{userData ? userData.nombre : '-'}</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Apellido Paterno:</Text>
          <Text style={styles.data}>{userData ? userData.ap : '-'}</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Apellido Materno:</Text>
          <Text style={styles.data}>{userData ? userData.am : '-'}</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Correo Electrónico:</Text>
          <Text style={styles.data}>{userData ? userData.correo : '-'}</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Saldo:</Text>
          <Text style={styles.data}>{userData ? userData.saldo : '-'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#11111f',
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
  formField: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#1E352F',
    marginBottom: 5,
    fontWeight: 'bold',
    borderLeftWidth: 5,
    borderLeftColor: '#11111f',
    paddingLeft: 10,
  },
  data: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    color: '#11111f',
    borderWidth: 1,
    borderColor: '#f2cd00',
  },
  messageContainer: {
    backgroundColor: '#f2cd00',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#11111f',
    fontWeight: 'bold',
  },
});

export default PerfilScreen;
