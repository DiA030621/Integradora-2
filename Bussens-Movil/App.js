import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import Navigation from './Navigation';
import { readDataRealTime } from './screens/firebase'; // Asegúrate de ajustar la ruta de importación según sea necesario
import { readDataRealTimePago } from './screens/firebasepagos'; // Asegúrate de ajustar la ruta de importación según sea necesario

export default function App() {
 useEffect(() => {
    // Llama a la función readDataRealTime cuando el componente se monte
    readDataRealTime();
    readDataRealTimePago();
 }, []); // El array vacío como segundo argumento asegura que el efecto se ejecute solo una vez, al montar el componente

 return (
    <Navigation/>
 );
}
