import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

//Android ID: 486206247887-5lcvjpgmdlr86atvabishc7q8h5d3180.apps.googleusercontent.com

const InicioScreen = ({ navigation }) => {
  const slideAnimation = new Animated.Value(0);
  const [showButtons, setShowButtons] = useState(false);

  const handleGoLogin = () => {
    navigation.navigate('Login');
  };

  const handleGoRegistro = () => {
    navigation.navigate('Registro');
  };

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setShowButtons(true); 
      }, 500);
    });
  }, []);

  //Sign in with Google
  const[userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "486206247887-5lcvjpgmdlr86atvabishc7q8h5d3180.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await getLocalUser();
    if(!user){
      if(response?.type === "success") {
        getUserInfo(response.authentication.accessToken);
      }
    }
    else {
      setUserInfo(user);
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  }

  const getUserInfo = async (token) => {
    if(!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers : { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch(e) {console.log(e)}
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/bussens_logo.png')}
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: slideAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, -110],
                }),
              },
            ],
            width: 250,
            height: 250,
          },
        ]}
      />
      {showButtons && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.whiteButton} onPress={handleGoRegistro}>
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blackButton} onPress={handleGoLogin}>
            <Text style={[styles.buttonText, styles.blackButtonText]}>Login</Text>
          </TouchableOpacity>
          {/*<Text style={styles.or}>-Or-</Text>
          <TouchableOpacity style={styles.googleButton}
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <Image
              source={require('../assets/google_logo.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>*/}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11111f',
  },
  image: {
    marginBottom: 20,
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    marginTop: 20,
  },
  whiteButton: {
    flexDirection: 'row', // Alineación horizontal de la imagen y el texto
    height: 40,
    width: '80%',
    marginBottom: 10, // Espacio entre botones
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
  },
  blackButton: {
    height: 40,
    width: '80%',
    marginBottom: 10, // Espacio entre botones
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#11111F',
    borderWidth: 1,
    borderColor: '#fff',
  },
  googleButton: {
    flexDirection: 'row', // Alineación horizontal de la imagen y el texto
    height: 40,
    width: '80%',
    marginBottom: 10, // Espacio entre botones
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  blackButtonText: {
    color: '#fff',
  },
  or: {
    marginTop: 15,
    marginBottom: 15, 
    fontSize: 16,
    color: '#fff',
  },
  buttonIcon: {
    width: 23,
    height: 23,
    marginRight: 15,
  },
});

export default InicioScreen;
