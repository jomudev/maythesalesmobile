/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Button from './button';
import styles from './authStyles';
import auth from '@react-native-firebase/auth';
import {useForm} from 'react-hook-form';
import Wave from '../../assets/AdditionalMedia/wave.svg';
import {PasswordInput, TextBox} from '../auxComponents';
import LoadingScreen from '../loadingScreen';
import {db} from '../mainFunctions';
import Logo from '../../assets/AdditionalMedia/Logo.svg';
import Snackbar from 'react-native-snackbar-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
          .then(async (res) => {
            await db()
              .doc(res.user.uid)
              .set({
                defaultCurrencyFormat: {
                  label: 'HNL   Lempira hondureño',
                  value: 'HNL',
                }
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
    <View style={styles.mainContainer}>
      {initializing ? <LoadingScreen text="Creando usuario" /> : null}
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      <Wave style={styles.wave} />
      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
      </View>
      <Text style={styles.welcomeTitle}>Crea tu propia cuenta</Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.label}>Mi correo:</Text>
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
        <Text style={styles.label}>Mi contraseña:</Text>
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
        <Text style={styles.label}>Repetir mi contraseña:</Text>
        <PasswordInput
          style={styles.passwordInput}
          placeholder="contraseña"
          returnKeyType="done"
          onChangeText={(text) => {
            setValue('repeatPassword', text);
          }}
          passRef={repeatPassword}
        />
        {verifyPasswords()}
        <Button onPress={handleSubmit(onSubmit)}>
          <Icon
            name="account-check"
            size={36}
            maxFontSizeMultiplier={1.5}
            color="white"
          />
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text style={styles.changeScreen}>
            ¿Ya tienes cuenta? Inicia sesión
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

export default SignIn;
