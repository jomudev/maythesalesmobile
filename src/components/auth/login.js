/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Button from './button';
import auth from '@react-native-firebase/auth';
import styles from './authStyles';
import {useForm} from 'react-hook-form';
import Snackbar from 'react-native-snackbar-component';
import Wave from '../../assets/AdditionalMedia/wave.svg';
import Logo from '../../assets/AdditionalMedia/Logo.svg';
import {PasswordInput, TextBox} from '../auxComponents';
import LoadingScreen from '../loadingScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
          .then(() => {
            setInitializing(false);
          })
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
    <View style={styles.mainContainer}>
      {initializing ? (
        <LoadingScreen text="Cargando datos del usuario" />
      ) : null}
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      <Wave style={styles.wave} />
      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
      </View>
      <Text style={styles.welcomeTitle}>Bienvenido</Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.label}>Mi correo:</Text>
        <TextBox
          style={styles.textInput}
          onChangeText={(text) => setValue('email', text)}
          keyboardType="email-address"
          blurOnSubmit={true}
          onSubmitEditing={() => passwordRef.current.focus()}
          value={watch('email')}
          placeholder="alguien@ejemplo.com"
          autoCapitalize="none"
          returnKeyType="next"
        />
        {errors.email && (
          <ErrorMessage text="Debes proporcionar el correo de inicio de sesion" />
        )}
        <Text style={styles.label}>Mi contraseña:</Text>
        <PasswordInput
          style={styles.passwordInput}
          placeholder="contraseña"
          autoCapitalize="none"
          value={watch('password')}
          onChangeText={(text) => setValue('password', text)}
          passRef={passwordRef}
        />
        {errors.password && (
          <ErrorMessage text="debes proporcionar la contraseña" />
        )}
        <Button onPress={handleSubmit(onSubmit)}>
          <Icon
            name="login"
            size={36}
            maxFontSizeMultiplier={1.5}
            color="white"
          />
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
          <Text style={styles.changeScreen}>
            ¿No tienes cuenta? Registrarse
          </Text>
        </TouchableOpacity>
      </View>
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
