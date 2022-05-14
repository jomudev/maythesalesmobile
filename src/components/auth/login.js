/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, ToastAndroid, Text, View, ScrollView} from 'react-native';
import Button from './button';
import auth from '@react-native-firebase/auth';
import styles from './authStyles';
import {useForm} from 'react-hook-form';
import {PasswordInput, TextBox} from '../auxComponents';

const ErrorMessage = ({text}) => {
  return (
    <Text style={{fontWeight: 'bold', color: 'red', textAlign: 'center'}}>
      {text}
    </Text>
  );
};

const Login = ({setInitializing, changeScreen}) => {
  const {handleSubmit, register, setValue, watch, errors} = useForm();
  const passwordRef = useRef();

  useEffect(() => {
    register('email', {required: true});
    register('password', {required: true});
  }, []);

  const onSubmit = async (data) => {
    setInitializing(true);
    if (!data.email || !data.password) {
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
        ToastAndroid.show('Correo Electrónico invalido', ToastAndroid.LONG);
        setInitializing(false);
      } else {
        await auth()
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
            ToastAndroid.show(msg, ToastAndroid.LONG);
            setInitializing(false);
          });
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={{width: '100%', alignItems: 'center'}} >
      <Text style={styles.loginTitle}>Iniciar sesión</Text>
      <View style={styles.textInputContainer}>
        <TextBox
          style={styles.textInput}
          nativeID="loginEmail"
          testID="loginEmail"
          onChangeText={(text) => setValue('email', text)}
          keyboardType="email-address"
          blurOnSubmit={true}
          onSubmitEditing={() => passwordRef.current.focus()}
          value={watch('email')}
          placeholder="Correo Electrónico"
          autoCapitalize="none"
          returnKeyType="next"
        />
        {errors.email && (
          <ErrorMessage text="Debes proporcionar el correo de inicio de sesion" />
        )}
        <PasswordInput
          style={styles.passwordInput}
          nativeID="loginPassword"
          testID="loginPassword"
          placeholder="Contraseña"
          autoCapitalize="none"
          value={watch('password')}
          onChangeText={(text) => setValue('password', text)}
          passRef={passwordRef}
          onSubmitEditing={handleSubmit(onSubmit)}
        />
        {errors.password && (
          <ErrorMessage text="Debes proporcionar la contraseña" />
        )}
        
        
        <Button onPress={handleSubmit(onSubmit)}>
          <Text style={{color: 'white', fontSize: 18}}>Iniciar sesión</Text>
        </Button>
      </View>
      <View style={styles.registerContainer}>
          <Text>
            ¿No tienes una cuenta?{' '}
          </Text>
          <TouchableOpacity
            style={styles.changeScreen}
            onPress={() => changeScreen('toSignIn')}>
            <Text style={styles.changeScreenText}>
              Registrarse
            </Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
    
  );
};

export default Login;
