import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';

const FrecuenteScreen = () => {
  const route = useRoute();
  const { clave } = route.params; // Obtener la clave del usuario desde las props de navegación

  const [data, setData] = useState([]);
  const [hasData, setHasData] = useState(true); // Estado para indicar si hay datos

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchData = async (clave) => {
      try {
        console.log('Clave de usuario:', clave);
        const formData = new FormData();
        formData.append('clave_usuario', clave);
    
        const response = await fetch('http://dtai.uteq.edu.mx/~diemar209/Integradora2/BACK/Usuarios/get_usuarios_ruta', {
          method: 'POST',
          body: formData
        });
        const jsonData = await response.json();
        return jsonData.rutas;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    };
    
    
    // Llamar a la función fetchData para obtener los datos
    fetchData(clave)
      .then((response) => {
        if (response) {
          const customColors = ['#F2CD00', '#FBF2BC', '#11111F', '#9898BD', '#00B3E6', '#AEDFEE', '#3366E6', '#B1B166', '#99FF99', '#B34D4D'];
          // Procesar los datos recibidos para adaptarlos al formato requerido por el gráfico de pastel
          // Los datos deben ser un array de objetos con las propiedades "name" y "population" o similar
          const chartData = response.map((item, index) => ({
            name: 'Ruta: ' + item.nombre,
            population: parseInt(item.cantidad), // Asegúrate de convertir la cantidad a número
            color: customColors[index % customColors.length], //Asigna un color personalizado a cada segmento de la gráfica
          }));
          setData(chartData);
        } else {
          setHasData(false); // Establecer el estado hasData como false si no hay datos
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });    
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rutas Frecuentes</Text>
      {hasData ? (
        <PieChart
          data={data}
          width={300}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            palette: ['#F2CD00', '#FFB399'],
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          fromZero={true}
        />
      ) : (
        <Text style={styles.message}>Aún no has realizado viajes</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'medium',
  },
});

export default FrecuenteScreen;
