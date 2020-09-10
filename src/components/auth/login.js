/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Image,
  Alert,
  TextInput,
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
  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Image
        source={require('../../assets/AditionalMedia/logo.png')}
        style={styles.loginBG}
      />
      <ScrollView style={{width: '100%'}}>
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
        <Button
          onPress={() =>
            onSigninButtonPress({email, password})
              .then(() => {
                setEmail('');
                setPassword('');
              })
              .catch(err => {
                err.code === 'auth/user-not-found'
                  ? Alert.alert(
                      'Error de autenticación',
                      'el usuario no fue encontrado, intente de nuevo',
                    )
                  : Alert.alert(
                      'Error de autenticación',
                      'Ha ocurrido un error, intenta de nuevo',
                    );
              })
          }
          text="Iniciar Sesion"
        />
        <Button
          onPress={() => {
            navigation.navigate('signin');
          }}
          text="Registrarse"
        />
      </ScrollView>
    </View>
  );
};

export default Login;
