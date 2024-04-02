import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import InicioScreen from './screens/inicioScreen';
import LoginScreen from './screens/loginScreen';
import RegistroScreen from './screens/registroScreen';
import MainScreen from './screens/mainScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Inicio" 
            component={InicioScreen}
            options={{ headerShown: false }} //Oculta el encabezado en Inicio
            />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registro" component={RegistroScreen} />
          <Stack.Screen 
            name="Main" 
            component={MainScreen} 
            options={{ headerShown: false }} // Oculta el encabezado en MainScreen
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }