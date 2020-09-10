/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TextInput, Image, Alert, ScrollView} from 'react-native';
import Button from './button';
import store from '../../../store';
import styles from './authStyles';
import auth from '@react-native-firebase/auth';

const onSigninButtonPress = async ({email, password}) => {
  email = email.trim();
  password = password.trim();
  if (email === '' && password === '') {
    Alert.alert('Campos vacios', 'rellena todos los campos para poder unirte');
    return;
  }
  const task = await auth().createUserWithEmailAndPassword(email, password);
  return task;
};

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [negocio, setNegocio] = useState('');
  const [passwordConfirmed, confirmPassword] = useState(null);

  const confirmIfPasswordAreTheSame = text => {
    if (text === password) {
      confirmPassword(null);
    } else {
      confirmPassword('las contraseñas no coinciden');
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/AditionalMedia/logo.png')}
        style={styles.loginBG}
      />
      <ScrollView
        style={{
          width: '100%',
        }}>
        <TextInput
          placeholder="Nombres"
          style={styles.textInput}
          value={`${nombres}`}
          onChangeText={text => setNombres(text)}
        />
        <TextInput
          placeholder="Apellidos"
          style={styles.textInput}
          value={`${apellidos}`}
          onChangeText={text => setApellidos(text)}
        />
        <TextInput
          placeholder="Correo electrónico"
          style={styles.textInput}
          value={`${email}`}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Nombre del negocio"
          style={styles.textInput}
          value={`${negocio}`}
          onChangeText={text => setNegocio(text)}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.textInput}
          secureTextEntry={true}
          value={`${password}`}
          onChangeText={text => {
            setPassword(text);
            confirmIfPasswordAreTheSame(text);
          }}
        />
        <TextInput
          placeholder="Repite la contraseña"
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={text => confirmIfPasswordAreTheSame(text)}
        />
        {passwordConfirmed ? (
          <Text style={{color: 'red', textAlign: 'center'}}>
            {passwordConfirmed}
          </Text>
        ) : null}
        <Button
          onPress={() => {
            if (nombres !== '' && apellidos !== '' && negocio !== '') {
              if (passwordConfirmed) {
                Alert.alert('Las contraseñas no coinciden verifica nuevamente');
                return;
              }
              onSigninButtonPress({email, password})
                .then(result => {
                  let nombre = nombres.split(' ');
                  let apellido = apellidos.split(' ');
                  let displayName = `${nombre[0]} ${apellido[0]}`;
                  result.user.updateProfile({
                    displayName,
                  });
                  let newUserData = {
                    nombres,
                    apellidos,
                    email,
                    negocio,
                  };
                  store.dispatch({
                    type: 'SET_IS_NEW_USER',
                    data: true,
                    newUserData,
                  });
                })
                .catch(err => {
                  console.warn(err.code);
                  if (err.code === 'auth/email-alredy-in-use') {
                    Alert.alert(
                      'El correo electrónico ya esta siendo utilizado.',
                    );
                  }
                });
            } else {
              Alert.alert('Llena todos los campos');
            }
          }}
          text="Registrarse"
        />
      </ScrollView>
    </View>
  );
};

export default Signin;
