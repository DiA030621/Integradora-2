import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Rutas from './rutasScreen';
import Frecuentes from './frecuenteScreen';
import Cartera from './carteraScreen';
//Iconos
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions = {({route}) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({color, focused, size}) => {
          let iconName;
          let iconColor = focused ? '#f2cd00' : '#11111f';
          if(route.name === "Rutas") {
            iconName = "bus-alt";
          }
          else if(route.name === "Frecuentes") {
            iconName = "award";
          }
          else if(route.name === "Cartera") {
            iconName = "money-check-alt";
          }
          return <FontAwesome5 name = {iconName} color = {iconColor} size = {size} /> 
        },
      })}
    >
      <Tab.Screen name="Rutas" component={Rutas} options={{  headerShown: false }} />
      <Tab.Screen name="Frecuentes" component={Frecuentes} options={{ tabBarLabel: 'Rutas Frecuentes' }} />
      <Tab.Screen name="Cartera" component={Cartera} options={{ tabBarLabel: 'Cartera' }} />
    </Tab.Navigator>
  );
};

export default MainScreen;
