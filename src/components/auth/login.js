/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Button from './button';
import auth from '@react-native-firebase/auth';
import styles from './authStyles';

// Login o SignUp al presionar el boton de logeo
const onSigninButtonPress = async ({email, password}) => {
  email = email.trim();
  password = password.trim();
  if (email === '' && password === '') {
    Alert.alert('Campos vacios', 'Inserta tus credenciales');
    return;
  }
  const task = await auth().signInWithEmailAndPassword(email, password);
  return task;
};

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initializando, setInitializando] = useState(false);
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
      }}>
      {initializando ? (
        <View style={styles.loadingScreen}>
          <ActivityIndicator
            style={{marginTop: 25}}
            size={38}
            color="#101e5a"
          />
        </View>
      ) : null}
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/AditionalMedia/2345.png')}
          style={styles.loginBG}
          progressiveRenderingEnabled
          resizeMethod="scale"
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            placeholder="Correo electrónico"
          />
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            textContentType="password"
            placeholder="Contraseña"
          />
        </View>
        <Button
          onPress={async () => {
            setInitializando(true);
            try {
              await onSigninButtonPress({email, password}).then(() => {
                setEmail('');
                setPassword('');
              });
            } catch (err) {
              setInitializando(false);
              err.code === 'auth/user-not-found'
                ? Alert.alert(
                    'Error de autenticación',
                    'el usuario no fue encontrado, intente de nuevo',
                  )
                : Alert.alert(
                    'Error de autenticación',
                    'Ha ocurrido un error, intenta de nuevo',
                  );
            }
          }}
          text="Iniciar Sesion"
        />
        <TouchableOpacity onPress={() => navigation.navigate('signin')}>
          <Text style={styles.registrarse}>Registrarse</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;
