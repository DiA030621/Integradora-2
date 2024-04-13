import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const RutasScreen = ({ navigation }) => {
  const route = useRoute();
  const { clave } = route.params;
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRutas, setFilteredRutas] = useState([]); //estado para el texto de búsqueda

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Después de 5 segundos, establece loading en falso
    }, 500);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchRutas();
    }
  }, [loading]);

  const fetchRutas = async () => {
    try {
      const response = await fetch('http://dtai.uteq.edu.mx/~diemar209/Integradora2/BACK/Rutas/get_rutas');
      const data = await response.json();
      setRutas(data.rutas);
    } catch (error) {
      console.error('Error fetching rutas:', error);
    }
  };

  const handleRutaPress = (claveRuta, nombreRuta) => {
    // Navegar a una pantalla de detalles de la ruta con el nombre de la ruta como parámetro
    navigation.navigate('DetalleRuta', { claveRuta, nombreRuta });
  };

  // Función para manejar el cambio en el texto de búsqueda
  const handleSearch = (text) => {
    setSearchQuery(text);
    // Filtrar las rutas en función del texto de búsqueda
    const filtered = rutas.filter((ruta) =>
      ruta.nombre.toLowerCase().includes(text.toLowerCase())
    );
    // Actualizar el estado de las rutas filtradas
    setFilteredRutas(filtered);
  };

  // Actualizar la lista de rutas mostradas en función de las rutas filtradas
  const renderRutaItem = ({ item }) => (
    <TouchableOpacity style={styles.rutaCard} onPress={() => handleRutaPress(item.clave, item.nombre)}>
      <Text style={styles.rutaName}>{item.nombre}</Text>
      <FontAwesome5 name="bookmark" style={styles.icon} />
      <Text style={styles.rutaDescription}>{item.descripcion}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar ruta..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={searchQuery ? filteredRutas : rutas}
        renderItem={renderRutaItem}
        keyExtractor={(item) => item.clave.toString()} // Usamos clave como la clave única
        contentContainerStyle={styles.rutasList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#f2cd00',
    width: 'auto', // Ajusta el ancho automáticamente para que abarque todo el espacio disponible
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rutasList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  rutaCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '100%', // Para que ocupe todo el ancho de la pantalla
    justifyContent: 'center',
    alignItems: 'center',
  },
  rutaName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center', // Para centrar el texto horizontalmente
  },
  rutaDescription: {
    fontSize: 16,
    color: '#555',
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: 16, // Ajusta la posición vertical según sea necesario
    fontSize: 24,
    color: '#11111f', // Color del icono
  },
});

export default RutasScreen;
