import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const MainScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Aquí puedes agregar la lógica para realizar la búsqueda en función del texto ingresado
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      <Text style={styles.message}>Consulta todas las rutas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderRadius: 60,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainScreen;
