/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
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
import Wave from '../../assets/AdditionalMedia/wave.svg';
import Logo from '../../assets/AdditionalMedia/Logo.svg';
import {PasswordInput} from '../auxComponents';

const ErrorMessage = ({text}) => {
  return (
    <Text style={{fontWeight: 'bold', color: 'red', textAlign: 'center'}}>
      {text}
    </Text>
  );
};

const Login = ({navigation}) => {
  const {handleSubmit, register, setValue, watch, errors} = useForm();
  const [initializing, setInitializing] = useState(false);
  const [snackIsVisible, setSnackIsVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);
  const passwordRef = useRef();

  useEffect(() => {
    register('email', {required: true});
    register('password', {required: true});
  }, [register]);

  const onSubmit = (data) => {
    setInitializing(true);
    if (!data.email || !data.password) {
      setSnackMessage('Debes rellenar ambos campos para poder proseguir');
      setSnackIsVisible(true);
      setInitializing(false);
    } else {
      const containArroba = data.email.match(/[@]/g);
      const containDot = data.email.match(/[.]/g);
      const isValidEmail =
        containArroba &&
        containArroba.length === 1 &&
        containDot &&
        containDot.length > 0;

      if (!isValidEmail) {
        setSnackMessage('Correo Electrónico invalido');
        setSnackIsVisible(true);
        setInitializing(false);
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
                msg =
                  '¡Ups! Ha ocurrido algo inesperado, verifica tu conexión a internet e intenta de nuevo, ¡Los extraterrestres están haciendo de las suyas otra vez!';
                break;
            }
            setSnackMessage(msg);
            setSnackIsVisible(true);
            setInitializing(false);
          });
      }
    }
  };
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f1f2f3',
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
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <>
        <View style={styles.imageContainer}>
          <Wave style={styles.Wave} />
          <Logo style={styles.logo} />
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setValue('email', text)}
              keyboardType="email-address"
              blurOnSubmit={true}
              onSubmitEditing={() => passwordRef.current.focus()}
              value={watch('email')}
              autoCapitalize="none"
              returnKeyType="next"
              placeholder="Correo electrónico"
            />
            {errors.email && (
              <ErrorMessage text="Debes proporcionar el correo de inicio de sesion" />
            )}
            <PasswordInput
              style={styles.passwordInput}
              value={watch('password')}
              onChangeText={(text) => setValue('password', text)}
              placeholder="Contraseña"
              passRef={passwordRef}
            />
            {errors.password && (
              <ErrorMessage text="debes proporcionar la contraseña" />
            )}
          </View>
          <Button onPress={handleSubmit(onSubmit)} text="Iniciar Sesion" />
        </ScrollView>
      </>
      <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
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

export default Login;
