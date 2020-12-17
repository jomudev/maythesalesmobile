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

const Signin = ({navigation}) => {
  const {handleSubmit, setValue, register} = useForm();
  const [inicializando, setInicializando] = useState();

  const email = useRef();
  const password = useRef();
  const repeatPassword = useRef();

  useEffect(() => {
    register('email');
    register('password');
    register('repeatPassword');
  }, [register]);

  const onSubmit = (data) => {
    console.log(data);
    setInicializando(true);
    if (data.email !== '' && data.password !== '' && data.nombre !== '') {
      if (data.password !== data.repeatPassword) {
        Alert.alert(
          'Error en contraseñas',
          'Las contaseñas no coinciden verifica',
        );
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
            setInicializando(false);
            console.log(err);
          });
      }
    }
  };

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f1f2f3',
        alignItems: 'center',
      }}>
      <View style={styles.imageContainer}>
        {inicializando ? (
          <View style={styles.loadingScreen}>
            <ActivityIndicator
              style={{marginTop: 25}}
              size={38}
              color="#101e5a"
            />
          </View>
        ) : null}
        <Wave style={styles.Wave} />
        <Image
          source={require('../../assets/AdditionalMedia/logo.png')}
          style={styles.logo}
        />
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
          <TextInput
            placeholder="Contraseña"
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={(text) => {
              setValue('password', text);
            }}
            returnKeyType="next"
            onSubmitEditing={() => repeatPassword.current.focus()}
            ref={password}
          />
          <TextInput
            placeholder="Repite la contraseña"
            style={styles.textInput}
            secureTextEntry={true}
            returnKeyType="done"
            onChangeText={(text) => {
              setValue('repeatPassword', text);
            }}
            ref={repeatPassword}
          />
        </View>
        <Button onPress={handleSubmit(onSubmit)} text="Registrarse" />
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.registrarse}>Iniciar sesion</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signin;
