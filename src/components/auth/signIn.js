/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import Button from './button';
import styles from './authStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useForm} from 'react-hook-form';
import Wave from '../../assets/AdditionalMedia/wave.svg';
import {PasswordInput} from '../auxComponents';
import Logo from '../../assets/AdditionalMedia/Logo.svg';
import Snackbar from 'react-native-snackbar-component';

const ErrorMessage = ({text}) => {
  return (
    <Text style={{fontWeight: 'bold', color: 'red', textAlign: 'center'}}>
      {text}
    </Text>
  );
};

const SignIn = ({navigation}) => {
  const {handleSubmit, setValue, register, errors, watch} = useForm();
  const [initializing, setInitializing] = useState();
  const [snackIsVisible, setSnackIsVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);

  const email = useRef();
  const password = useRef();
  const repeatPassword = useRef();

  useEffect(() => {
    register('email', {required: true});
    register('password', {required: true});
    register('repeatPassword', {required: true});
  }, [register]);

  const onSubmit = (data) => {
    setInitializing(true);
    if (data.email !== '' && data.password !== '' && data.nombre !== '') {
      if (data.password !== data.repeatPassword) {
        setSnackIsVisible(true);
        setSnackMessage('Las contaseñas no coinciden verifica nuevamente');
      } else {
        auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then((res) => {
            const negocioRef = firestore()
              .collection('negocios')
              .doc(res.user.uid);
            negocioRef
              .set({
                email: data.email,
              })
              .catch((err) => console.log(err.code));
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
            setSnackMessage(msg);
            setSnackIsVisible(true);
            setInitializing(false);
          });
      }
    } else {
      setInitializing(false);
    }
  };

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

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f1f2f3',
        alignItems: 'center',
      }}>
      <View style={styles.imageContainer}>
        {initializing ? (
          <View style={styles.loadingScreen}>
            <ActivityIndicator
              style={{marginTop: 25}}
              size={38}
              color="#101e5a"
            />
          </View>
        ) : null}
        <Wave style={styles.Wave} />
        <Logo style={styles.logo} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Correo electrónico"
            style={styles.textInput}
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
            onChangeText={(text) => setValue('email', text)}
            autoCapitalize="none"
            autoFocus={true}
            onSubmitEditing={() => password.current.focus()}
            ref={email}
          />
          <PasswordInput
            placeholder="Contraseña"
            style={styles.passwordInput}
            onChangeText={(text) => {
              setValue('password', text);
            }}
            returnKeyType="next"
            onSubmitEditing={() => repeatPassword.current.focus()}
            passRef={password}
          />
          {verifyPasswordRequirements()}
          <PasswordInput
            placeholder="Repite la contraseña"
            style={styles.passwordInput}
            returnKeyType="done"
            onChangeText={(text) => {
              setValue('repeatPassword', text);
            }}
            passRef={repeatPassword}
          />
        </View>
        {verifyPasswords()}
        <Button onPress={handleSubmit(onSubmit)} text="Registrarse" />
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.registrarse}>Iniciar sesion</Text>
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

export default SignIn;
