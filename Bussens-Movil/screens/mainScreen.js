import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Importamos useNavigation para poder utilizar la navegación

// Otras importaciones de pantallas
import Rutas from './rutasScreen';
import Frecuentes from './frecuenteScreen';
import Cartera from './carteraScreen';
import Perfil from './perfilScreen';
import Accesibilidad from './accesibilidadScreen';

// Iconos
import { FontAwesome5 } from '@expo/vector-icons';

// Tab
const Tab = createBottomTabNavigator();

// Drawer
const Drawer = createDrawerNavigator();

const MainScreen = ({ navigation }) => {
  // Obtenemos la clave del usuario desde la navegación
  const route = useRoute();
  const { clave } = route.params;

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigation} initialParams={{ clave }} />
      <Drawer.Screen name="Perfil" component={Perfil} initialParams={{ clave }} />
      {/*<Drawer.Screen name="Accesibilidad" component={Accesibilidad} initialParams={{ clave }}/>*/}
      {/* Agregamos la opción de cerrar sesión */}
      <Drawer.Screen 
        name="Cerrar Sesión" 
        component={CerrarSesionScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="sign-out-alt" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// Pantalla para confirmar el cierre de sesión
const CerrarSesionScreen = () => {
  const navigation = useNavigation(); // Obtenemos la navegación

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      // Eliminar datos de sesión, por ejemplo, clave de usuario, token, etc.
      // Aquí deberías agregar la lógica para eliminar los datos de sesión que hayas almacenado

      // Redireccionar al usuario a la pantalla de inicio de sesión
      navigation.replace('Inicio'); // Reemplazamos la pantalla actual por la pantalla de inicio de sesión y pasamos null como valor de la clave
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Manejar cualquier error que ocurra al cerrar la sesión
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¿Estás seguro que deseas cerrar sesión?</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonCerrar} onPress={cerrarSesion}>
              <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancelar} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const TabNavigation = () => {
  const route = useRoute();
  const { clave } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          let iconColor = focused ? '#f2cd00' : '#11111f';
          if (route.name === "Rutas") {
            iconName = "bus-alt";
          }
          else if (route.name === "Frecuentes") {
            iconName = "award";
          }
          else if (route.name === "Cartera") {
            iconName = "money-check-alt";
          }
          return <FontAwesome5 name={iconName} color={iconColor} size={size} />
        },
      })}
    >
      <Tab.Screen name="Rutas" component={Rutas} initialParams={{ clave }} options={{ headerShown: false }} />
      <Tab.Screen name="Frecuentes" component={Frecuentes} initialParams={{ clave }} options={{ headerShown: false }} />
      <Tab.Screen name="Cartera" component={Cartera} initialParams={{ clave }} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonCerrar: {
    backgroundColor: '#11111f',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '50%',
  },
  buttonCancelar: {
    backgroundColor: 'red',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
