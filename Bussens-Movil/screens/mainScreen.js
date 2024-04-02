import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Rutas from './rutasScreen';
import Frecuentes from './frecuenteScreen';
import Cartera from './carteraScreen';
import Perfil from './perfilScreen';
import Accesibilidad from './accesibilidadScreen';
import { Button, View, Text } from 'react-native';

//Iconos
import { FontAwesome5 } from '@expo/vector-icons';

//Tab
const Tab = createBottomTabNavigator();

//Drawer
const Drawer = createDrawerNavigator();

const MainScreen = () => {
  const cerrarSesion = () => {
    // Aquí puedes agregar la lógica para cerrar la sesión
    console.log('Sesión cerrada');
  };

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigation} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Accesibilidad" component={Accesibilidad} />
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

const CerrarSesionScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>¿Estás seguro que deseas cerrar sesión?</Text>
      <Button title="Cerrar Sesión" /*onPress={() => cerrarSesion()}*/ />
    </View>
  );
};

const TabNavigation = () => {
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
      <Tab.Screen name="Rutas" component={Rutas} options={{ headerShown: false }} />
      <Tab.Screen name="Frecuentes" component={Frecuentes} options={{ headerShown: false }} />
      <Tab.Screen name="Cartera" component={Cartera} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default MainScreen;
