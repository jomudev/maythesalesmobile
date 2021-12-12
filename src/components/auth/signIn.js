/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {View, Text, ToastAndroid, TouchableOpacity, ScrollView} from 'react-native';
import {TextBox, PasswordInput} from '../auxComponents';
import Button from './button';
import firestore from '@react-native-firebase/firestore';

import styles from './authStyles';
import auth from '@react-native-firebase/auth';
import {useForm} from 'react-hook-form';

const ErrorMessage = ({text}) => {
  return (
    <Text style={{fontWeight: 'bold', color: 'red', textAlign: 'center'}}>
      {text}
    </Text>
  );
};

const SignIn = ({setInitializing, changeScreen}) => {
  const {handleSubmit, setValue, register, errors, watch} = useForm();
  const email = useRef();
  const password = useRef();
  const repeatPassword = useRef();

  const verifyPasswords = () => {
    if (watch('repeatPassword')) {
      if (watch('password') !== watch('repeatPassword')) {
        return <ErrorMessage text="Las contraseñas no coinciden" />;
      }
    }
    return;
  };

  const verifyPasswordRequirements = () => {
    let messages = [];
    if (errors.password && errors.password.type === 'required') {
      messages = messages.concat('La contraseña no puede estar vacía');
    }
    if (watch('password') && watch('password').length < 8) {
      messages = messages.concat(
        'La contraseña debe tener al menos 8 caracteres',
      );
    }
    return messages.map((message) => (
      <ErrorMessage key={message} text={message} />
    ));
  };

  const onSubmit = async (data) => {
    setInitializing(true);
    if (data.email !== '' && data.password !== '' && data.nombre !== '') {
      if (data.password !== data.repeatPassword) {
      } else {
        await auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(async (res) => {
            await firestore()
              .collection('negocios')
              .doc(res.user.uid)
              .set({
                defaultCurrencyFormat: 'HNL',
                defaultSaleState: true,
              })
              .catch((err) => {
                console.warn(err.code);
                setInitializing(false);
              });
              res.user.sendEmailVerification()
          })
          .catch((err) => {
            console.log(err);
            let msg = '';
            switch (err.code) {
              case 'auth/invalid-email':
                msg =
                  'Has ingresado una dirección de correo electrónico invalido';
                break;
              case 'auth/weak-password':
                msg =
                  'La contraseña es demasiado debil debe contener minimo 8 caracteres';
                break;
              case 'auth/email-already-in-use':
                msg =
                  'Correo electrónico en uso, ¿Será tu gemelo malvado? ¡Que miedo!';
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
    } else {
      setInitializing(false);
    }
  };


  useEffect(() => {
    register('email', {required: true});
    register('password', {required: true});
    register('repeatPassword', {required: true});
  }, []);

  return (
    <ScrollView contentContainerStyle={{width: '100%', alignItems: 'center'}} >
      <Text style={styles.welcomeTitle}>Crea tu propia cuenta</Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.label}>Ingresa tu Correo electrónico:</Text>
        <TextBox
          style={styles.textInput}
          keyboardType="email-address"
          placeholder="alguien@ejemplo.com"
          returnKeyType="next"
          onChangeText={(text) => setValue('email', text)}
          autoCapitalize="none"
          onSubmitEditing={() => password.current.focus()}
          Ref={email}
        />
        <Text style={styles.label}>Ingresa tu contraseña:</Text>
        <PasswordInput
          style={styles.passwordInput}
          placeholder="contraseña"
          onChangeText={(text) => {
            setValue('password', text);
          }}
          returnKeyType="next"
          onSubmitEditing={() => repeatPassword.current.focus()}
          passRef={password}
        />
        {verifyPasswordRequirements()}
        <Text style={styles.label}>Confirma tu contraseña:</Text>
        <PasswordInput
          style={styles.passwordInput}
          placeholder="Confirmar contraseña"
          returnKeyType="done"
          onChangeText={(text) => {
            setValue('repeatPassword', text);
          }}
          passRef={repeatPassword}
        />
        {verifyPasswords()}
        <TouchableOpacity
          style={styles.changeScreen}
          onPress={() => changeScreen('toLogin')}>
          <Text style={styles.changeScreenText}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
        <Button onPress={handleSubmit(onSubmit)}>
          <Text style={{color: 'white', fontSize: 18}}>Registrarse</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default SignIn;
