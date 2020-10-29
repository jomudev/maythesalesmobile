/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useForm} from 'react-hook-form';
import styles from './styles';

const AgregarUsuario = () => {
  const {handleSubmit, register, setValue} = useForm();
  const [error, setError] = useState(false);
  const nombre = useRef();
  const email = useRef();
  const password = useRef();
  const repeatPassword = useRef();

  const onSubmit = data => {
    console.log(data);
    if (!data.nombre || !data.email || !data.password || !data.repeatPassword) {
      setError(true);
    }
  };

  useEffect(() => {
    register('nombre', {required: true});
    register('email', {required: true});
    register('password', {required: true});
    register('repeatPassword', {required: true});
  }, [register]);

  return (
    <View
      style={{
        ...StyleSheet.absolutefillObject,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      }}>
      <TextInput
        ref={nombre}
        placeholder="Nombre"
        style={styles.text}
        onChangeText={text => setValue('nombre', text)}
        onEndEditing={() => email.current.focus()}
      />
      <TextInput
        ref={email}
        placeholder="Correo electrónico"
        style={styles.text}
        onChangeText={text => setValue('email', text)}
        autoCapitalize={false}
        onEndEditing={() => password.current.focus()}
      />
      <TextInput
        ref={password}
        placeholder="Contraseña"
        style={styles.text}
        onChangeText={text => setValue('password', text)}
        onEndEditing={() => repeatPassword.current.focus()}
      />
      <TextInput
        ref={repeatPassword}
        placeholder="Confirmar contraseña"
        style={styles.text}
        onChangeText={text => setValue('repeatPassword', text)}
      />
      {error ? <Text>Todos los campos son obligatorios</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={{color: 'white'}}>Crear Usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AgregarUsuario;
