/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Button from './button';
import auth from '@react-native-firebase/auth';
import styles from './authStyles';
import {useForm} from 'react-hook-form';
import Snackbar from 'react-native-snackbar-component';
import * as Wave from '../../assets/AdditionalMedia/wave.svg';

const Login = ({navigation}) => {
  const {handleSubmit, register, setValue, watch, errors} = useForm();
  const [initializing, setInitializing] = useState(false);
  const [snackIsVisible, setSnackIsVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);

  useEffect(() => {
    register('email', {required: true});
    register('password', {required: true});
  }, [register]);

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      setSnackMessage('Debes rellenar ambos campos para poder proseguir');
      setSnackIsVisible(true);
    } else {
      const isValidEmail =
        data.email.match(/[@]/g).length === 1 &&
        data.email.match(/[.]/g).length === 1;

      if (!isValidEmail) {
        setSnackMessage('Correo Electrónico invalido');
        setSnackIsVisible(true);
      } else {
        auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .catch((err) => {
            console.log(err.code);
            let msg;
            switch (err.code) {
              case 'auth/user-not-found':
                msg = 'El usuario no fue encontrado intenta de nuevo';
                break;
              case 'auth/wrong-password':
                msg = 'Usuario o contraseña incorrecta intente de nuevo';
                break;
              default:
                msg = 'Ha ocurrido un problema inesperado intenta de nuevo';
                break;
            }
            setSnackMessage(msg);
            setSnackIsVisible(true);
          });
      }
    }
    setInitializing(false);
  };
  console.log(Wave);
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      {initializing ? (
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

        {/**
        <Image
          source={require('../../assets/AdditionalMedia/wave.svg')}
          style={styles.loginBG}
          progressiveRenderingEnabled={true}
        />*/}
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setValue('email', text)}
            keyboardType="email-address"
            value={watch('email')}
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="Correo electrónico"
          />
          {errors.email && (
            <Error text="Debes proporcionar el correo de inicio de sesion" />
          )}
          <TextInput
            style={styles.textInput}
            value={watch('password')}
            onChangeText={(text) => setValue('password', text)}
            secureTextEntry={true}
            textContentType="password"
            placeholder="Contraseña"
          />
          {errors.password && <Error text="debes proporcionar la contraseña" />}
        </View>
        <Button onPress={handleSubmit(onSubmit)} text="Iniciar Sesion" />
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('signin')}>
        <Text style={styles.registrarse}>Registrarse</Text>
      </TouchableOpacity>
      <Snackbar
        visible={snackIsVisible}
        textMessage={snackMessage}
        actionHandler={() => {
          setSnackIsVisible(false);
        }}
        actionText="Ok"
        duration={Snackbar.LENGTH_SHORT}
      />
    </View>
  );
};

const Error = ({text}) => (
  <View style={styles.errorMsg}>
    <Text style={{fontSize: 10}}>{text}</Text>
  </View>
);

export default Login;
