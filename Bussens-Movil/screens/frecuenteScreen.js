import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PieChart } from 'react-native-chart-kit';

const MainScreen = () => {
  // Datos de ejemplo para el gráfico de pastel
  const data = [
    {
      name: 'Ruta A',
      population: 100,
      color: '#FF6347',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Ruta B',
      population: 200,
      color: '#4682B4',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Ruta C',
      population: 300,
      color: '#32CD32',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Estas son las rutas que más frecuentas</Text>
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
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
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainScreen;
